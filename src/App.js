import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import MainNews from './pages/MainNews';
import DetailNews from './pages/DetailNews';



const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MainNews/>} />
        <Route path="/detail/:id" element={<DetailNews/>} />
        
        <Route path="*" element={ <div>잘못된 페이지 경로입니다.</div> } />
      </Routes>
    </div>
  );
}

export default App;
