#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";

const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
const yes = args.has("--yes");
const targetArg = process.argv.find((arg) => arg.startsWith("--target="));
const presetArg = process.argv.find((arg) => arg.startsWith("--preset="));

const valueOf = (name) => process.argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];

const options = {
  repository: ["frontend-only", "backend-only", "monorepo"],
  frontend: ["public-web", "spa", "typed-style"],
  monorepo: ["web-backend-public", "web-backend-admin", "web-backend-mobile"],
  css: ["tailwind", "vanilla-extract"],
  deployment: ["none", "vercel-supabase", "aws"],
  tracker: ["github-issues", "linear", "github-issues + linear"],
  storybook: ["no", "yes"],
};

const labels = {
  repository: {
    "frontend-only": "Frontend-only",
    "backend-only": "Backend-only",
    monorepo: "Monorepo",
  },
  frontend: {
    "public-web": "Public web · Next.js",
    spa: "SPA · React + Vite",
    "typed-style": "Typed styles · vanilla-extract",
  },
  monorepo: {
    "web-backend-public": "Web + Backend · public service",
    "web-backend-admin": "Web + Backend · admin",
    "web-backend-mobile": "Web + Backend + Mobile",
  },
  css: { tailwind: "Tailwind CSS", "vanilla-extract": "vanilla-extract" },
  deployment: {
    none: "No deployment profile yet",
    "vercel-supabase": "Vercel + Supabase",
    aws: "AWS",
  },
  tracker: {
    "github-issues": "GitHub Issues",
    linear: "Linear",
    "github-issues + linear": "GitHub Issues + Linear",
  },
  storybook: { no: "No", yes: "Yes" },
};

const presets = {
  "frontend-public-web": { repository: "frontend-only", frontend: "public-web", css: "tailwind", storybook: "no" },
  "frontend-spa": { repository: "frontend-only", frontend: "spa", css: "tailwind", storybook: "no" },
  "backend-spring-boot": { repository: "backend-only" },
  "monorepo-web-backend-public": { repository: "monorepo", monorepo: "web-backend-public", css: "tailwind", storybook: "no" },
  "monorepo-web-backend-admin": { repository: "monorepo", monorepo: "web-backend-admin", css: "tailwind", storybook: "no" },
  "monorepo-web-backend-mobile": { repository: "monorepo", monorepo: "web-backend-mobile", css: "tailwind", storybook: "no" },
};

function parseTarget() {
  return resolve(targetArg?.split("=")[1] ?? "./new-project");
}

function choose(label, values) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    throw new Error("Interactive terminal is required. Use a TTY to run the scaffold wizard.");
  }

  return new Promise((resolveChoice) => {
    let index = 0;
    const render = () => {
      process.stdout.write("\x1b[2J\x1b[H");
      console.log(`◆ ${label.text}\n`);
      values.forEach((value, current) => {
        const marker = current === index ? "●" : "○";
        console.log(`${marker} ${labels[label.key]?.[value] ?? value}`);
      });
      console.log("\n↑/↓ Select · Enter Confirm · Ctrl+C Cancel");
    };
    const input = (chunk) => {
      const key = chunk.toString();
      if (key === "\u0003") process.exit(130);
      if (key === "\u001b[A") index = (index - 1 + values.length) % values.length;
      if (key === "\u001b[B") index = (index + 1) % values.length;
      if (key === "\r" || key === "\n") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.off("data", input);
        resolveChoice(values[index]);
        return;
      }
      render();
    };
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", input);
    render();
  });
}

async function collectChoices() {
  const repository = await choose({ key: "repository", text: "Select repository type" }, options.repository);
  const choice = { repository };

  if (repository === "frontend-only") {
    choice.frontend = await choose({ key: "frontend", text: "Select frontend purpose" }, options.frontend);
    choice.css = choice.frontend === "typed-style" ? "vanilla-extract" : await choose({ key: "css", text: "Select CSS strategy" }, options.css);
    choice.storybook = await choose({ key: "storybook", text: "Add Storybook" }, options.storybook);
  }

  if (repository === "monorepo") {
    choice.monorepo = await choose({ key: "monorepo", text: "Select monorepo purpose" }, options.monorepo);
    choice.css = await choose({ key: "css", text: "Select web CSS strategy" }, options.css);
    choice.storybook = await choose({ key: "storybook", text: "Add Storybook" }, options.storybook);
  }

  choice.deployment = await choose({ key: "deployment", text: "Select deployment profile" }, options.deployment);
  choice.tracker = await choose({ key: "tracker", text: "Select issue management" }, options.tracker);
  return choice;
}

function choicesFromPreset() {
  const preset = presetArg?.split("=")[1];
  if (!presets[preset]) throw new Error(`Unknown preset: ${preset}. Available: ${Object.keys(presets).join(", ")}`);
  const choice = { ...presets[preset] };
  if (choice.repository !== "backend-only") {
    choice.css = choice.frontend === "typed-style" ? "vanilla-extract" : valueOf("css") ?? choice.css;
    choice.storybook = valueOf("storybook") ?? choice.storybook;
  }
  choice.deployment = valueOf("deployment") ?? "none";
  choice.tracker = valueOf("tracker") ?? "github-issues";
  return choice;
}

function frontendCommand(directory, frontend, css) {
  if (frontend === "public-web" || frontend === "typed-style") {
    const args = ["create-next-app@latest", directory, "--typescript", "--eslint", "--app", "--src-dir", "--import-alias", "@/*", "--use-npm"];
    if (css === "tailwind") args.push("--tailwind");
    return {
      command: "npx",
      args,
    };
  }
  return { command: "npm", args: ["create", "vite@latest", directory, "--", "--template", "react-ts"] };
}

