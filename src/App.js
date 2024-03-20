import './App.css';

import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
// import { Router } from 'react-router-dom';
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const  App = () =>  {

  
  const apiKey = "1a7921d1bc224d7088b8dbaf8eef0b95"
  
  const [progress , setProgress] = useState (0)

    return (
      <BrowserRouter>
      <div>
     
          <NavBar />
          <LoadingBar
          height={3}
        color='#f11946'
        setProgress={progress}
      />
          <Routes> 
          <Route exact path="/" element={<News setProgress = {setProgress} apiKey={apiKey} key="General" pageSize={6} country="in" category="General"/>}></Route>
          <Route exact path="/business" element={<News setProgress = {setProgress} apiKey={apiKey} key="business" pageSize={6} country="in" category="Business" categoryh2="From Business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress = {setProgress} apiKey={apiKey} key="entertainment" pageSize={6} country="in" category="Entertainment" categoryh2="From Entertainment"/>}></Route>
          <Route exact path="/health" element={<News setProgress = {setProgress} apiKey={apiKey} key="health" pageSize={6} country="in" category="Health" categoryh2="From Health"/>}></Route>
          <Route exact path="/science" element={<News setProgress = {setProgress} apiKey={apiKey} key="science" pageSize={6} country="in" category="Science" categoryh2="From Science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress = {setProgress} apiKey={apiKey} key="sports" pageSize={6} country="in" category="Sports" categoryh2="From Sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress = {setProgress} apiKey={apiKey} key="technology" pageSize={6} country="in" category="Technology" categoryh2="From Technology"/>}></Route>
        </Routes>
        
     </div>
     </BrowserRouter>
    )
  
}

export default App;