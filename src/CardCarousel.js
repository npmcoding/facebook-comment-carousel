import React, { Component, Fragment } from 'react';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './fb-comments.css';
import Card from './Card';

export default class CardCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      prevIndex: null,
      transitionClass: 'initial-card-position',
      totalComments: props.commentData.length
    };

    this.handleNextSlideClick = this.handleNextSlideClick.bind(this);
    this.handlePrevSlideClick = this.handlePrevSlideClick.bind(this);
    //this.afterAnimation = this.afterAnimation.bind(this);
  }

  handleNextSlideClick() {
    const { currentIndex, totalComments } = this.state;
    const newIndex = (currentIndex + 1) === totalComments ? 0 : currentIndex + 1;

    this.setState({
      currentIndex: newIndex,
      prevIndex: currentIndex,
      transitionClass: "next-comment-card"
    });
  }

  handlePrevSlideClick() {
    const { currentIndex, totalComments } = this.state;
    const newIndex = (currentIndex - 1) < 0 ? totalComments - 1 : currentIndex - 1;

    this.setState({
      currentIndex: newIndex,
      prevIndex: currentIndex,
      transitionClass: "prev-comment-card"
    });
  }

  /*afterAnimation() {
    this.setState({
      slideLeft: false,
      slideRight: false
    });
  }*/

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