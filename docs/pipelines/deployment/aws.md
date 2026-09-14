# AWS

AWS 기반 배포 프로파일이다.

기본 실행 방식은 Ubuntu LTS 기반 EC2에 애플리케이션을 배포하고 Nginx를 reverse proxy로 사용하는 구성이다. 프로젝트 규모와 운영 요구에 따라 웹과 백엔드를 하나의 EC2에 배치하거나 각각 분리한다.

ECS, Lambda, Amplify 등 다른 실행 방식은 기본값이 아닌 선택 사항이며, 도입할 때 별도 하위 프로파일로 분리한다.

## 기본 구성

```text
인터넷
  ↓
Route 53 / DNS
  ↓
EC2 · Ubuntu LTS
  ├── Nginx · TLS 종료·reverse proxy
  ├── Web container · Next.js 또는 정적 산출물
  └── Backend container · Spring Boot
```

- 외부 공개 포트는 `80`, `443`만 허용한다.
- SSH는 제한된 관리자 IP 또는 AWS Systems Manager를 통해 접근한다.
- 애플리케이션은 기본적으로 Docker Compose로 실행한다.
- 단일 Spring Boot 서비스의 최소형 운영에서는 systemd를 선택할 수 있다.
- 데이터베이스는 애플리케이션 서버와 분리하고, 기본 후보는 RDS PostgreSQL로 둔다.
- 개발·staging·production 환경별 EC2와 데이터베이스를 분리한다.
- 초기 운영은 단일 EC2·단일 AZ로 시작한다.

## 배포 순서

```text
코드 검증
→ 애플리케이션 빌드
→ 이미지·산출물 준비
→ 인프라·보안 그룹 확인
→ 데이터베이스 마이그레이션
→ EC2 배포
→ Nginx 설정·TLS 확인
→ health check·smoke test
→ 모니터링
```

배포 자동화는 GitHub Actions에서 OIDC 기반 AWS IAM Role을 획득한 뒤 SSM 또는 CodeDeploy로 실행한다. EC2에 장기 AWS Access Key를 저장하지 않는다.

## 롤백

- 애플리케이션은 이전 빌드 산출물 또는 이미지로 되돌린다.
- Nginx 설정 변경 전 기존 설정을 검증하고 백업한다.
- 데이터베이스 마이그레이션은 애플리케이션 롤백과 별도로 판단한다.
- 파괴적인 마이그레이션은 자동 롤백하지 않고 별도 복구 절차를 따른다.

문서화할 항목:

- 대상 계층과 AWS 서비스
- 환경 구분
- IAM과 비밀 정보
- 빌드·배포 순서
- 데이터와 인프라 변경 절차
- 모니터링·롤백·비용 고려 사항

## 미결정·선택 사항

다음은 기본 프로파일에서 승격할 때만 선택한다.

- 웹과 백엔드의 독립 배포·스케일링이 필요하면 EC2를 서비스별로 분리한다.
- 단일 Spring Boot 서비스의 운영 복잡도를 줄여야 하면 Docker Compose 대신 systemd를 선택한다.
- AWS 전용 인프라를 TypeScript로 관리해야 하면 Terraform 대신 AWS CDK를 선택한다.
- 분산 추적이나 고급 APM이 필요하면 CloudWatch 외부에 모니터링 도구를 추가한다.
- 장애 허용 시간이 짧거나 무중단 운영이 필요하면 ALB·Multi-AZ EC2·RDS Multi-AZ로 승격한다.

Ubuntu는 지원 중인 LTS를 사용하되, 프로젝트 생성 시 AMI 식별자와 선택 날짜를 기록하고 staging 검증 후 production에 패치한다. 인프라는 Terraform으로 관리하며 state와 비밀정보를 저장소에 커밋하지 않는다.
