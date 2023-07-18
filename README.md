# No Cap News
> 자극적이거나 불쾌함을 일으켜 클릭만을 유도하는 컨텐츠를 제외하고 보여주는 뉴스 어플
>
> [팀 프로젝트(2인): 2022.07.06 ~ 2022.08.08]
> - 디자이너 1명, 프론트엔드 1명
> - 역할) 서비스 기획, 뉴스 API 끌어오기 포함 프론트 구현
>
> 주소: https://dygreen.github.io/nocap-news/ <br>
#### _* 자세한 실행과정 정리([노션](https://prickle-turn-785.notion.site/No-cap-News-6ca35527dd5b4cd49716d8243d5df327))_

<br/>

## Refactoring
[2023.07 ~ 진행중]
* 폴더 구조 변경 : 각 폴더별 기능에 따라 컴포넌트 분류 및 리네이밍
* 레이아웃 정리 : Header 분리 (pathname에 따라 TopBar UI 변경)
* 메인 화면 '메뉴' : 페이지 → 모달창으로 변경
* 메인 화면 '카테고리 탭' : `localStorage` → `redux` 사용으로 변경
* 상세 페이지 새로고침 시 화면 표시 안되는 오류 해결 : `redux persist` 사용
* 상세 페이지 '즐겨찾기' : `localStorage` → `redux` 사용으로 변경
* styled-components : 공통 스타일 따로 관리(commonStyle.js)해 컴포넌트 당 코드 줄임
* 이미지 16:9 비율로 수정
<br/>

## Component Tree
![nocap-news-tree (1)](https://github.com/dygreen/nocap-news/assets/95523625/8f55697d-a79c-4b41-a643-7ec7b3da2863)

<br/>

## Service Info
최근 상업적인 목적을 위해 자극적인 제목/내용을 강조하거나 제대로된 정보를 제공하지 않는 뉴스가 많아져, <br/>이에 신뢰를 잃고 피로가 쌓인 사람들을 위한 '군더더기 없이 깔끔하게 뉴스만 제공하는 서비스'

[페이지 구성] 메인, 기사 본문(디테일), 메뉴, 즐겨찾기, 내가 남긴 댓글
* 비즈니스, 엔터 등 총 7개의 카테고리별 실시간 뉴스 확인 가능
* 뉴스 썸네일 클릭시 해당 기사 본문 보기
* 댓글 남기기(+글자 수 세기), 다른 댓글 신고/차단 기능
* '댓글 더보기'로 전체 댓글 확인 가능(+총 댓글 수)
* 기사 본문 상단 '즐겨찾기' 아이콘 클릭시, 즐겨찾기 페이지에서 확인 가능(+삭제)
* 내가 남긴 댓글 확인 가능(+삭제)


<br/>

## Code Info
* React Router(v6)로 페이지 나누기: `Routes`,`Outlet`... 

_Main_
* [News API](https://newsapi.org/v2)에서 카테고리별 뉴스 API 요청(axios)
* `useEffect`를 통해 카테고리 탭메뉴가 변경될 때마다 API 정보 업데이트하기
```javascript
useEffect(() => {
  const fetchData = async () => {
    setLoading(true); // 기사를 받아오는 중

    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=b1e207f1b83d47a081c09e0040dd68e7`);
      const JsonData = res.data.articles;
      dispatch(newsData(JsonData), newsIdSet(JsonData)); // redux로 결과 전달
    }
    catch (err){
      console.log('오류가 발생했습니다.');
    }

    setLoading(false); // 받아오기 완료/실패
  }
  fetchData();
},[category]);
```
* 여러 컴포넌트에서 사용하는 state는 `Redux(redux toolkit)`로 관리
```javascript
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
```
* 뉴스 정보를 불러오는 동안 로딩중 텍스트 표시
* `map()`을 활용해 뉴스 정보 + 카테고리 표시
* 탭 메뉴: 탭 메뉴를 클릭하면 해당 제목으로 `state(=category)`를 변경해 내용 표시 + 클릭 배경 효과 적용
* 뉴스 이미지가 보이지 않는 경우 default image 표시
* 메뉴 아이콘 클릭시 메뉴 등장

***

_Detail_
* (Redux) 뉴스를 클릭했을 때 해당 뉴스를 자세히 보여주기 위해 Open API 데이터에 id 값 추가 -> id 값을 url의 맨 뒤에 넣어 `useParams()`를 사용할 수 있도록 만듦
* Main -> Detail 페이지로 이동시 스크롤이 Main 페이지에서 있었던 위치가 그대로 유지되는 것을 해결하기 위해 `useLocation()` 사용(index.js에 적용)
* `useNavigate()`를 사용하여 Detail 페이지 이동 및 뒤로가기 버튼 구현
* `localStorage`를 사용하여 Detail 페이지에서 뒤로가기 버튼을 눌렀을 때, 선택했던 카테고리/스크롤 위치 유지하기
```javascript
const CategoryTab = ({setCategory}) => {

  const [currentTab, setCurrentTab] = useState(jsonLocalStorage.getItem('num')); 

  const selectTabHandler = (index) => {
    setCurrentTab(index);
  };

  const settingLocal = (key, value) => {
    jsonLocalStorage.removeItem(key);
    jsonLocalStorage.setItem(key, value);
  };


  return(
    <TabContainer>
      <TabBox>
        {
          categories.map((tabs,i) => 
            <TabItem style={
              currentTab === i ? selectedTab : null
            }
            onClick={() => {
              window.scrollTo(0, 0); // 카테고리 탭을 누를 때마다 페이지 맨 위로
              // 선택한 카테고리 저장
              settingLocal('category', tabs.name);
              setCategory(jsonLocalStorage.getItem('category'));
              // 선택한 카테고리 index 저장(style)
              settingLocal('num', i);
              selectTabHandler(jsonLocalStorage.getItem('num'));
            }} 
            key={i}
            >{tabs.text}</TabItem>
          )
        }
      </TabBox>
    </TabContainer>
  );

}
```

* 댓글 입력창 누르면 '큰 입력창(300자 작성 가능)' 등장
* 댓글 더보기 버튼 누르면 '해당 뉴스의 전체 댓글 페이지'로 넘어감
* 댓글 입력 글자수 세기 -> `useDeferredValue()`를 사용해 `onChange()`로 인한 로딩 속도 저하 방지
```javascript
let [count, setCount] = useState(''); // 글자수 세기
let countResult = useDeferredValue(count); // 성능개선: 글자수 세기의 실행시점을 뒤로 옮겨 반응속도 높이기

