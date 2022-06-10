import {configureHttp as configure} from '@truefit/http-utils';
import {Store} from 'redux';

export default (store: Store): void => {
  configure({
    baseConfig: {
      baseURL: process.env.API_BASE_URL,
      // TODO: Comment when NOT using cookie based auth (which is the default for ASP.NET Core Template)
      withCredentials: true,
      headers: {'X-Requested-With': 'XMLHttpRequest'},
    },
  });
};
