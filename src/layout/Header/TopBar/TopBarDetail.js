/* (메인) 탑 바 - 로고, 메뉴 아이콘
즐겨찾기 버튼: 클릭시 해당 뉴스 제목+발행일 dispatch (Redux)
*/
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TopBar from "./TopBar";
import { bookmarking } from "../../../store";
import styled from 'styled-components';
import {BackIcon} from "../../../commonStyle";

const TopBarDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const news = useSelector(state => state.news.data);
  const bookmarkList = useSelector(state => state.bookmark);
  const { id } = useParams();
  const clickedNews = news.find(data => data.source.id === Number(id));
  
  // 즐겨찾기 아이콘
  const [icon, setIcon] = useState(false);

  // 날짜 데이터 전달
  let today = new Date();
  let todayFull = {
    weekday : today.toLocaleString('en-us', { weekday: "short" }),
    month : today.toLocaleString('en-us', { month: "short" }),
    date : ("0" + today.getDate()).slice(-2),
    year : today.getFullYear()
  };

  // 컴포넌트 mount 시 : 아이콘 UI 세팅
  useEffect(() => {
    // store 속 bookmark 항목의 'list'만 모은 array 만들기
    const resultList = bookmarkList.reduce((acc, curr) => {
      return acc.concat(curr.list);
    }, []);

    // store 데이터와 현재 클릭한 데이터 비교해 즐겨찾기 아이콘 UI 세팅
    if (resultList.findIndex(data => data.published === clickedNews.publishedAt) >= 0) {
      setIcon(true);
    } else {
      setIcon(false);
    }
  },[bookmarkList]);

  return (
    <>
      <TopBar detail={true}/>

      <BackIcon src={process.env.PUBLIC_URL + '/image/arrow_back.png'} onClick={() => navigate(-1) }/>

      <CommentIcon src={process.env.PUBLIC_URL + '/image/comment.png'} onClick={() => navigate(`/detail/${id}/comment`)}/>

      {/* 즐겨찾기 아이콘 */}
      <BookMarkIcon
        src={
          !icon
          ? process.env.PUBLIC_URL + '/image/bookmark_line.png'
          : process.env.PUBLIC_URL + '/image/bookmark_fill.png'
        }
        onClick={() => (
          // icon이 true(채워진)이면 dispatch가 되지 않도록 함
          !icon
          ? dispatch(bookmarking({
              date : `${todayFull.weekday} ${todayFull.month} ${todayFull.date} ${todayFull.year}`,
              list : [
                { title : clickedNews.title, published : clickedNews.publishedAt }
              ]})
            )
          : alert('Already been added.')
        )}
      />
    </>
  );
}

const CommentIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 56px;
  cursor: pointer;
`;

const BookMarkIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 20px;
  cursor: pointer;
`;

export default TopBarDetail;
