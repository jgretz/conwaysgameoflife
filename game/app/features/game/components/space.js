import React from 'react';
import {connect} from 'react-redux';

import Creature from './creature';

import {toggleSpace} from '../actions';
import {spaceSelector} from '../selectors';

const handleClick = (x, y, toggleSpace) => () => {
  toggleSpace(x, y);
};

const Space = ({space, x, y, height, width, toggleSpace}) => (
  <div className="space noselect clickable" style={{height: `${height}%`, width: `${width}%`}} onClick={handleClick(x, y, toggleSpace)}>
    {space ? <Creature /> : null}
  </div>
);

const mapStateToProps = (state, props) => ({
  space: spaceSelector(state, props),
});

export default connect(mapStateToProps, {toggleSpace})(Space);
