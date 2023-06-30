/* redux toolkit : state & 변경 함수 보관
- 메뉴, 카테고리 탭
- news
- 댓글
- 즐겨찾기
*/
import {combineReducers, configureStore, createSlice, getDefaultMiddleware} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

// menu: 메인 페이지 메뉴 모달창 컨트롤 + 카테고리 탭
const menu = createSlice({
  name : 'menu',
  initialState : {
    menuFlag: false,
    category: ''
  },
  reducers : {
    toggleMenu(state, action) {
      state.menuFlag = !action.payload
    },
    settingCategory(state, action) {
      state.category = action.payload
    }
  }
})

// news: 뉴스 데이터 (ajax요청)
const news = createSlice({
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
const comment = createSlice({
  name : 'comment',
  initialState : [
    { id: 0, user: 'Grace', date: '2022-03-19', content: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco' },
    { id: 1, user: 'Liam', date: '2022-05-22', content: 'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident' },
    { id: 2, user: 'Alicia', date: '2022-06-17', content: 'architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos' }
  ],
  reducers : {
    addContent(state, action){ // 댓글: 공백/중복 확인, 추가
      let copy = [...state];
      let same = copy.findIndex(a => a.content === action.payload.content); // content가 같으면 해당 index을 남김

      if ( action.payload.content.trim() === '' ){ // 공백 검사
        alert('Please enter your details.');
      } else if ( same >= 0 ){ // 중복인 경우 : 중복 알림
        alert('Your comment has already been registered.');
      } else { // 중복이 아닌 경우 : 댓글 추가
        copy.unshift(action.payload);
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
const bookmark = createSlice({
  name : 'bookmark',
  initialState : [
    {
      date : 'Mon May 23 2022',
      list : [
        { title : 'Kansas Vote Galvanizes Democrats to Campaign on Abortion Rights', published : '2022-05-23T09:12:54Z' },
        { title : 'In 4 Swing States, G.O.P. Election Deniers Could Oversee Voting', published : '2022-05-23T08:54:33Z' },
      ],
    },
    {
      date : 'Sun April 10 2022',
      list : [
        { title : 'When Home Is a Ferry Ship: An Influx From Ukraine Strains', published : '2022-04-23T09:12:54Z' },
      ],
    },
    {
      date : 'Fri Jan 07 2022',
      list : [
        { title : 'A Cynical Ploy by the Democratic Party', published : '2022-01-02T08:26:06Z' },
        { title : 'Maybe What Happened in Kansas', published : '2022-01-07T09:12:54Z' },
        { title : 'The Republican Party Is the Anti-Democracy Party', published : '2022-01-08T08:26:06Z' },
      ],
    },
  ],
  reducers : {
    bookmarking(state, action){ // 즐겨찾기한 아이템 추가
      let found = state.findIndex(a => a.date === action.payload.date);

      if( found >= 0 ){ // 추가한 날짜가 겹치면 해당 날짜에 데이터 추가
        state[found].list.unshift(action.payload.list[found]);
      } else { // 겹치지 않으면 날짜+데이터 모두 추가
        state.unshift(action.payload);
        return state
      }
    },
    removeContent(state, action){ // 아이템 삭제
      let remove = state[action.payload.i].list.filter(a => a.published !== action.payload.published); // list 데이터 삭제
      state[action.payload.i].list = remove; // 삭제한 list 업데이트

      // list 데이터가 없으면 해당 object 삭제
      if(state[action.payload.i].list.length == 0){
        state.splice(action.payload.i, 1);
      }

      return state
    },
  },
});

const reducers = combineReducers({
  menu : menu.reducer,
  news : news.reducer,
  comment : comment.reducer,
  bookmark : bookmark.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['menu', 'news', 'comment', 'bookmark']
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  // A non-serializable value was detected in an action, in the path: `type` 오류 해결
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export let { toggleMenu , settingCategory} = menu.actions;
export let { newsData, newsIdSet } = news.actions;
export let { addContent, blockContent } = comment.actions;
export let { bookmarking, removeContent } = bookmark.actions;
