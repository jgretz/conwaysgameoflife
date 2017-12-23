import {createSelector} from 'reselect';

import boardSelector from './boardSelector';
import spaceIndexSelector from './spaceIndexSelector';

export default createSelector(boardSelector, spaceIndexSelector, (board, index) => board.getIn([index.x, index.y]));
