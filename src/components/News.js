import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  defaultImage = "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"

  constructor()
  {
    super();
    
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount()
  {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=aae0d9c248904c479273d48fa73cf68d";

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles
    })
  }


  render() {
    return (
      <div className='container my-3'>
          
          <h1 className='text-center'><b>NewsMonkey - Top Headlines</b></h1>

          <div className="row">
            {this.state.articles.map((item) => {
              return <div className="col-md-4" key={item.url}>
                       <NewsItem title={item.title} description={item.description === null ? "" : item.description} imageURL={item.urlToImage === null ? this.defaultImage : item.urlToImage} newsURL={item.url}/>
                     </div> 
            })}
                               
          </div>
      </div>
    )
  }
}

export default News