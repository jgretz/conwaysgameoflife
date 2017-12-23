import {configureHttp as httpConfigure} from 'truefit-react-utils';

const DEFAULT_CONFIG = {
};

const createConfig = () => () => ({
  ...DEFAULT_CONFIG,
});

export const configureHttp = store => httpConfigure(createConfig(store));
