import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API

  const pageSize = "9";

  const [progress, setProgress] = useState(0);
  const [loadingBarColor, setLoadingBarColor] = useState("#000000");

  return (

    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color={loadingBarColor}
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="general" pageSize={pageSize} country="in" category="general" />} />

          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="business" pageSize={pageSize} country="in" category="business" />} />

          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />

          <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="general" pageSize={pageSize} country="in" category="general" />} />

          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="health" pageSize={pageSize} country="in" category="health" />} />

          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="science" pageSize={pageSize} country="in" category="science" />} />

          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="sports" pageSize={pageSize} country="in" category="sports" />} />

          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} setLoadingBarColor={setLoadingBarColor} key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>

      </div>
    </Router>

    // <div>
    //   {/* business entertainment general health science sports technology */}
    //   <Navbar />
    //   <News setProgress={setProgress}  pageSize="9" country="in" category="technology" />

    // </div>
  )
}

export default App;