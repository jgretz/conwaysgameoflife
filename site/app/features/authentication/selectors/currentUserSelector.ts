import {createSelector} from 'reselect';
import currentUserSliceSelector from './currentUserSliceSelector';

export default createSelector(currentUserSliceSelector, (slice) => slice.user);
