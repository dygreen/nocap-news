/* (Detail) 댓글 간단히 보여주기 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockContent } from "../store.js";
import styled from 'styled-components';

const CommentBox = styled.div`
  position: relative;
  width: 320px;
  margin: 0 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
`;

const UserBox = styled.div`
  display: flex;
  width: 100%;
  img{
    width: 40px;
    height: 40px;
    margin: 16px 0 8px;
  }
`;

const UserInfo = styled.div`
  p {
    &:first-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      margin: 19px 0 0 8px;
    }
    &:last-child {
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: #8C8C8C;
      margin: 0;
      margin-left: 8px;
    }
  }
`;

const UserComment = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #8C8C8C;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const MoreBtn = styled.img`
  position: absolute;
  top: 20px;
  right: 10px;
  cursor: pointer;
`;

const BlockBox = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
  width: 43px;
  height: 44px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  button{
    display: flex;
    flex-direction: column;
    align-item: center;
    justify-content: center;
    width: 43px;
    height: 22px;
    border: 0;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    color: #8C8C8C;
    padding: 5px 10px 3px; 
    cursor: pointer;
  }
`;


const CommentList = ({i}) => {

  let dispatch = useDispatch();
  let comment = useSelector(state => state.comment);
  let [block, setBlock] = useState(false);

  return (
    <CommentBox>

      <UserBox>
        <img src={
          comment[i].user == 'Dr.Saul Morar'
          ? process.env.PUBLIC_URL + '/image/author.png'
          : process.env.PUBLIC_URL + '/image/userface.png'
        }/>
        <UserInfo>
          <p>{comment[i].user}</p>
          <p>{comment[i].date}</p>
        </UserInfo>
      </UserBox>

      <UserComment>{comment[i].content}</UserComment>

      {/* 신고/차단 버튼 (redux) */}
      <MoreBtn src={process.env.PUBLIC_URL + '/image/more_circle.png'} onClick={() => setBlock(!block)}/>
      {
        block === true
        ? (
          <BlockBox>
            <button style={{borderBottom: '0.3px solid #8c8c8c'}} onClick={() => {
              if( comment[i].user == 'Dr.Saul Morar' ){
                alert('신고할 수 없는 대상입니다');
                setBlock(false);
              } else {
                dispatch(blockContent({content: comment[i].content}));
                alert('신고되었습니다');
                setBlock(false);
              }
            }
            }>신고</button>
            <button onClick={() => {
              if( comment[i].user == 'Dr.Saul Morar' ){
                alert('차단할 수 없는 대상입니다');
                setBlock(false);
              } else {
                dispatch(blockContent({content: comment[i].content}));
                alert('차단되었습니다');
                setBlock(false);
              }              
            }
            }>차단</button>
          </BlockBox>
        )
        : null
      }

    </CommentBox>
  );
}

export default CommentList;