/* (메인-메뉴-내가 남긴 댓글) 내가 남긴 댓글을 볼 수 있는 페이지 */

import { useSelector } from 'react-redux';
import MyCommentList from '../components/MyCommentList.js';
import styled from 'styled-components';

const CommentContainer = styled.div`
  width: 360px;
  overflow: hidden;
`;

const MyCommentTitle = styled.div`
  position: fixed;
  top: 41px;
  left: 132px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;
`;

const MyCommentContents = styled.div`
  margin: 24px 20px;
  margin-top: 104px;
`;


const MyComment = () => {

  let comment = useSelector(state => state.comment);

  return (
    <CommentContainer>
      <MyCommentTitle>내가 남긴 댓글</MyCommentTitle>
      <MyCommentContents>
        {
          comment.map((a,i) => <MyCommentList key={i} i={i}/>)
        }
      </MyCommentContents>
    </CommentContainer>
  );
}

export default MyComment;