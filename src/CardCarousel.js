import React, { Component, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './fb-comments.css';
import Card from './Card';

let cardTimeOut;

export default class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      prevIndex: null,
      transitionClass: 'initial-card-position',
      totalComments: props.commentData.length,
      timer: 5000
    };

    this.advanceNextSlide = this.advanceNextSlide.bind(this);
    this.handleNextSlideClick = this.handleNextSlideClick.bind(this);
    this.handlePrevSlideClick = this.handlePrevSlideClick.bind(this);
  }

  componentDidMount() {
    cardTimeOut = setTimeout(this.advanceNextSlide, this.state.timer);
  }

  handleNextSlideClick() {
    clearTimeout(cardTimeOut);
    this.advanceNextSlide();
  }

  advanceNextSlide() {
    const { currentIndex, totalComments } = this.state;
    const newIndex = (currentIndex + 1) === totalComments ? 0 : currentIndex + 1;

    this.setState({
      currentIndex: newIndex,
      prevIndex: currentIndex,
      transitionClass: "next-comment-card"
    });
    cardTimeOut = setTimeout(this.advanceNextSlide, this.state.timer);

  }

  handlePrevSlideClick() {
    clearTimeout(cardTimeOut);
    const { currentIndex, totalComments } = this.state;
    const newIndex = (currentIndex - 1) < 0 ? totalComments - 1 : currentIndex - 1;

    this.setState({
      currentIndex: newIndex,
      prevIndex: currentIndex,
      transitionClass: "prev-comment-card"
    });

    cardTimeOut = setTimeout(this.advanceNextSlide, this.state.timer);
  }

  render() {
    const { commentData } = this.props;
    const { currentIndex, transitionClass } = this.state;
    const prevIndex = this.state.prevIndex === null ? currentIndex : this.state.prevIndex

    return (
      <Fragment>
        <div className="slider-left-arrow"
          onClick={this.handlePrevSlideClick}>
          <i className="fa fa-chevron-left"></i>
        </div>
        <div className="slider-right-arrow"
          onClick={this.handleNextSlideClick}>
          <i className="fa fa-chevron-right"></i>
        </div>

        <TransitionGroup component={null}>
          <CSSTransition
            timeout={1000}
            classNames={transitionClass}
            key={currentIndex}
          >
            <div className="slider-card-wrapper">

              <Card data={commentData[prevIndex]} />

              <Card data={commentData[currentIndex]} />

              <Card data={commentData[prevIndex]} />

            </div>
          </CSSTransition>
        </TransitionGroup>
        }
      </Fragment>
    )
  }
}