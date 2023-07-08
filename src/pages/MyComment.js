/* (메인-메뉴-내가 남긴 댓글) 내가 남긴 댓글을 볼 수 있는 페이지 */
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import MyCommentList from './my/MyCommentList.js';
import StateBar from "../layout/Header/TopBar/StateBar";
import styled from 'styled-components';
import {MyContainer, MyHeader, BackIcon, MyTitle} from "../commonStyle";

const MyCommentContents = styled.div`
  margin: 24px 20px;
  margin-top: 104px;
`;


const MyComment = () => {
  const navigate = useNavigate();
  const comment = useSelector(state => state.comment);

  return (
    <MyContainer>
      <MyHeader>
        <StateBar/>
        <BackIcon
          src={process.env.PUBLIC_URL + '/image/arrow_back.png'}
          onClick={() => navigate(-1)}
        />
        <MyTitle>My Comments</MyTitle>
      </MyHeader>

      <MyCommentContents>
        {
          comment.map((a,i) => <MyCommentList key={i} i={i}/>)
        }
      </MyCommentContents>
    </MyContainer>
  );
}

export default MyComment;
