/* (메인-메뉴-즐겨찾기)에 들어갈 컨텐츠 리스트 */

import { useSelector } from "react-redux";
import styled from 'styled-components';

const Line = styled.div`
  width: 320px;
  height: 1px;
  background: #d9d9d9;
  margin: 8px 0;
`;

const BookTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const BookPulished = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8C8C8C;
`;


const MyNewsList = ({i, num}) => {

  let bookmark = useSelector(state => state.bookmark);

  return(
    <>
      <Line />
      <BookTitle>{bookmark[i].list[num].title}</BookTitle>
      <BookPulished>{bookmark[i].list[num].published}</BookPulished>
    </>
  );

}

export default MyNewsList;