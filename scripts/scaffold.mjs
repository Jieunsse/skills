#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
const yes = args.has("--yes");
const presetArg = process.argv.find((arg) => arg.startsWith("--preset="));

const valueOf = (name) => {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value?.slice(prefix.length);
};

const options = {
  repository: ["frontend-only", "backend-only", "monorepo"],
  frontend: ["public-web", "spa", "typed-style"],
  monorepo: ["web-backend-public", "web-backend-admin", "web-backend-mobile"],
  css: ["tailwind", "vanilla-extract"],
  packageManager: ["pnpm", "npm", "yarn-classic", "yarn-berry"],
  httpClient: ["fetch", "axios"],
  axiosAdapter: ["auto", "xhr", "http", "fetch"],
  turborepo: ["yes", "no"],
  deployment: ["none", "vercel-supabase", "aws"],
  tracker: ["github-issues", "linear"],
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
  packageManager: {
    pnpm: "pnpm",
    npm: "npm",
    "yarn-classic": "Yarn Classic",
    "yarn-berry": "Yarn Berry",
  },
  httpClient: { fetch: "fetch", axios: "Axios" },
  axiosAdapter: { auto: "Environment default", xhr: "xhr", http: "http", fetch: "fetch" },
  turborepo: { yes: "Use Turborepo", no: "No Turborepo" },
  deployment: {
    none: "No deployment profile yet",
    "vercel-supabase": "Vercel + Supabase",
    aws: "AWS",
  },
  tracker: {
    "github-issues": "GitHub Issues",
    linear: "Linear",
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

const generators = {
  next: "create-next-app@16.3.5",
  vite: "vite@8.3.0",
  expo: "create-expo-app@4.0.0",
};

function parseTarget() {
  const positionalTarget = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
  return resolve(valueOf("target") ?? positionalTarget ?? "./new-project");
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
    choice.packageManager = await choose({ key: "packageManager", text: "Select package manager" }, options.packageManager);
    choice.frontend = await choose({ key: "frontend", text: "Select frontend purpose" }, options.frontend);
    choice.css = choice.frontend === "typed-style" ? "vanilla-extract" : await choose({ key: "css", text: "Select CSS strategy" }, options.css);
    choice.httpClient = await choose({ key: "httpClient", text: "Select web HTTP client" }, options.httpClient);
    if (choice.httpClient === "axios") choice.axiosAdapter = await choose({ key: "axiosAdapter", text: "Select Axios adapter" }, options.axiosAdapter);
    choice.storybook = await choose({ key: "storybook", text: "Add Storybook" }, options.storybook);
  }

  if (repository === "monorepo") {
    choice.packageManager = await choose({ key: "packageManager", text: "Select package manager" }, options.packageManager);
    choice.monorepo = await choose({ key: "monorepo", text: "Select monorepo purpose" }, options.monorepo);
    choice.css = await choose({ key: "css", text: "Select web CSS strategy" }, options.css);
    choice.httpClient = await choose({ key: "httpClient", text: "Select web HTTP client" }, options.httpClient);
    if (choice.httpClient === "axios") choice.axiosAdapter = await choose({ key: "axiosAdapter", text: "Select Axios adapter" }, options.axiosAdapter);
    choice.turborepo = await choose({ key: "turborepo", text: "Use Turborepo" }, options.turborepo);
    choice.storybook = await choose({ key: "storybook", text: "Add Storybook" }, options.storybook);
  }

  choice.deployment = await choose({ key: "deployment", text: "Select deployment profile" }, options.deployment);
  choice.tracker = await choose({ key: "tracker", text: "Select issue management" }, options.tracker);
  return choice;
}

function choicesFromPreset() {
  const preset = valueOf("preset");
  if (!presets[preset]) throw new Error(`Unknown preset: ${preset}. Available: ${Object.keys(presets).join(", ")}`);
  const choice = { ...presets[preset] };
  if (choice.repository !== "backend-only") {
    choice.packageManager = valueOf("package-manager") ?? "pnpm";
    choice.httpClient = valueOf("http-client") ?? "fetch";
    if (choice.httpClient === "axios") choice.axiosAdapter = valueOf("axios-adapter") ?? "auto";
    choice.css = choice.frontend === "typed-style" ? "vanilla-extract" : valueOf("css") ?? choice.css;
    choice.storybook = valueOf("storybook") ?? choice.storybook;
  }
  if (choice.repository === "monorepo") choice.turborepo = valueOf("turborepo") ?? "yes";
  choice.deployment = valueOf("deployment") ?? "none";
  choice.tracker = valueOf("tracker") ?? "github-issues";
  validateChoice(choice);
  return choice;
}

function validateChoice(choice) {
  for (const [key, value] of Object.entries(choice)) {
    if (options[key] && !options[key].includes(value)) {
      throw new Error(`Invalid ${key}: ${value}. Available: ${options[key].join(", ")}`);
    }
  }
}

function validateOptionArguments() {
  for (const [key, optionName] of [["css", "css"], ["storybook", "storybook"], ["packageManager", "package-manager"], ["httpClient", "http-client"], ["axiosAdapter", "axios-adapter"], ["turborepo", "turborepo"], ["deployment", "deployment"], ["tracker", "tracker"]]) {
    const value = valueOf(optionName);
    if (value && !options[key].includes(value)) {
      throw new Error(`Invalid ${optionName}: ${value}. Available: ${options[key].join(", ")}`);
    }
  }
}

function createCommand(packageManager, packageName, directory, commandArgs) {
  if (packageManager === "npm") return { command: "npx", args: [packageName, directory, ...commandArgs] };
  if (packageManager === "pnpm") return { command: "pnpm", args: ["dlx", packageName, directory, ...commandArgs] };
  if (packageManager === "yarn-berry") return { command: "yarn", args: ["dlx", packageName, directory, ...commandArgs] };
  return { command: "yarn", args: ["create", packageName.replace(/^create-/, ""), directory, ...commandArgs] };
}

function frontendCommand(directory, frontend, css, packageManager) {
  if (frontend === "public-web" || frontend === "typed-style") {
    const args = ["--typescript", "--eslint", "--app", "--src-dir", "--import-alias", "@/*", packageManager === "pnpm" ? "--use-pnpm" : packageManager === "npm" ? "--use-npm" : "--use-yarn"];
    if (css === "tailwind") args.push("--tailwind");
    return createCommand(packageManager, generators.next, directory, args);
  }
  if (packageManager === "npm") return { command: "npm", args: ["create", generators.vite, directory, "--", "--template", "react-ts"] };
  if (packageManager === "pnpm") return { command: "pnpm", args: ["create", generators.vite, directory, "--", "--template", "react-ts"] };
  return createCommand(packageManager, `create-vite@${generators.vite.split("@")[1]}`, directory, ["--template", "react-ts"]);
}

function installCommand(directory, packageManager) {
  const command = packageManager === "npm" ? "npm" : packageManager === "pnpm" ? "pnpm" : "yarn";
  return { command, args: ["install"], cwd: directory };
}

function addDependencyCommand(directory, packageManager, dependency) {
  const command = packageManager === "npm" ? "npm" : packageManager === "pnpm" ? "pnpm" : "yarn";
  const action = packageManager === "npm" ? "install" : "add";
  return { command, args: [action, dependency], cwd: directory };
}

function commandsFor(choice) {
  const commands = [];
  if (choice.repository === "frontend-only") {
    commands.push(frontendCommand(".", choice.frontend, choice.css, choice.packageManager));
    if (choice.frontend === "spa") commands.push(installCommand(".", choice.packageManager));
    if (choice.httpClient === "axios") commands.push(addDependencyCommand(".", choice.packageManager, "axios"));
  }
  if (choice.repository === "monorepo") {
    const frontend = choice.monorepo === "web-backend-admin" ? "spa" : "public-web";
    commands.push(frontendCommand("app/web", frontend, choice.css, choice.packageManager));
    if (frontend === "spa") commands.push(installCommand("app/web", choice.packageManager));
    if (choice.httpClient === "axios") commands.push(addDependencyCommand("app/web", choice.packageManager, "axios"));
    commands.push({ command: "curl", args: ["-fsSL", "https://start.spring.io/starter.zip?type=gradle-project&language=java&name=backend&artifactId=backend&groupId=com.example&dependencies=web,data-jpa,lombok,security,validation,flyway,postgresql,springdoc-openapi", "-o", ".backend.zip"] });
    commands.push({ command: "unzip", args: ["-q", ".backend.zip", "-d", "app/backend"] });
    if (choice.monorepo === "web-backend-mobile") {
      commands.push(createCommand(choice.packageManager, generators.expo, "app/mobile", ["--template", "blank-typescript"]));
    }
  }
  if (choice.repository === "backend-only") {
    commands.push({ command: "curl", args: ["-fsSL", "https://start.spring.io/starter.zip?type=gradle-project&language=java&name=backend&artifactId=backend&groupId=com.example&dependencies=web,data-jpa,lombok,security,validation,flyway,postgresql,springdoc-openapi", "-o", ".backend.zip"] });
    commands.push({ command: "unzip", args: ["-q", ".backend.zip", "-d", "."] });
  }
  return commands;
}

function selectionMarkdown(choice) {
  const frontend = choice.frontend ?? (choice.repository === "backend-only" ? "Not applicable" : choice.monorepo === "web-backend-admin" ? "React + Vite" : "Next.js");
  const setupNotes = [];
  if (choice.css === "vanilla-extract") setupNotes.push("Configure vanilla-extract from the selected frontend composition.");
  if (choice.css === "tailwind" && frontend === "React + Vite") setupNotes.push("Configure Tailwind CSS for Vite from the selected frontend composition.");
  if (choice.httpClient === "axios") setupNotes.push(`Configure one central Axios instance with the selected ${choice.axiosAdapter} adapter.`);
  if (choice.storybook === "yes") setupNotes.push("Install and configure Storybook after the shared UI boundary is confirmed.");
  if (choice.packageManager === "yarn-berry" && choice.monorepo === "web-backend-mobile") setupNotes.push("Configure Yarn Berry with node-modules linking for Expo; Plug'n'Play is not used for React Native.");
  if (choice.turborepo === "yes") setupNotes.push("Add root workspace configuration and turbo.json according to the monorepo composition; the wizard records this choice but does not configure Turbo automatically.");
  if (choice.repository !== "frontend-only") setupNotes.push("Implement DDD packages, JWT, CORS, and environment-specific security settings before exposing the API.");
  const followUp = setupNotes.length ? `\n## Follow-up required\n\n${setupNotes.map((note) => `- ${note}`).join("\n")}\n` : "";
  return `# Scaffold selection\n\nGenerated by scripts/scaffold.mjs.\n\n| Item | Selection |\n| --- | --- |\n| Repository | ${choice.repository} |\n| Frontend | ${frontend} |\n| CSS | ${choice.css ?? "Not applicable"} |\n| Storybook | ${choice.storybook ?? "Not applicable"} |\n| Package manager | ${choice.packageManager ?? "Not applicable"} |\n| HTTP client | ${choice.httpClient ?? "Not applicable"} |\n| Axios adapter | ${choice.axiosAdapter ?? "Not applicable"} |\n| Deployment | ${choice.deployment} |\n| Issue management | ${choice.tracker} |\n| Backend authentication | JWT |\n\n## Rules\n\n- TypeScript is fixed for frontend and mobile.\n- Mobile uses React Native + Expo when selected.\n- Environment variables follow the project documentation.\n- This file records choices; it does not contain secrets.\n${followUp}`;
}

function ensureEmptyTarget(target) {
  mkdirSync(target, { recursive: true });
  if (readdirSync(target).length > 0) throw new Error(`Target is not empty: ${target}`);
}

function writeProjectDocs(target, choice) {
  const rootDocs = join(target, "docs");
  const paths = [rootDocs, join(rootDocs, "architecture"), join(rootDocs, "decisions"), join(rootDocs, "workflows"), join(rootDocs, "conventions")];
  if (choice.repository === "monorepo") paths.push(join(target, "app", "web", "docs"));
  if (choice.repository === "monorepo") paths.push(join(target, "app", "backend", "docs"));
  if (choice.monorepo === "web-backend-mobile") paths.push(join(target, "app", "mobile", "docs"));
  paths.forEach((path) => mkdirSync(path, { recursive: true }));
  writeFileSync(join(target, "AGENTS.md"), "# Project instructions\n\nFollow the project documentation in `docs/` and the relevant application-level `docs/` directory.\n");
  writeFileSync(join(rootDocs, "scaffold-selection.json"), `${JSON.stringify(choice, null, 2)}\n`);
  writeFileSync(join(rootDocs, "scaffold-selection.md"), selectionMarkdown(choice));
  if (choice.repository === "frontend-only") writeFileSync(join(target, "docs", "README.md"), "# Frontend documentation\n\nFrontend-specific architecture, features, conventions, and testing documentation.\n");
  if (choice.repository === "backend-only") writeFileSync(join(target, "docs", "README.md"), "# Backend documentation\n\nBackend-specific architecture, API, domain, conventions, and testing documentation.\n");
  if (choice.repository === "monorepo") writeFileSync(join(target, "app", "web", "docs", "README.md"), "# Web documentation\n\nWeb-specific architecture, features, conventions, and testing documentation.\n");
  if (choice.repository === "monorepo") writeFileSync(join(target, "app", "backend", "docs", "README.md"), "# Backend documentation\n\nBackend-specific architecture, API, domain, conventions, and testing documentation.\n");
  if (choice.monorepo === "web-backend-mobile") writeFileSync(join(target, "app", "mobile", "docs", "README.md"), "# Mobile documentation\n\nMobile-specific architecture, features, platform differences, and testing documentation.\n");
}

function commandText(item) {
  const command = `${item.command} ${item.args.join(" ")}`;
  return item.cwd ? `(cd ${item.cwd} && ${command})` : command;
}

function run(item, target) {
  console.log(`$ ${commandText(item)}`);
  execFileSync(item.command, item.args, { cwd: item.cwd ? join(target, item.cwd) : target, stdio: "inherit" });
}

function usage() {
  console.log([
    "Usage:",
    "  node scripts/scaffold.mjs",
    "  node scripts/scaffold.mjs --target=../my-project --preset=frontend-public-web",
    "  node scripts/scaffold.mjs --target=../my-project --preset=monorepo-web-backend-public --execute --yes",
    "",
    "Options:",
    "  --target=<path>",
    "  --preset=<preset>",
    "  --css=tailwind|vanilla-extract",
    "  --package-manager=pnpm|npm|yarn-classic|yarn-berry",
    "  --http-client=fetch|axios",
    "  --axios-adapter=auto|xhr|http|fetch",
    "  --turborepo=yes|no",
    "  --storybook=yes|no",
    "  --deployment=none|vercel-supabase|aws",
    "  --tracker=github-issues|linear",
    "  --execute",
    "  --yes",
  ].join("\n"));
}

async function main() {
  if (args.has("--help") || args.has("-h")) {
    usage();
    return;
  }
  validateOptionArguments();
  const target = parseTarget();
  const choice = presetArg ? choicesFromPreset() : await collectChoices();
  console.log("\nSelected configuration:\n", JSON.stringify(choice, null, 2));
  console.log(`\nTarget: ${target}`);

  if (!yes) {
    const answer = await choose({ key: "confirm", text: execute ? "Execute scaffold" : "Preview scaffold" }, ["confirm", "cancel"]);
    if (answer === "cancel") return;
  }

  if (execute) {
    ensureEmptyTarget(target);
    for (const item of commandsFor(choice)) run(item, target);
    rmSync(join(target, ".backend.zip"), { force: true });
    writeProjectDocs(target, choice);
    console.log(`\nWrote ${join(target, "docs", "scaffold-selection.json")}`);
    console.log(`Wrote ${join(target, "docs", "scaffold-selection.md")}`);
  } else {
    console.log("\nPreview only. Pass --execute to run official generators.");
    commandsFor(choice).forEach((item) => console.log(`$ ${commandText(item)}`));
    console.log("No files or directories were created.");
  }
}

main().catch((error) => {
  console.error(`\nScaffold failed: ${error.message}`);
  process.exitCode = 1;
});
