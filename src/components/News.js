import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = 
  {
    country: "in",
    pageSize: 12,
    category: "general"
  }

  static propTypes = 
  {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string
  }

  defaultImage = "https://acadianakarate.com/wp-content/uploads/2017/04/default-image.jpg"

  constructor()
  {
    super();
    
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 12
    }
  }

  async updateNews()
  {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({loading: true});

    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount()
  {
    await this.setState({
      page: 1
    })

    await this.updateNews();
  }

  handlePreviousClick = async () => 
  {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;

    // this.setState({loading: true});

    // let data = await fetch(url);

    // let parsedData = await data.json();

    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false
    // })

    await this.setState({
      page: this.state.page-1
    })

    await this.updateNews();
  }
  
  handleNextClick = async () => 
  {
    // if(this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize))
    // { 
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aae0d9c248904c479273d48fa73cf68d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      
      // this.setState({loading: true});
      
      // let data = await fetch(url);
      
      // let parsedData = await data.json();
      
      // this.setState({
        //   articles: parsedData.articles,
        //   page: this.state.page + 1,
        //   loading: false
        // })
      // }
      await this.setState({
        page: this.state.page+1
      })

      await this.updateNews();
    }
    
    buttonColor = () => 
  {
    switch (this.props.category) 
    {
      case "general":
        return "primary";
      case "business":
        return "secondary";
      case "entertainment":
        return "warning";
      case "health":
        return "info";
      case "science":
        return "dark";
      case "sports":
        return "success";
      case "technology":
        return "danger";    
      default:
        break;
    }
  }

  render() {
    return (
      <div className='container my-3'>
          
          <h1 className='text-center'><b>NewsMonkey - Top Headlines</b></h1>

          {this.state.loading && <Spinner />}

          <div className="row">
            {!this.state.loading && this.state.articles.map((item) => {
              return <div className="col-md-4" key={item.url}>
                       <NewsItem title={item.title} description={item.description === null ? "" : item.description} imageURL={item.urlToImage === null ? this.defaultImage : item.urlToImage} newsURL={item.url} source={item.source.name} author={item.author} date={item.publishedAt} category={this.props.category} />
                     </div> 
            })}                   
          </div>

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className={`btn btn-${this.buttonColor()}`} onClick={this.handlePreviousClick} > &#8592; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className={`btn btn-${this.buttonColor()}`} onClick={this.handleNextClick} >Next &#8594; </button>
          </div>
      </div>
    )
  }
}

export default News