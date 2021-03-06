/* redux toolkit : state & 변경 함수 보관 
- news
- 댓글
- 즐겨찾기
*/

import { configureStore, createSlice } from '@reduxjs/toolkit';

// news: 뉴스 데이터 (ajax요청)
let news = createSlice({
  name : 'news',
  initialState : {
    loading : 'first',
    data : [],
  },
  reducers : {
    newsData(state, action){ // news 데이터 셋팅
      if (state.loading === 'first'){ /* 두번째 reducer를 실행하기 전 데이터 값이 있어야 하므로 if문 실행 */
        state.data = action.payload;
        state.loading = 'second'
      }
    },
    newsIdSet(state, action){ // detail page를 위한 id값 셋팅
      if (state.loading === 'second'){
        action.payload.map((a,val) => action.payload[val].source.id = val);
        state.data = action.payload;
      }
    },
  },
});


// comment: 댓글 데이터 추가
let comment = createSlice({
  name : 'comment',
  initialState : [
    { id: 0, user: 'Grace', date: '2022-03-19', content: '우리의 되려니와, 청춘 꾸며 밝은 얼음이 동산에는 위하여, 운다. 싶이 두손을 현저하게 넣는 고동을 천지는 못할 칼이다. 유소년에게서 얼음에 그들에게 뛰노는 얼마나 것이다. 피고, 청춘이 이상을 있으랴?' },
    { id: 1, user: 'Liam', date: '2022-05-22', content: '봄바람을 불어 있는 품에 맺어, 위하여 원대하고, 생생하며, 것이다. 되려니와, 물방아 피부가 것은 어디 황금시대다. 찾아다녀도, 그들은 보는 눈이 쓸쓸한 길을 풍부하게 것은 보라. 가치를 거친 있는 투명하되 속잎나고, 트고, 사랑의 이것이다.' },
    { id: 2, user: 'Alicia', date: '2022-06-17', content: '만물은 간에 그들의 넣는 거선의 창공에 용감하고 구하기 오직 힘있다. 너의 바로 꽃이 풀이 풍부하게 이상 들어 그들의 듣는다. 작고 봄날의 내는 이 그들에게 싹이 못할 심장의 것이다.' }
  ],
  reducers : {
    addContent(state, action){ // 댓글: 공백/중복 확인, 추가
      let copy = [...state];
      let same = copy.findIndex(a => a.content === action.payload.content); // content가 같으면 해당 index을 남김

      if ( action.payload.content == '' ){ // 공백 검사
        alert('내용을 입력해주세요.');
      } else if ( same >= 0 ){ // 중복인 경우 : 중복 알림
        alert('댓글이 이미 등록되었습니다.');
      } else { // 중복이 아닌 경우 : 댓글 추가
        copy.push(action.payload);
        return copy
      }

    },
    blockContent(state, action){ // 댓글: 신고/차단
      let copy = [...state];
      let block = copy.filter(a => a.content !== action.payload.content); // 신고/차단 외의 댓글만 남음

      return block
    },
  },
});


// bookmark: 즐겨찾기 데이터
let bookmark = createSlice({
  name : 'bookmark',
  initialState : [
    {
      date : '',
      list : [
        { title : '', published : '' },
      ],
    },
    {
      date : 'Mon May 23 2022',
      list : [
        { title : '늘어나는 코로나 재감염…10명 중 3명이 소아·청소년', published : '2022-05-23T09:12:54Z' },
        { title : '휘발유값 3주째 하락세라는데…우리 동네는 왜이래', published : '2022-05-23T08:54:33Z' },
      ],
    },
    {
      date : 'Sun April 10 2022',
      list : [
        { title : '[단독] 다방까지 뒤졌지만… 훈민정음 상주본 회수 못 해', published : '2022-04-23T09:12:54Z' },
      ],
    },
    {
      date : 'Fri Jan 07 2022',
      list : [
        { title : '반팔 입고 다니는 북극…그린란드 빙하, 하루 60억톤 녹았다', published : '2022-01-02T08:26:06Z' },
        { title : '일, 원전 오염수 방출 확정…"7개월 뒤 제주 앞바다로"', published : '2022-01-07T09:12:54Z' },
        { title : '[날씨] 가장 덥다는 대서에 비소식…돌풍·천둥번개 동반', published : '2022-01-08T08:26:06Z' },
      ],
    },
  ],
  reducers : {
    bookmarking(state, action){
      /* let copy = [...state];
      copy.date == action.payload.date
      ? copy[0].list.unshift(action.payload.list)
      : copy.unshift(action.payload) */

      let found = state.findIndex(a => a.date === action.payload.date);
      let copy = [...state];

      if( found >= 0 ){
        copy[0].list.unshift(action.payload.list)
        return copy
      } else {
        copy.unshift(action.payload)
        return copy
      }
      
    },
  },
});



export default configureStore({
  reducer: { 
    news : news.reducer,
    comment : comment.reducer,
    bookmark : bookmark.reducer,
  }
}); 

export let { newsData, newsIdSet } = news.actions;
export let { addContent, blockContent } = comment.actions;
export let { bookmarking } = bookmark.actions;