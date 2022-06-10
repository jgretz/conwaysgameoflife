import React from 'react';
import {compose} from '@truefit/bach';
import {withStyles} from '@truefit/bach-material-ui';

import Spectrum from 'react-spectrum';
import {Typography, Theme} from '@material-ui/core';

import {Styles, CSSProperties} from '@material-ui/styles';
import {Article} from '../types';

type PublicProps = {
  article: Article;
};

type InternalProps = {
  classes: {
    tagline: string;
    block: string;
    avatar: string;
  };
};

type Props = PublicProps & InternalProps;

const ArticleBlock = ({article, classes}: Props) => (
  <div className={classes.block}>
    <Typography variant="h3">{article.title}</Typography>
    <div className={classes.tagline}>
      <img src={article.user.imageUrl} className={classes.avatar} alt="Author Avatar" />
      <Typography>{article.user.name}</Typography>
    </div>
    <Spectrum width={500} colors={['#757575', '#999999', '#0871F2', '#BF5AF2']} />
  </div>
);

// example of breaking out strong types styles
const styles: Styles<Theme, CSSProperties> = {
  block: {
    margin: 10,
  },

  tagline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
  },

  avatar: {
    marginRight: 10,
  },
};

export default compose<PublicProps>(withStyles(styles))(ArticleBlock);
