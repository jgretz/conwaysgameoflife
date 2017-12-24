import React, {Component} from 'react';
import {connect} from 'react-redux';

import Board from './board';

import {advanceGeneration} from '../actions';
import {GAME_LOOP} from '../../shared/constants';

class Game extends Component {
  componentWillMount() {
    setInterval(this.props.advanceGeneration, GAME_LOOP);
  }

  render() {
    return (
      <div className="board-container">
        <Board />
      </div>
    );
  }
}

export default connect(null, {advanceGeneration})(Game);
