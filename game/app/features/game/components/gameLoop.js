import {Component} from 'react';
import {connect} from 'react-redux';

import {advanceGeneration} from '../actions';
import {progressSelector} from '../selectors';
import {GAME_LOOP} from '../../shared/constants';

class Game extends Component {
  componentWillMount() {
    setInterval(() => {
      const {progress, advanceGeneration} = this.props;

      if (!progress) {
        return;
      }

      advanceGeneration();
    }, GAME_LOOP);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  progress: progressSelector(state),
});

export default connect(mapStateToProps, {advanceGeneration})(Game);
