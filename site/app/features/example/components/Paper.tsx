import React from 'react';
import {compose, withCallback} from '@truefit/bach';
import {withActions, withSelector} from '@truefit/bach-redux';

import {Article} from '../types';
import ArticleBlock from './ArticleBlock';

import {addNewArticle} from '../actions';
import {articlesSelector} from '../selectors';

type Props = {
  articles: Article[];
  handleNewArticleClick: () => void;
  addNewArticle: () => void;
};

const Paper = ({articles, handleNewArticleClick}: Props) => (
  <div>
    <button type="button" onClick={handleNewArticleClick}>
      Add New Article
    </button>

    {articles.map((article) => (
      <ArticleBlock key={article.id} article={article} />
    ))}
  </div>
);

const handleNewArticleClick = (props: Props) => () => {
  props.addNewArticle();
};

// compose
export default compose(
  withActions({addNewArticle}),
  withSelector('articles', articlesSelector),
  withCallback('handleNewArticleClick', handleNewArticleClick),
)(Paper);
