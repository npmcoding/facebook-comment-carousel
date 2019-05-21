import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'papaparse';
import './fb-comments.css';
import CardCarousel from './CardCarousel';

class FbComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: null
        };

    this.setCommentData = this.setCommentData.bind(this);
    }

  componentDidMount() {
    parse("data.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: this.setCommentData
    })
  }

  setCommentData(results) {
    //console.log(results.data);

    if (results && results.data && results.data.length > 0) {

      this.setState({
        commentData: results.data
      })
    }
  }

  render() {
    const { commentData } = this.state;
    return (
      <div className="fb-comments-slider">

        {commentData && commentData.length < 1 &&
          <div>Loading comments...</div>
        }

        {commentData && commentData.length < 1 &&
          <div>No comment data available </div>
        }
        {commentData && commentData.length >= 1 &&
          <CardCarousel
            key={this.state.counter}
            commentData={this.state.commentData}
          />
        }
      </div>
    );
  }
}

let domContainer = document.querySelector('#fb-comments-container');
ReactDOM.render(<FbComments />, domContainer);