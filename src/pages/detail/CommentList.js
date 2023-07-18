/* (Detail) 댓글 간단히 보여주기 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockContent } from "../../store.js";
import styled from 'styled-components';
import {MoreBtn} from "../../commonStyle";

const CommentList = ({i}) => {
  const dispatch = useDispatch();
  const comment = useSelector(state => state.comment);
  const [block, setBlock] = useState(false);

  // 신고/차단 데이터 컨트롤
  const fnSetBlock = ($value) => {
    const warnMsg = $value === 'report' ? 'a non-reportable' : 'an unblockable';
    const successMsg = $value === 'report' ? 'Reported.' : 'Blocked.';

    if (comment[i].user === 'Dr.Saul Morar') {
      alert(`This is ${warnMsg} target.`);
      setBlock(false);
    } else {
      dispatch(blockContent({content: comment[i].content}));
      alert(`${successMsg}`);
      setBlock(false);
    }
  }

  return (
    <CommentBox>
      <UserBox>
        <img src={
          comment[i].user === 'Dr.Saul Morar'
          ? process.env.PUBLIC_URL + '/image/author.png'
          : process.env.PUBLIC_URL + '/image/userface.png'
        } alt={comment[i].user}/>
        <UserInfo>
          <p>{comment[i].user}</p>
          <p>{comment[i].date}</p>
        </UserInfo>
      </UserBox>

      <UserComment>{comment[i].content}</UserComment>

      {/* 신고/차단 버튼 (redux) */}
      <MoreBtnCon src={process.env.PUBLIC_URL + '/image/more_circle.png'} onClick={() => setBlock(!block)}/>
      {
        block
          ? <BlockBox>
            <button onClick={() => fnSetBlock('report')}>report</button>
            <button onClick={() => fnSetBlock('block')}>block</button>
          </BlockBox>
        : null
      }
    </CommentBox>
  );
}

const CommentBox = styled.div`
  position: relative;
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
      margin: 0 0 0 8px;
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

const MoreBtnCon = styled(MoreBtn)`
  top: 20px;
`;

const BlockBox = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
  width: 43px;
  height: 44px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  button {
    display: flex;
    flex-direction: column;
    width: 43px;
    height: 22px;
    border: 0;
    font-weight: 400;
    font-size: 12px;
    text-align: center;
    line-height: 22px;
    color: #8C8C8C;
    cursor: pointer;
    &:first-of-type {
      border-bottom: 0.3px solid #8c8c8c;
    }
  }
`;

export default CommentList;
