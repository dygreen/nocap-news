/* 메인화면: 뉴스 리스트 보여줌 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {newsData, newsIdSet} from "../store.js";
import axios from "axios";
import styled from 'styled-components';
import Header from "../layout/Header/Header";
import NewsCont from "./main/NewsCont.js";
import CategoryTab from "./main/CategoryTab.js";

const TopFixedItem = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 300;
`;

const LoadingMsg = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px;
`;

const Home = () => {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.data);
  const category = useSelector(state => state.menu.category);
  const [loading, setLoading] = useState(true);

  // 뉴스 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 기사를 받아오는 중

      const option = {
        method: "GET",
        url: "https://gnews.io/api/v4/top-headlines",
        params: {
          topic: category,
          country: 'us',
          token: 'b58e30ef6a2623ef1c207061888987d8'
        }
      }

      await axios(option)
        .then((res) => {
          // redux로 결과 전달
          const JsonData = res.data.articles;
          dispatch(newsData(JsonData));
          dispatch(newsIdSet(JsonData));
        })
        .catch((err) => {
          console.log('axios err : ', err)
        })

      setLoading(false); // 받아오기 완료/실패
    }

    fetchData();
  },[category]);

  return(
    <div className="row">
      <TopFixedItem>
        <Header/>
        <CategoryTab/>
      </TopFixedItem>
      <div>
        {
          loading ?? <LoadingMsg>Loading.. please wait for a moment!</LoadingMsg>
        }
        {
          news.map((data) => <NewsCont i={data.source.id} key={data.source.id}/>)
        }
      </div>
    </div>
  );
}


export default Home;
