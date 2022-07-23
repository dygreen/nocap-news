/* (메인-메뉴-내가 남긴 댓글) 내가 남긴 댓글을 볼 수 있는 페이지 */

import styled from 'styled-components';

const MyCommentTitle = styled.div`
  position: fixed;
  top: 41px;
  left: 132px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;
`;




const MyComment = () => {
  return (
    <>
      <MyCommentTitle>내가 남긴 댓글</MyCommentTitle>
    </>
  );
}

export default MyComment;