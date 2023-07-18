/* (메인-메뉴-내가 남긴 댓글) 내가 남긴 댓글을 볼 수 있는 페이지 */
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import MyCommentList from './my/MyCommentList.js';
import StateBar from "../layout/Header/TopBar/StateBar";
import {MyContainer, MyContents, MyHeader, BackIcon, MyTitle} from "../commonStyle";

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

      <MyContents>
        {
          comment.map((a,i) => <MyCommentList key={i} i={i}/>)
        }
      </MyContents>
    </MyContainer>
  );
}

export default MyComment;
