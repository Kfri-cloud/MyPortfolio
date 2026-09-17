# Context

## Loom 코드 계약

아래 항목은 Loom 코드에 고정된 runtime 동작 계약입니다. 관련 흐름을 바꾸기 전 `loom contract show <id>`로 확인합니다.

- `task-execution`: Task 실행 전 prompt/context/previous-results에 들어가는 입력 경계입니다. 명령: `loom contract show task-execution`. Source: `loom/application/context_pack.py`, `loom/application/team_policy.py`
- `done-guardrail`: Task를 DONE으로 인정하기 전에 필요한 산출물과 상태 전이를 검증하는 계약입니다. 명령: `loom contract show done-guardrail`. Source: `loom/application/services.py`

## Project Memory

# Script

Loom 프로젝트 메모리 루트입니다.

이 파일은 `loom init`으로 생성되며 `loom analyze-repo`로 보강할 수 있습니다.

## Workspace Policy

- Output language: `ko`
- Agent provider: `claude`
- Agent model: `adapter-default`
- Reasoning effort: `high`
- Required branch: `develop`
- Dirty branch switch: `blocked`
- Commit policy: `manual`
- Include `.loom` metadata in Git: `yes`
- Read-only parallel execution: `allowed`
- Validation environment: `auto`
- Previous Task result limit: `2`
- Workspace required docs: -
- Loom fixed guardrails and verified Team required policies take precedence over this Workspace Policy.

## Job

- Title: HTML 강의 내용 검증 및 문서화
- Goal: 생활코딩 HTML 강의 요약을 최신 표준에 맞게 검증하고 Markdown 문서로 제공한다
- Branch: develop
- Task count: `1`

## Task

- Title: HTML 강의 요약 검증 및 Markdown 작성
- Description: 재생목록의 HTML 관련 13개 강의 내용을 최신 HTML Living Standard 및 MDN 기준으로 검증하고 오래된 내용을 명시적으로 보정한다.
- Expected output: 출처와 현대적 주의사항을 포함한 docs/html-course-notes.md
- Done condition: HTML 관련 강의가 재생목록 순서대로 정리되고 부정확하거나 폐기된 표현이 교정되며 Markdown 링크와 코드 블록이 유효하다.
- In scope: HTML 정의, 링크, 텍스트 구조, 이미지, 표, 목록, 프레임, URL, 폼 입력, 파일 업로드, iframe 검증 및 문서 작성
- Out of scope: JavaScript 강의 정리와 실제 웹사이트 구현
- Validation hint: Markdown 구조, 링크, 코드 블록, HTML 표준 관련 주의사항을 수동 검토하고 git diff를 확인한다.
- Required docs: -
- Memory refs: -
- Document outputs: `docs/html-course-notes.md`
- Document output exceptions: -
- Source proposal: `-`
- Status: PENDING
- Assigned agent: -

## Advisor Source Prompt

No Advisor source prompt recorded for this Task.

## Inclusion Policy

- Mandatory execution files: `prompt.md`, `context.md`, and `previous-results.md`.
- Always included: project memory, current Job/Task metadata, and Job notes.
- Previous results: up to the latest 2 recorded results from earlier Tasks in this Job.
- Job context refs: explicit Job-scoped references selected by the controlling agent or user.
- Task required docs: mandatory Task-scoped documents; missing refs block validation and execution.
- Task memory refs: mandatory Task-scoped workflow memory references; missing or non-memory refs block validation and execution.
- Repository documents, validation documents, and skill rules: included only through explicit Job context refs, Task required docs, or Task memory refs.
- Verified Team Policy Snapshot: included before Active Memory; required policy cannot be overridden by lower-priority context.
- Active workflow memory with an `always` category is included automatically while its status is `ACTIVE`.
- `task_selected` and `reference_only` memory is included only through explicit Task memory refs.
- Consumed proposals, rejected proposals, resolved memory, superseded memory, and archived memory are excluded.
- Unreferenced repository files and results from other Jobs are not included.
- `AGENTS.md` and `CLAUDE.md` remain session-level controlling-agent entrypoints and are not treated as task context artifacts by default.

## Job Notes

# Notes

## Context References

No explicit context references recorded for this job.

## Required Documents and Memory

No task-level required docs or memory refs recorded.

## Verified Team Policies

No verified Team Policy Snapshot is active.

## Active Workflow Memory

No active workflow memory recorded.
