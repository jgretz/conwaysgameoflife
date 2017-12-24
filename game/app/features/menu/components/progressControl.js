import React from 'react';
import {connect} from 'react-redux';
import {Icon} from 'semantic-ui-react';

import {toggleProgress} from '../../game/actions';
import {progressSelector} from '../../game/selectors';

const ProgressControl = ({progress, toggleProgress}) => {
  const name = progress ? 'pause' : 'play';

  return (
    <Icon name={`${name} circle outline`} className="progress-control clickable" size="big" onClick={toggleProgress} />
  );
};

const mapStateToProps = state => ({
  progress: progressSelector(state),
});

export default connect(mapStateToProps, {toggleProgress})(ProgressControl);
