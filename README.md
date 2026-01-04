<div align="center">
  <h1 style="color:#282d33;">CODESHARE SNS 프로젝트</h1>
</div>

<!-- 프로젝트 소개 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">💡 프로젝트 소개</h2>
  <ul>
    <li>사용자 간 소셜 네트워크(SNS) 기능을 제공하는 웹 서비스입니다.</li>
    <li>게시글 작성, 이미지 업로드, CodePen 삽입, 댓글, 좋아요, 팔로우 기능을 지원합니다.</li>
    <li>Socket.IO 기반 실시간 채팅으로 공용 및 1:1 메시지를 주고받을 수 있습니다.</li>
  </ul>
</div>

<!-- 개발 기간 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">🗓 개발 기간</h2>
  <ul>
    <li><strong>11/25 ~ 12/02</strong></li>
    <li>프로젝트 기획 · DB 설계 · 서비스 개발 · 테스트 및 수정</li>
  </ul>
</div>

<!-- 팀원 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">👨‍👩‍👦‍👦 팀원 구성</h2>
  <table>
    <tr>
      <th>이름</th>
      <th>GitHub</th>
    </tr>
    <tr>
      <td>유희연</td>
      <td>
        <a href="https://github.com/hee8144" target="_blank">
          https://github.com/hee8144
        </a>
      </td>
    </tr>
  </table>
</div>

<!-- 기술 스택 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">🛠️ 기술 스택</h2>
  <table>
    <tr>
      <th>Frontend</th>
      <th>Backend / DB</th>
      <th>Others</th>
    </tr>
    <tr>
      <td>
        React (SPA, Hooks)<br>
        Material UI (MUI)<br>
        Axios / Fetch API
      </td>
      <td>
        Node.js / Express<br>
        MySQL
      </td>
      <td>
        JWT 인증<br>
        bcrypt 암호화<br>
        Multer (파일 업로드)<br>
        Socket.IO (실시간 통신)
      </td>
    </tr>
  </table>
</div>

<!-- 주요 기능 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">📌 주요 기능</h2>
  <ul>
    <li>회원가입 / 로그인 / 프로필 관리</li>
    <li>게시글 작성, 이미지 첨부, CodePen URL 삽입</li>
    <li>댓글 및 좋아요 기능</li>
    <li>팔로우 / 팔로잉 기반 피드 필터링</li>
    <li>무한 스크롤 피드</li>
    <li>실시간 공용 채팅 및 1:1 채팅</li>
    <li>알림(Notification) 시스템</li>
    <li>익명 게시글 작성</li>
  </ul>
</div>

<!-- 페이지별 기능 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">📑 페이지별 기능</h2>

  <div align="center">
    <h4>메인 페이지 (Feed)</h4>
    <img src="https://github.com/hee8144/image/blob/main/sns_feedpage.png?raw=true" width="70%">
    <p>
      무한 스크롤 기반 피드 화면으로,<br>
      게시글 · 이미지 · CodePen · 댓글 · 좋아요 · 팔로우 기능 제공
    </p>
  </div>

  <br>

  <div align="center">
    <h4>마이 페이지</h4>
    <img src="https://github.com/hee8144/image/blob/main/sns_mypage.png?raw=true" width="70%">
    <p>
      프로필 정보, 팔로워/팔로잉, 게시물 수 확인 가능<br>
      작성 글 / 좋아요한 글 탭 전환 및 실시간 반영
    </p>
  </div>

  <br>

  <div align="center">
    <h4>채팅 페이지</h4>
    <img src="https://github.com/hee8144/image/blob/main/chatpage.png?raw=true" width="70%">
    <p>
      공용 채팅 및 1:1 채팅 제공<br>
      최근 메시지 및 읽지 않은 메시지 수 표시
    </p>
  </div>

  <br>

  <div align="center">
    <h4>게시글 등록 페이지</h4>
    <img src="https://github.com/hee8144/image/blob/main/add.png?raw=true" width="70%">
    <p>
      게시글 작성 및 CodePen URL 첨부 가능<br>
      다중 이미지 업로드 및 미리보기 지원<br>
      익명 게시글 작성 옵션 제공
    </p>
  </div>
</div>

<!-- 트러블슈팅 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">🔧 트러블슈팅</h2>

  <div align="center"> <img src="https://github.com/hee8144/image/blob/main/add.png?raw=true" width="70%"> </div> <ul> <li><strong>문제</strong>: CodePen 링크를 가져온 후, 게시글 수정 화면에서 해당 CodePen 내용을 직접 수정할 수 있도록 구현하려 했으나 외부 서비스(CodePen)의 iframe 보안 정책으로 인해 내부 콘텐츠 접근 및 수정이 불가능했습니다. </li> <li><strong>해결</strong>: CodePen 내부 코드를 직접 수정하는 방식 대신, 사용자가 입력한 CodePen URL을 Embed URL 형식으로 변환하여 게시글에 미리보기 형태로 출력하는 구조로 변경했습니다. </li> <li><strong>배운 점</strong>: 외부 서비스 연동 시 보안 정책과 기술적 한계를 고려한 설계가 중요하며, 기능 구현이 어려운 경우 사용자 경험을 해치지 않는 대안 방식을 선택하는 것이 필요하다는 것을 배웠습니다. </li> </ul>

  <hr>

  <h3>③ 이미지 다중 업로드 미리보기 문제</h3>
  <div align="center">
    <img src="https://github.com/hee8144/image/blob/main/add.png?raw=true" width="70%">
  </div>
  <ul>
    <li><strong>문제</strong>: 다중 이미지 미리보기 렌더링 오류</li>
    <li><strong>해결</strong>: URL.createObjectURL + Multer 처리</li>
    <li><strong>배운 점</strong>: 클라이언트·서버 역할 분리의 중요성</li>
  </ul>
</div>

<!-- 프로젝트 후기 -->
<div style="text-align:left;">
  <h2 style="border-bottom:1px solid #d8dee4; color:#282d33;">🎇 프로젝트 후기</h2>
  <p align="center">
    React 기반 SPA 구조 이해 및 실시간 통신 구현 경험을 쌓을 수 있었으며,<br>
    실제 SNS 서비스 흐름을 직접 설계·구현해본 의미 있는 프로젝트였습니다.
  </p>
</div>