function commandsFor(choice) {
  const commands = [];
  if (choice.repository === "frontend-only") {
    commands.push(frontendCommand(".", choice.frontend, choice.css));
  }
  if (choice.repository === "monorepo") {
    const frontend = choice.monorepo === "web-backend-admin" ? "spa" : "public-web";
    commands.push(frontendCommand("app/web", frontend, choice.css));
    commands.push({ command: "curl", args: ["-fsSL", "https://start.spring.io/starter.zip?type=gradle-project&language=java&name=backend&artifactId=backend&groupId=com.example&dependencies=web,data-jpa,lombok,security,validation,flyway,postgresql", "-o", ".backend.zip"] });
    commands.push({ command: "unzip", args: ["-q", ".backend.zip", "-d", "app/backend"] });
    commands.push({ command: "rm", args: [".backend.zip"] });
    if (choice.monorepo === "web-backend-mobile") {
      commands.push({ command: "npx", args: ["create-expo-app@latest", "app/mobile", "--template", "blank-typescript"] });
    }
  }
  if (choice.repository === "backend-only") {
    commands.push({ command: "curl", args: ["-fsSL", "https://start.spring.io/starter.zip?type=gradle-project&language=java&name=backend&artifactId=backend&groupId=com.example&dependencies=web,data-jpa,lombok,security,validation,flyway,postgresql", "-o", ".backend.zip"] });
    commands.push({ command: "unzip", args: ["-q", ".backend.zip", "-d", "."] });
    commands.push({ command: "rm", args: [".backend.zip"] });
  }
  return commands;
}

function selectionMarkdown(choice) {
  const frontend = choice.frontend ?? (choice.repository === "backend-only" ? "Not applicable" : choice.monorepo === "web-backend-admin" ? "React + Vite" : "Next.js");
  return `# Scaffold selection\n\nGenerated by scripts/scaffold.mjs.\n\n| Item | Selection |\n| --- | --- |\n| Repository | ${choice.repository} |\n| Frontend | ${frontend} |\n| CSS | ${choice.css ?? "Not applicable"} |\n| Storybook | ${choice.storybook ?? "Not applicable"} |\n| Deployment | ${choice.deployment} |\n| Issue management | ${choice.tracker} |\n| Backend authentication | JWT |\n\n## Rules\n\n- TypeScript is fixed for frontend and mobile.\n- Mobile uses React Native + Expo when selected.\n- Backend uses Spring Boot DDD conventions when selected.\n- Environment variables follow the project documentation.\n- This file records choices; it does not contain secrets.\n`;
}

function ensureEmptyTarget(target) {
  mkdirSync(target, { recursive: true });
  if (readdirSync(target).length > 0) throw new Error(`Target is not empty: ${target}`);
}

function writeProjectDocs(target, choice) {
  const paths = [join(target, "docs")];
  if (choice.repository === "monorepo") paths.push(join(target, "app", "web", "docs"));
  if (choice.repository !== "frontend-only") paths.push(join(target, "app", "backend", "docs"));
  if (choice.monorepo === "web-backend-mobile") paths.push(join(target, "app", "mobile", "docs"));
  paths.forEach((path) => mkdirSync(path, { recursive: true }));
  writeFileSync(join(target, "AGENTS.md"), "# Project instructions\n\nFollow the project documentation in `docs/` and the relevant application-level `docs/` directory.\n");
  writeFileSync(join(target, "docs", "scaffold-selection.json"), `${JSON.stringify(choice, null, 2)}\n`);
  writeFileSync(join(target, "docs", "scaffold-selection.md"), selectionMarkdown(choice));
  if (choice.repository === "frontend-only") writeFileSync(join(target, "docs", "README.md"), "# Frontend documentation\n\nFrontend-specific architecture, features, conventions, and testing documentation.\n");
  if (choice.repository === "monorepo") writeFileSync(join(target, "app", "web", "docs", "README.md"), "# Web documentation\n\nWeb-specific architecture, features, conventions, and testing documentation.\n");
  if (choice.repository !== "frontend-only") writeFileSync(join(target, "app", "backend", "docs", "README.md"), "# Backend documentation\n\nBackend-specific architecture, API, domain, conventions, and testing documentation.\n");
  if (choice.monorepo === "web-backend-mobile") writeFileSync(join(target, "app", "mobile", "docs", "README.md"), "# Mobile documentation\n\nMobile-specific architecture, features, platform differences, and testing documentation.\n");
}

function run(command, commandArgs, cwd) {
  console.log(`$ ${command} ${commandArgs.join(" ")}`);
  execFileSync(command, commandArgs, { cwd, stdio: "inherit" });
}

async function main() {
  const target = parseTarget();
  const choice = presetArg ? choicesFromPreset() : await collectChoices();
  console.log("\nSelected configuration:\n", JSON.stringify(choice, null, 2));
  console.log(`\nTarget: ${target}`);

  if (!yes) {
    const answer = await choose({ key: "confirm", text: execute ? "Execute scaffold" : "Write selection plan" }, ["confirm", "cancel"]);
    if (answer === "cancel") return;
  }

  ensureEmptyTarget(target);
  if (execute) {
    for (const item of commandsFor(choice)) run(item.command, item.args, target);
  } else {
    console.log("\nPreview only. Pass --execute to run official generators.");
    commandsFor(choice).forEach((item) => console.log(`$ ${item.command} ${item.args.join(" ")}`));
  }

  writeProjectDocs(target, choice);
  console.log(`\nWrote ${join(target, "docs", "scaffold-selection.json")}`);
  console.log(`Wrote ${join(target, "docs", "scaffold-selection.md")}`);
}

main().catch((error) => {
  console.error(`\nScaffold failed: ${error.message}`);
  process.exitCode = 1;
});
