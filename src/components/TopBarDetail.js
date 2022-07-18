/* (메인) 탑 바 - 로고, 메뉴 아이콘 */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from "./TopBar";

const TopFixedItem = styled.div`
  position: fixed;
  top: 24px;
  left: 0;
  width: 360px;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid #D7352A;
`;

const BackIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;

const CommentIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 56px;
  cursor: pointer;
`;

const BookMarkIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 20px;
`;


const TopBarDetail = () => {

  let navigate = useNavigate();

  return (
    <TopFixedItem>
      <TopBar/>
      <BackIcon src={process.env.PUBLIC_URL + '/image/arrow_back.png'} onClick={() => { navigate(-1) }}/>
      <CommentIcon src={process.env.PUBLIC_URL + '/image/comment.png'}/>
      <BookMarkIcon src={process.env.PUBLIC_URL + '/image/bookmark_line.png'}/>
    </TopFixedItem>
  );

}

export default TopBarDetail;