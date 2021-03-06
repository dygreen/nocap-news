/* 메인화면: 뉴스 리스트 보여줌 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsData, newsIdSet } from "../store.js";
import axios from "axios";
import styled from 'styled-components';
import NewsCont from "../components/NewsCont.js";
import CategoryTab from "../components/CategoryTab.js";
import TopBarMain from "../components/TopBarMain.js";


const TopFixedItem = styled.div`
  position: fixed;
  top: 24px;
  left: 0;
  background: #fff;
`;

const NewsContBox = styled.div`
  margin-top: 118px;
`;

const LoadingMsg = styled.p`
  width: 360px;
  text-align: center;
  margin: 0px;
  margin-left: -15px;
  padding: 10px;
`;


// localStorage
const jsonLocalStorage = {
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
};



const MainNews = () => {

  let dispatch = useDispatch();
  let news = useSelector(state => state.news.data); // 뉴스(redux)
  let [loading, setLoading] = useState(true); // 로딩중
  let [category, setCategory] = useState(jsonLocalStorage.getItem('category')); // 카테고리


  // useEffect: 페이지가 렌더링되면 뉴스 데이터를 불러오기(axios)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 기사를 받아오는 중

      try {
        const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=b1e207f1b83d47a081c09e0040dd68e7`);
        const JsonData = res.data.articles;
        dispatch(newsData(JsonData)); // redux로 결과 전달
        dispatch(newsIdSet(JsonData)); // redux로 결과 전달
      }
      catch (err){
        console.log('오류가 발생했습니다.');
      }

      setLoading(false); // 받아오기 완료/실패
    }
    fetchData();
  },[category]);

  // news에 값이 없으면 null을 반환함(값이 없는데 null을 반환하지 않으면 잠시 컴포넌트 렌더링 과정에서 오류가 발생함)
  if(!news){
    return null;
  }


  return(
    <>
      <div className="row">
        <TopFixedItem>
          <TopBarMain/>
          <CategoryTab setCategory={setCategory}/>
        </TopFixedItem>
        <NewsContBox>
          { 
            loading == true 
            ? <LoadingMsg>로딩중입니다. 잠시만 기다려주세요!</LoadingMsg> 
            : null 
          }
          {
            news.map((a, i) => <NewsCont i={i} key={i}/>)
          }
        </NewsContBox>
      </div>
    </>
  );


}


export default MainNews;