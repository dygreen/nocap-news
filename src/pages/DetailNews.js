/* detail 페이지 : 뉴스 기사 자세히 */

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const DetailNews = () => {

  let news = useSelector(state => state.news.data);
  let { id } = useParams(); // 현재 URL에 적힌 모든 파라미터를 object형식으로 저장해주는 함수
  let clickedNews = news.find(data => data.source.id == id); // 현재 URL의 /:id에 적힌 값과 데이터의 id 값이 같은지 비교, 참이면 변수에 저장함 -> html 표시

  
  return(
    <>
      <p>디테일페이지임다</p>
    </>
  );

}

export default DetailNews;