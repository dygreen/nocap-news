# No Cap News
> 자극적이거나 불쾌함을 일으켜 클릭만을 유도하는 제목을 필터링하여 보여주는 뉴스 어플
>
> [팀 프로젝트(2인): 2022.07.06 ~ 2022.08.08]
> - 디자이너 1명, 프론트엔드 1명
> - 역할) 서비스 기획, 뉴스 API 끌어오기 포함 프론트 구현
>
> 주소: https://dygreen.github.io/nocap-news/ <br>

#### _* 자세한 실행과정 정리([노션](https://prickle-turn-785.notion.site/No-cap-News-6ca35527dd5b4cd49716d8243d5df327))_

***
## Refactoring
* 폴더 구조 변경 : 각 폴더별 기능에 따라 컴포넌트 분류 및 리네이밍
* 레이아웃 정리 : Header 분리 (pathname에 따라 TopBar UI 변경)
* 메인 화면 '메뉴' : 페이지 → 모달창으로 변경
* 메인 화면 '카테고리 탭' : `localStorage` → `redux` 사용으로 변경
* 상세 페이지 새로고침 시 화면 표시 안되는 오류 해결 : `redux persist` 사용
