import {get} from '@truefit/http-utils';
import {Dispatch} from 'redux';
import {createAction} from '@reduxjs/toolkit';
import {Article, User} from '../types';

export enum AddNewArticleActions {
  InProcess = 'ARTICLES/ADD_NEW_ARTICLE_IN_PROCESS',
  Success = 'ARTICLES/NEW_ARTICLE_CREATED',
  Fail = 'ARTICLES/ADD_NEW_ARTICLE_FAILED',
}

const USER_URL = 'https://randomuser.me/api/';
const ARTICLE_URL =
  'http://newsapi.org/v2/top-headlines?country=us&apiKey=7dea5f4a45ff4dec817eaf9d23315460';

const inProcess = createAction(AddNewArticleActions.InProcess);
const success = createAction<Article>(AddNewArticleActions.Success);
const fail = createAction<Error>(AddNewArticleActions.Fail);

type RandomUserResponse = {
  results: Array<RandomUser>;
};

type RandomUser = {
  name: RandomUserName;
  picture: RandomUserPicture;
};

type RandomUserName = {
  title: string;
  first: string;
  last: string;
};

type RandomUserPicture = {
  medium: string;
};

const getUser = async (): Promise<User> => {
  const response = await get<RandomUserResponse>(USER_URL);
  const raw = response.data.results[0];

  return {
    name: `${raw.name.title} ${raw.name.first} ${raw.name.last}`,
    imageUrl: raw.picture.medium,
  };
};

let counter = 0;
const getArticle = async (user: User): Promise<Article> => {
  const response = await get(ARTICLE_URL);
  const {articles} = response.data;

  const randomArticle = articles[Math.round(Math.random() * articles.length)];

  counter += 1;

  return {
    id: counter,
    user,
    title: randomArticle.title,
  };
};

export const addNewArticle = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(inProcess());

  try {
    const user = await getUser();
    const article = await getArticle(user);

    dispatch(success(article));
  } catch (error) {
    dispatch(fail(error));
  }
};
