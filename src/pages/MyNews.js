/* (메인-메뉴-즐겨찾기) 즐겨찾기 메뉴 클릭시, DetailNews 상단 즐겨찾기 아이콘을 누른 뉴스 제목들을 볼 수 있는 페이지 */

import { useSelector } from "react-redux";
import styled from 'styled-components';

const MyNewTitle = styled.div`
  position: fixed;
  top: 41px;
  left: 150px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  z-index: 1000;
`;



const MyNews = () => {

  let bookmark = useSelector(state => state.bookmark);


  return (
    <>
      <MyNewTitle>즐겨찾기</MyNewTitle>
      {console.log(bookmark[0].list[0].title)}
    </>
  );
}

export default MyNews;