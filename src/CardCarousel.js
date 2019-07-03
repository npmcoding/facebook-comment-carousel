import React, { Component, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './fb-comments.css';
import Card from './Card';

//let cardTimeOut;

export default class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      prevIndex: null,
      transitionClass: null,
      totalComments: props.commentData.length,
    };

    this.advanceNextSlide = this.advanceNextSlide.bind(this);
    this.handleNextSlideClick = this.handleNextSlideClick.bind(this);
    this.handlePrevSlideClick = this.handlePrevSlideClick.bind(this);
  }

  componentDidMount() {
  }

  handleNextSlideClick() {
    this.advanceNextSlide();
  }

  advanceNextSlide() {
    const { currentIndex, totalComments } = this.state;
    const newIndex = (currentIndex + 1) === totalComments ? 0 : currentIndex + 1;

    this.setState(prevState => ({
      currentIndex: newIndex,
      prevIndex: prevState.currentIndex,
      transitionClass: "next-comment-card"
    }));
  }

  handlePrevSlideClick() {
    const { currentIndex, totalComments } = this.state;
    const newIndex = (currentIndex - 1) < 0 ? totalComments - 1 : currentIndex - 1;

    this.setState(prevState => ({
      currentIndex: newIndex,
      prevIndex: prevState.currentIndex,
      transitionClass: "prev-comment-card"
    }));
  }

  render() {
    const { commentData } = this.props;
    const { currentIndex, prevIndex, transitionClass } = this.state;

    //const prevIndex = this.state.prevIndex === null ? -1 : this.state.prevIndex

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
            classNames={{
              enter: `${transitionClass}-enter`,
              enterActive: `${transitionClass}-enter-active`,
              exit: `${transitionClass}-exit`,
            }}
            key={currentIndex}
          >
            <div className="slider-card-wrapper current-card">
              <Card data={commentData[currentIndex]} />
            </div>
          </CSSTransition>
        </TransitionGroup>
        <TransitionGroup component={null}>
          {prevIndex !== null &&
            <CSSTransition
              timeout={1000}
              classNames={{
                enter: `${transitionClass}-enter`,
                enterActive: `${transitionClass}-enter-active`,
                exit: `${transitionClass}-exit`,
              }}
              key={prevIndex}
            >
              <div className="slider-card-wrapper prev-card">
                <Card data={commentData[prevIndex]} />
              </div>
            </CSSTransition>
          }
        </TransitionGroup>
      </Fragment>
    )
  }
}