/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import articles, {ArticlesState} from './articles';

export type ExampleState = {
  articles: ArticlesState;
};

export default combineReducers({
  articles,
});
