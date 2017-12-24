import {stateReducer} from 'truefit-react-utils';
import {TOGGLE_PROGRESS} from '../actions';

export default stateReducer(false, {
  [TOGGLE_PROGRESS]: state => !state,
});
