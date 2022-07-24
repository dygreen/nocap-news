/* (메인-메뉴-즐겨찾기)에 들어갈 컨텐츠 리스트 */

import { useSelector } from "react-redux";

const MyNewsList = ({i, num}) => {

  let bookmark = useSelector(state => state.bookmark);

  return(
    <>
      
      <div>{bookmark[i].list[num].title}</div>
      <div>{bookmark[i].list[num].published}</div>
    </>
  );

}

export default MyNewsList;