/* (메인) 탑 바 - 로고, 메뉴 아이콘
즐겨찾기 버튼: 클릭시 해당 뉴스 제목+발행일 dispatch (Redux)
*/

import React, { useState } from "react";
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
`;


const TopBarDetail = () => {

  let navigate = useNavigate();
  let news = useSelector(state => state.news.data);
  let { id } = useParams();
  let clickedNews = news.find(data => data.source.id == id);
  let [icon, setIcon] = useState(false); // 즐겨찾기 아이콘
  let dispatch = useDispatch();

  let today = new Date();
  let todayFull = {
    weekday : today.toLocaleString('en-us', { weekday: "short" }),
    month : today.toLocaleString('en-us', { month: "short" }),
    date : ("0" + today.getDate()).slice(-2),
    year : today.getFullYear()
  };

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
        } onClick={() => {
          setIcon(true);
          dispatch(bookmarking(
            {
              date : `${todayFull.weekday} ${todayFull.month} ${todayFull.date} ${todayFull.year}`,
              list : [
                { title : clickedNews.title, published : clickedNews.publishedAt }
              ]
            }
          ));
        }   
        }/>

      </TopFixedItem>
      
      <Outlet/> {/* 서브 컴포넌트 표기할 곳 */}
    </>
  );

}

export default TopBarDetail;