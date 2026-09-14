# npm 패키지 배포

이 저장소의 스캐폴딩 위저드는 `@jieunsse/create-project-starter`라는 공개 npm 패키지로 배포할 수 있다. 패키지의 실행 파일 이름은 `project-starter`다.

## 사용자 명령

`pnpm create`는 scoped 패키지에서 `create-`를 생략하므로 다음처럼 호출한다.

```bash
cd ~/jieunsse/dev/new-project
pnpm create @jieunsse/project-starter .
```

대화형 선택 없이 preset을 사용하려면 다음처럼 실행한다.

```bash
pnpm create @jieunsse/project-starter . \
  --preset=monorepo-web-backend-public \
  --execute
```

## 로컬 검증

배포 전에는 저장소 루트에서 패키지 진입점과 포함 파일을 확인한다.

```bash
npm test
npm pack --dry-run
```

tarball을 직접 실행해 npm 설치 환경을 확인한다.

```bash
npm pack
pnpm dlx ./jieunsse-create-project-starter-0.1.0.tgz --help
```

생성기를 실행하는 검증은 별도의 빈 디렉터리에서 `--execute`를 사용한다. 공식 생성기 실행은 네트워크와 외부 명령을 사용하므로 기본 검증은 `--help`와 tarball 확인부터 시작한다.

## 배포 절차

1. `package.json`의 버전을 올린다. npm에 이미 배포된 버전은 다시 사용할 수 없다.
2. `npm pack --dry-run`으로 패키지에 포함되는 파일을 확인한다.
3. npm 계정과 `jieunsse` scope의 publish 권한을 확인한다.
4. 사용자 승인 후 `npm publish`를 실행한다. `publishConfig.access`는 public으로 설정되어 있다.
5. 배포 후 `pnpm create @jieunsse/project-starter .`로 실제 설치·실행을 확인한다.

현재는 패키지 메타데이터와 로컬 검증까지만 준비하며, 실제 npm 배포는 별도 승인 후 진행한다.

## GitHub Actions 배포

선택 사항. 실제 배포를 자동화할 때는 npm token을 저장하는 방식보다 GitHub OIDC Trusted Publishing을 우선 검토한다. 저장소와 npm 패키지의 trusted publisher 연결, `id-token: write`, Node.js/npm CLI 버전 조건을 확인한 뒤 release 태그 기반 workflow를 추가한다.
