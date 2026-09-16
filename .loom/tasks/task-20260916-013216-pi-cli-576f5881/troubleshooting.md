# 문제 해결 기록

- 최초 `loom task run`은 `main` 브랜치의 미커밋 Loom 초기 파일 때문에 중단됐다. 초기 워크플로 상태를 `chore: initialize Loom workflow`로 커밋한 뒤 재실행해 해결했다.
- 설치 전 `pi` 명령은 존재하지 않았다. 공식 npm 패키지를 전역 설치한 뒤 `pi --version`이 `0.85.1`을 출력했다.
- `bash`는 PATH에서 직접 발견되지 않았지만 Git 설치 경로 `D:\Program\Git\bin\bash.exe`에 존재함을 확인했다. 현재 Pi는 Windows에서 `powershell` 도구도 제공한다.
