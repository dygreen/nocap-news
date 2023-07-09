/* (메인-메뉴-즐겨찾기)에 들어갈 컨텐츠 리스트 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeContent } from "../../store.js";
import styled from 'styled-components';
import {MyContentsTitle, MyDate, MoreBtn} from "../../commonStyle";

const MyNewsList = ({i, num}) => {
  let dispatch = useDispatch();
  let bookmark = useSelector(state => state.bookmark);
  let [remove, setRemove] = useState(false);

  return(
    <>
      <Line>
        {/* 삭제버튼 (redux) */}
        <MoreBtnCon src={process.env.PUBLIC_URL + '/image/more_circle.png'} onClick={() => setRemove(!remove)}/>
        {
          remove ??
            <RemoveBox
              onClick={() => {
                dispatch(removeContent({
                  published: bookmark[i].list[num].published,
                  i: i,
                  num: num,
                  })
                );
                setRemove(false);
              }}
            >delete</RemoveBox>
        }
      </Line>
      <MyContentsTitle mynews={true}>{bookmark[i].list[num].title}</MyContentsTitle>
      <MyDate>{bookmark[i].list[num].published}</MyDate>
    </>
  );
}

const Line = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  margin: 8px 0;
`;

const MoreBtnCon = styled(MoreBtn)`
  top: 11px;
`;

const RemoveBox = styled.div`
  position: absolute;
  top: 32px;
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

export default MyNewsList;
