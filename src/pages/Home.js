/* 메인화면: 뉴스 리스트 보여줌 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsData, newsIdSet } from "../store.js";
import axios from "axios";
import styled from 'styled-components';
import Header from "../layout/Header/Header";
import NewsCont from "../components/NewsCont.js";
import CategoryTab from "../components/CategoryTab.js";

const TopFixedItem = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 300;
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

const Home = () => {
  let dispatch = useDispatch();
  let news = useSelector(state => state.news.data); // 뉴스(redux)
  let [loading, setLoading] = useState(true); // 로딩중
  let [category, setCategory] = useState(""); // 카테고리

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
          try {
            const JsonData = res.data.articles;
            dispatch(newsData(JsonData)); // redux로 결과 전달
            dispatch(newsIdSet(JsonData)); // redux로 결과 전달
          } catch (err) {
            console.log('err : ', err)
          }
        })
        .catch((err) => {
          console.log('axios err : ', err)
        })

      setLoading(false); // 받아오기 완료/실패
    }

    fetchData();
  },[category]);

  // news에 값이 없으면 null을 반환함(값이 없는데 null을 반환하지 않으면 잠시 컴포넌트 렌더링 과정에서 오류가 발생함)
  /*if(!news){
    return null;
  }*/


  return(
    <div className="row">
      <TopFixedItem>
        <Header/>
        <CategoryTab setCategory={setCategory}/>
      </TopFixedItem>
      <div>
        {
          loading
          ? <LoadingMsg>로딩중입니다. 잠시만 기다려주세요!</LoadingMsg>
          : null
        }
        {
          news?.map((data, idx) => <NewsCont i={idx} key={idx}/>)
        }
      </div>
    </div>
  );
}


export default Home;
