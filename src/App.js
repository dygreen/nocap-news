import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import StateBar from './components/StateBar.js';
import MainNews from './pages/MainNews.js';
import TopBarDetail from './components/TopBarDetail.js';
import DetailNews from './pages/DetailNews.js';
import CommentAll from './pages/CommentAll.js';
import TopBarMenu from './components/TopBarMenu';
import Menu from './pages/Menu.js';
import MyNews from './pages/MyNews.js';
import MyComment from './pages/MyComment.js';


const App = () => {
  return (
    <div className="App">
      <StateBar/>
      <Routes>
        <Route path="/" element={<MainNews/>} />

        <Route path="/m" element={<TopBarMenu/>}>
          <Route path="menu" element={<Menu/>} />
          <Route path="my-news" element={<MyNews/>} />
          <Route path="my-comment" element={<MyComment/>} />
        </Route>

        <Route path="/detail" element={<TopBarDetail/>}>
          <Route path=":id" element={<DetailNews/>} />
          <Route path=":id/comment" element={<CommentAll/>} />
        </Route>
        
        <Route path="*" element={ <div>잘못된 페이지 경로입니다.</div> } />
      </Routes>
    </div>
  );
}

export default App;
