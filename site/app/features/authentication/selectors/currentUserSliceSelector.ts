import {ApplicationState} from 'rootReducer';

export default (state: ApplicationState) => state.features.authentication.currentUser;