<InputChange type={'text'} placeholder={'댓글을 입력해주세요.'} autoFocus maxLength={300} onChange={(e) => {setCount(e.target.value.length)} }/>
<InputBottom>
  <div>{ countResult === '' ? 0 : countResult }/300</div>
</InputBottom>
```

* 댓글 입력 후 '완료' 버튼을 누르면 해당 데이터를 `Redux`로 전송하여, 공백/중복 검사 후 화면에 표시
```javascript
reducers : {
  addContent(state, action){ // 댓글: 공백/중복 확인, 추가
    let copy = [...state];
    let same = copy.findIndex(a => a.content === action.payload.content); // content가 같으면 해당 index을 남김

    if ( action.payload.content == '' ){ // 공백 검사
      alert('내용을 입력해주세요.');
    } else if ( same >= 0 ){ // 중복인 경우 : 중복 알림
      alert('댓글이 이미 등록되었습니다.');
    } else { // 중복이 아닌 경우 : 댓글 추가
      copy.unshift(action.payload);
      return copy
    }

  },
},
```

* 댓글 '신고/차단' 버튼을 누르면 해당 데이터를 `Redux`에 전송하여, `filter()`를 사용해 댓글 삭제 후 알림 표시
```javascript
blockContent(state, action){ // 댓글: 신고/차단
  let copy = [...state];
  let block = copy.filter(a => a.content !== action.payload.content); // 신고/차단 외의 댓글만 남음

  return block
},
```

* 상단 '즐겨찾기' 아이콘을 누르면 해당 뉴스의 데이터를 `Redux`에 전송하여, `unshift()`를 사용해 배열의 가장 앞에 데이터 집어넣어 표시(메인-메뉴-즐겨찾기 페이지)
```javascript
bookmarking(state, action){
  let found = state.findIndex(a => a.date === action.payload.date);

  if( found >= 0 ){ // 추가한 날짜가 겹치면 해당 날짜에 데이터 추가
    state[found].list.unshift(action.payload.list[found]);
  } else { // 겹치지 않으면 날짜+데이터 모두 추가
    state.unshift(action.payload);
    return state
  }
  
},
```

* '즐겨찾기' 아이콘을 누르면, 해당 뉴스의 데이터를 `localStorage`에 저장하여 페이지를 이탈했다 돌아와도 (아이콘의)누른 상태가 유지되도록 함
* '즐겨찾기' 아이콘을 두 번 이상 누를 수 없도록 하여, 메인-메뉴-즐겨찾기에 데이터가 중복으로 추가할 수 없도록 함

***

_MyNews(메인-메뉴-즐겨찾기)_
* 즐겨찾기 데이터 삭제 기능 (+ list에 데이터가 없으면 해당 날짜 박스 삭제)

_MyComment(메인-메뉴-내가 남긴 댓글)_
* Detail 페이지에서 남긴 댓글을 볼 수 있음 (+ 댓글 삭제 기능)
