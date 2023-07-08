/* (메인-메뉴-즐겨찾기) 즐겨찾기 메뉴 클릭시, DetailNews 상단 즐겨찾기 아이콘을 누른 뉴스 제목들을 볼 수 있는 페이지 */
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import MyNewsList from "./my/MyNewsList.js";
import StateBar from "../layout/Header/TopBar/StateBar";
import styled from 'styled-components';
import {MyContainer, MyHeader, BackIcon, MyTitle} from "../commonStyle";


const MyNewsContents = styled.div`
  margin: 104px 20px 24px;
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
  const navigate = useNavigate();
  const bookmark = useSelector(state => state.bookmark);

  return (
    <>
      <MyContainer>
        <MyHeader>
          <StateBar/>
          <BackIcon
            src={process.env.PUBLIC_URL + '/image/arrow_back.png'}
            onClick={() => navigate(-1)}
          />
          <MyTitle>Favorites</MyTitle>
        </MyHeader>

        <MyNewsContents>
          {
            bookmark.map((data, idx) =>
              <>
                <AddDate key={`${idx}-${data.date}`}>{bookmark[idx].date}</AddDate>
                {
                  bookmark[idx].list.map((item, num) =>
                    <MyNewsList num={num} i={idx} key={item.title}/>
                  )
                }
              </>
            )
          }
        </MyNewsContents>
      </MyContainer>
    </>
  );
}

export default MyNews;
