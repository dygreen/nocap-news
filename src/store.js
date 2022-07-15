/* redux toolkit : state & 변경 함수 보관 */

import { configureStore, createSlice } from '@reduxjs/toolkit';

let news = createSlice({
  name : 'news',
  initialState : [],
  reducers : {
    newsData(state, action){
      return state = action.payload;
    }
  }
});

export default configureStore({
  reducer: { 
    news : news.reducer
  }
}); 

export let { newsData } = news.actions;