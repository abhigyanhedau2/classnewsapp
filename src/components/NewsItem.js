import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    const {title, description, imageURL, newsURL} = this.props;

    let extendedDescription = description.slice(0, 100)+"..."

    return (
      <div className='my-5'>
          
          <div className="card" style={{width: '20rem'}}>
          <img src={imageURL} className="card-img-top" width="286px" height="180px" />
          <div className="card-body">
            <h5 className="card-titlet">{title}</h5>
            <p className="card-text">{description.length <= 100 ? description : extendedDescription}</p>
            <a href={newsURL} target="_blank" className="btn btn-sm btn-primary">Read More..</a>
          </div>
        </div>

      </div>
    )
  }
}

export default NewsItem