import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* business entertainment general health science sports technology */}
        <Navbar />
        <News pageSize="9" country="in" category="technology" />

      </div>
    )
  }
}

