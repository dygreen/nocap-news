/* (메인) 탑 바 - 로고, 메뉴 아이콘
즐겨찾기 버튼: 클릭시 해당 뉴스 제목+발행일 dispatch (Redux)
*/

import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import TopBar from "./TopBar";
import { bookmarking } from "../store";

const TopFixedItem = styled.div`
  position: fixed;
  top: 24px;
  left: 0;
  width: 360px;
  height: 56px;
  background: #fff;
  border-bottom: 2px solid #D7352A;
  z-index: 9999;
`;

const BackIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 20px;
  cursor: pointer;
`;

const CommentIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 56px;
  cursor: pointer;
`;

const BookMarkIcon = styled.img`
  position: absolute;
  top: 16px;
  right: 20px;
  cursor: pointer;
`;

// localStorage : setIcon 조정
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
};



const TopBarDetail = () => {

  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  let news = useSelector(state => state.news.data);
  let { id } = useParams();
  let clickedNews = news.find(data => data.source.id == id);

  let [icon, setIcon] = useState(false); // 즐겨찾기 아이콘
  let [bookList, setBookList] = useState(() => { // localStorage 값 가져오기
    return jsonLocalStorage.getItem('newsId') || []
  });


  // 즐겨찾기: localStorage에 데이터 추가
  function bookListAdd(data){ 
    const ListAdd = [...bookList, data];
    jsonLocalStorage.setItem('newsId', ListAdd);
    setIcon(true);
  }


  // 즐겨찾기 리스트 중복 추가 방지
  function iconHandler(data){ 
    const existingBook = localStorage.getItem('newsId');

    if( existingBook != null ){ // local에 값이 있으면, 중복 데이터인지 검사 후 추가/중복알림
      const found = existingBook.includes(clickedNews.publishedAt);
      found == true ? alert('이미 추가되었습니다') : bookListAdd(data);
    } else { // local에 값이 없으면 추가
      bookListAdd(data);
    }

  }


  // 날짜 데이터 전달
  let today = new Date();
  let todayFull = {
    weekday : today.toLocaleString('en-us', { weekday: "short" }),
    month : today.toLocaleString('en-us', { month: "short" }),
    date : ("0" + today.getDate()).slice(-2),
    year : today.getFullYear()
  };


  // 아이콘 변경 유지: 현재 페이지가 즐겨찾기 누른 리스트('newsId')에 있으면 아이콘 변경된 상태(채워짐) 유지
  useEffect(() => {
    if( localStorage.getItem('newsId') != null ){
      const found = localStorage.getItem('newsId').includes(clickedNews.publishedAt);
      found == true ? setIcon(true) : setIcon(false);
    }
  },[]);
  


  return (
    <>
      <TopFixedItem>
        <TopBar/>

        <BackIcon src={process.env.PUBLIC_URL + '/image/arrow_back.png'} onClick={() => navigate(-1) }/>

        <CommentIcon src={process.env.PUBLIC_URL + '/image/comment.png'} onClick={() => navigate(`/detail/${id}/comment`)}/>

        <BookMarkIcon src={ /* 즐겨찾기 아이콘 */
          icon == false
          ? process.env.PUBLIC_URL + '/image/bookmark_line.png'
          : process.env.PUBLIC_URL + '/image/bookmark_fill.png'
        } 
        onClick={() => {
          // icon이 true(채워진)이면 dispatch가 되지 않도록 함
          icon == false
          ? dispatch(bookmarking(
            {
              date : `${todayFull.weekday} ${todayFull.month} ${todayFull.date} ${todayFull.year}`,
              list : [
                { title : clickedNews.title, published : clickedNews.publishedAt }
              ]
            }
          ))
          : null;

          iconHandler(clickedNews.publishedAt); // clickedNews.title로 중복 데이터를 선별하기엔 ""이 제목 중간에 있는 기사의 경우 정확한 판별이 되지 않아 발행일(고유)로 판단하기로 함
        }}
        />

      </TopFixedItem>
      
      <Outlet/> {/* 서브 컴포넌트 표기할 곳 */}
    </>
  );

}

export default TopBarDetail;