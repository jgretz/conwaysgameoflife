import {createReducer, PayloadAction} from '@reduxjs/toolkit';

import {Article} from '../types';
import {AddNewArticleActions} from '../actions';

export type ArticlesState = Article[];

const INITIAL: ArticlesState = [];

export default createReducer(INITIAL, {
  [AddNewArticleActions.Success]: (state: ArticlesState, action: PayloadAction<Article>) => {
    state.push(action.payload);
  },
});
