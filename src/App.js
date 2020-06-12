import React, { Component } from 'react';
import Snake from './Components/Snake';
import Food from './Components/Food';
import Footer from './Components/Footer';
import {Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo, faArrowRight, faArrowLeft, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  isActive: false,
  snakeDots: [
    [0,0],
    [2,0]
  ]
}
class App extends Component {

  handleStart = () => {
    this.setState({isActive: true});
  };
  handlePause = () => {
    this.setState({isActive: false});
  };
  handleRestart = () => {
    this.setState(initialState);
  }
  handleRight = () => {
    this.setState({direction: 'RIGHT'});
  }
  handleLeft = () => {
    this.setState({direction: 'LEFT'});
  }
  handleUp = () => {
    this.setState({direction: 'UP'});
  }
  handleDown = () => {
    this.setState({direction: 'DOWN'});
  }
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
 
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
        default:
          break;
    }
  }
  
  moveSnake = () => {
    if(this.state.isActive)
    {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        break;

    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }
  }
  checkIfOutOfBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }
  
  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }
  
  render() {
    return (
      <div>
      
        <div className="area">
          
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/>
      </div>
      <p className="head">
            <b><u>Snake Game</u></b>
          </p>
      <div className="main">
      
      <Button className="button" variant="info" size="lg"  onClick={this.handleStart}><FontAwesomeIcon icon={faPlay} /></Button>{'     '}
      <Button className="button" variant="primary" size="lg"  onClick={this.handlePause}><FontAwesomeIcon icon={faPause} /></Button> {'    '}
      <Button className="button" variant="danger" size="lg"  onClick={this.handleRestart}><FontAwesomeIcon icon={faRedo} /></Button>
     
      </div>
      <div className="controller">
      <p><Button className="button" id="up" variant="info" size="lg"  onClick={this.handleUp}><FontAwesomeIcon icon={faArrowUp} /></Button>{'     '}</p>
      <Button className="button" variant="info" size="lg"  onClick={this.handleLeft}><FontAwesomeIcon icon={faArrowLeft} /></Button>{'     '}
      <Button className="button" variant="primary" size="lg"  onClick={this.handleDown}><FontAwesomeIcon icon={faArrowDown} /></Button> {'    '}
      <Button className="button" variant="info" size="lg"  onClick={this.handleRight}><FontAwesomeIcon icon={faArrowRight} /></Button>
      </div>
      <Footer/>
      </div>
    );
  }

}

export default App;