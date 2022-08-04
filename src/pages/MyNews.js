/* (메인-메뉴-즐겨찾기) 즐겨찾기 메뉴 클릭시, DetailNews 상단 즐겨찾기 아이콘을 누른 뉴스 제목들을 볼 수 있는 페이지 */

import { useSelector } from "react-redux";
import MyNewsList from "../components/MyNewsList.js";
import styled from 'styled-components';

const MyNewsContainer = styled.div`
  width: 360px;
  overflow: hidden;
`;

const MyNewTitle = styled.div`
  position: fixed;
  top: 41px;
  left: 150px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;
`;

const MyNewsContents = styled.div`
  margin: 24px 20px;
  margin-top: 104px;
`;

const AddDate = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.1px;
  color: #8C8C8C;
  margin-bottom: 8px;
  margin-top: 32px;
`;


const MyNews = () => {

  let bookmark = useSelector(state => state.bookmark);

  return (
    <MyNewsContainer>
      <MyNewTitle>Favorites</MyNewTitle>
      <MyNewsContents>
        {
          bookmark.map((a,i) => 
            <>
              <AddDate key={i}>{bookmark[i].date}</AddDate>
              {
                bookmark[i].list.map((a,num) => <MyNewsList num={num} i={i} key={num}/>)
              }
            </>
          )
        }
      </MyNewsContents>
    </MyNewsContainer>
  );
}

export default MyNews;