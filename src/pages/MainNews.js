/* 메인화면: 뉴스 리스트 보여줌 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import NewsCont from "../components/NewsCont";
import CategoryTab from "../components/CategoryTab";
import TopBars from "../components/TopBars";


const TopFixedItem = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
`;

const NewsContBox = styled.div`
  margin-top: 100px;
`;

const LoadingMsg = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10px;
`;


const MainNews = () => {

  let [news, setNews] = useState(null); // 뉴스 데이터
  let [loading, setLoading] = useState(true); // 로딩중
  let [category, setCategory] = useState(''); // 카테고리


  // useEffect: 페이지가 렌더링되면 뉴스 데이터를 불러오기(axios)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 기사를 받아오는 중

      try {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=b1e207f1b83d47a081c09e0040dd68e7`);
        const JsonData = res.data.articles;
        setNews(JsonData);
        newsIdSet(); // detail page를 위한 id값 부여하는 함수
      }
      catch (err){
        alert('오류가 발생했습니다.');
      }

      setLoading(false); // 받아오기 완료/실패
    }
    fetchData();
  },[category]);

  // news에 값이 없으면 null을 반환함(값이 없는데 null을 반환하지 않으면 잠시 컴포넌트 렌더링 과정에서 오류가 발생함)
  if(!news){
    return null;
  }

  // detail page를 위한 id값 부여하는 함수
  const newsIdSet = () => {
    news.map((a,i) => news[i].source.id = i);
  };
  

  return(
    <>
      <div className="row">
        <TopFixedItem>
          <TopBars/>
          <CategoryTab setCategory={setCategory}/>
        </TopFixedItem>
        <NewsContBox>
          { 
            loading == true 
            ? <LoadingMsg>로딩중입니다. 잠시만 기다려주세요!</LoadingMsg> 
            : null 
          }
          {
            news.map((news,i) => 
              <NewsCont news={news} newsIdSet={newsIdSet} key={i}/>
            )
          }
        </NewsContBox>
      </div>
    </>
  );
}


export default MainNews;