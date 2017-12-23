import _ from 'lodash';
import React, {Component} from 'react';
import {JELLY_IMAGES, FACE_IMAGES} from '../../shared/constants';

export default class Creature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jelly: _.sample(JELLY_IMAGES),
      face: _.sample(FACE_IMAGES),
    };
  }

  render() {
    const {jelly, face} = this.state;

    return (
      <div className="creature">
        <img src={jelly} className="creature-jelly" />
        <img src={face} className="creature-face" />
      </div>
    );
  }
}
