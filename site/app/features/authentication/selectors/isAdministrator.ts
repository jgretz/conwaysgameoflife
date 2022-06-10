import {createSelector} from 'reselect';
import rolesSelector from './rolesSelector';
import SystemRoles from '../enums/systemRoles';

export default createSelector(
  rolesSelector,
  (roles) => roles?.some((role) => role === SystemRoles.Administrator) ?? false,
);
