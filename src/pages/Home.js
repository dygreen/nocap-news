/* 메인화면: 뉴스 리스트 보여줌 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {newsData, newsIdSet, toggleMenu} from "../store.js";
import axios from "axios";
import styled from 'styled-components';
import Header from "../layout/Header/Header";
import NewsCont from "./main/NewsCont.js";
import CategoryTab from "./main/CategoryTab.js";
import {HeaderWrapper, ContentsWrapper} from "../commonStyle";

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

      try {
        const res = await axios(option)
        // redux로 결과 전달
        const JsonData = res.data.articles;
        dispatch(newsData(JsonData));
        dispatch(newsIdSet(JsonData));

        setLoading(false); // 받아오기 완료
      }
      catch (err){
        console.log(err.request.response)
      }
    }

    fetchData();
  },[category]);

  useEffect(() => {
    dispatch(toggleMenu(true));
  },[])

  return(
    <div className="row">
      <HeaderWrapper>
        <Header/>
        <CategoryTab/>
      </HeaderWrapper>

      <ContentsWrapper>
        {
          loading
            ? <LoadingMsg>Loading.. please wait for a moment!</LoadingMsg>
            : news.map((data) => <NewsCont i={data.source.id} key={data.source.id}/>)
        }
      </ContentsWrapper>
    </div>
  );
}

const LoadingMsg = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px;
`;

export default Home;
