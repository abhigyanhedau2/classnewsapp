import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API

  pageSize = "9";

  state = {
    progress: 0,
    loadingBarColor: "#000000"
  }

  setProgress = (progress) =>
  {
    this.setState({
      progress: progress
    })
  }

  setLoadingBarColor = (color) =>
  {
    this.setState({
      loadingBarColor: color
    })
  }

  render() {
    return (
      
      <Router>
        <div>
          <Navbar /> 
          <LoadingBar
            color={this.state.loadingBarColor}
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="general" pageSize={this.pageSize} country="in" category="general" />} />

            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="business" pageSize={this.pageSize} country="in" category="business" />} />

            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />

            <Route exact path="/general" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="general" pageSize={this.pageSize} country="in" category="general" />} />

            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="health" pageSize={this.pageSize} country="in" category="health" />} />

            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="science" pageSize={this.pageSize} country="in" category="science" />} />

            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />

            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} setLoadingBarColor={this.setLoadingBarColor} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>

        </div>
      </Router>
      
      
      
      
      
      
      
      
      
      
      
      
      // <div>
      //   {/* business entertainment general health science sports technology */}
      //   <Navbar />
      //   <News setProgress={this.setProgress}  pageSize="9" country="in" category="technology" />

      // </div>
    )
  }
}

