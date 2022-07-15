/* redux toolkit : state & 변경 함수 보관 */

import { configureStore, createSlice } from '@reduxjs/toolkit';

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

export default configureStore({
  reducer: { 
    news : news.reducer
  }
}); 

export let { newsData, newsIdSet } = news.actions;