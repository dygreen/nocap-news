/* (메인-메뉴-내가 남긴 댓글)에 들어갈 컨텐츠 리스트 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockContent } from "../../store.js";
import styled from 'styled-components';
import {MyContentsTitle, MyDate, MoreBtn} from "../../commonStyle";

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
            <MoreBtnCon src={process.env.PUBLIC_URL + '/image/more_circle.png'} onClick={() => setRemove(!remove)}/>
            {
              remove ??
                <RemoveBox onClick={() => {
                  dispatch(blockContent({content: comment[i].content}));
                  setRemove(false);
                }}
                >delete</RemoveBox>
            }
          </CommentBox>
          : null
      }
    </>
  );
}

const CommentBox = styled.div`
  position: relative; 
  width: 100%;
  padding: 16px 0 8px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
`;

const MoreBtnCon = styled(MoreBtn)`
  top: 16px;
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

export default MyCommentList;
