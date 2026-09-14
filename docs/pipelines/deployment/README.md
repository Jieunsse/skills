# 배포 프로파일

프로젝트 성격에 따라 배포 방식을 선택한다.

## vercel-supabase

Vercel에 애플리케이션을 배포하고 Supabase를 데이터베이스·인증·스토리지 등의 백엔드 서비스로 사용하는 구성이다.

## aws

AWS 기반 배포 구성이다. 기본값은 Ubuntu LTS 기반 단일 EC2, Nginx, Docker Compose, RDS PostgreSQL, Terraform, CloudWatch, GitHub OIDC + SSM, 단일 AZ다. 필요할 때 ECS·Lambda·Amplify 등 하위 프로파일로 분리한다.

각 배포 문서는 대상 계층, 환경 구분, 환경 변수, 배포 순서, 롤백, 검증 방법을 정의한다.

기본 배포 트리거는 [`../trigger-model.md`](../trigger-model.md)를 따른다. Production 배포와 데이터베이스 마이그레이션은 명시적 승인 없이 자동 실행하지 않는다.
