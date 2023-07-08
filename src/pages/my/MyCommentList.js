/* (메인-메뉴-내가 남긴 댓글)에 들어갈 컨텐츠 리스트 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockContent } from "../../store.js";
import styled from 'styled-components';
import {MyContentsTitle, MyDate} from "../../commonStyle";

const CommentBox = styled.div`
  position: relative; 
  width: 100%;
  padding: 16px 0 8px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
`;

const MoreBtn = styled.img`
  position: absolute;
  top: 16px;
  right: 10px;
  cursor: pointer;
`;

const RemoveBox = styled.div`
  position: absolute;
  top: 38px;
  right: 0px;
  width: 43px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  background: #F0F0F0;
  color: #8C8C8C;
  font-size: 12px;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
`;

const MyCommentList = ({i}) => {
  let dispatch = useDispatch();
  let comment = useSelector(state => state.comment);
  let [remove, setRemove] = useState(false);

  return(
    <>
      {
        comment[i].user === 'Dr.Saul Morar'
          ? <CommentBox>
            <MyContentsTitle mynews={false}>{comment[i].content}</MyContentsTitle>
            <MyDate>{comment[i].date}</MyDate>

            {/* 삭제버튼 (redux) */}
            <MoreBtn src={process.env.PUBLIC_URL + '/image/more_circle.png'} onClick={() => setRemove(!remove)}/>
            {
              remove === true
                ? (
                  <RemoveBox onClick={() => {
                    dispatch(blockContent({content: comment[i].content}));
                    setRemove(false);
                  }}
                  >delete</RemoveBox>
                )
                : null
            }
          </CommentBox>
          : null
      }
    </>
  );
}

export default MyCommentList;
