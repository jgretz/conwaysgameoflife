import React from 'react';
import {compose, withEffect} from '@truefit/bach';
import {withStyles} from '@truefit/bach-material-ui';
import {withAction} from '@truefit/bach-redux';
import {withHistory, withLocation} from '@truefit/bach-react-router';
import {History, Location} from 'history';
import {Fade, CircularProgress, Grid} from '@material-ui/core';
import {getCurrentUser} from '../actions';
import {handleApiError} from '../../shared/services';
import {EnqueueSnackbarFunction} from '../../shared/enhancers/withSnackbar';
import {withSnackbar} from '../../shared/enhancers';

interface Props {
  enqueueSnackbar: EnqueueSnackbarFunction;
  location: Location<ReferrerLocationState>;
  history: History;
  getCurrentUser: () => Promise<void>;
  classes: {
    container: string;
  };
}

type ReferrerLocationState = {
  referrer: Location;
};

const GetCurrentUserPage = ({classes}: Props) => {
  return (
    <Fade
      in
      style={{
        transitionDelay: '800ms',
      }}
      unmountOnExit
    >
      <Grid
        container
        direction="column"
        alignContent="center"
        justify="center"
        className={classes.container}
      >
        <Grid item>
          <CircularProgress size={200} />
        </Grid>
      </Grid>
    </Fade>
  );
};

const onLoad = ({enqueueSnackbar, location, history, getCurrentUser}: Props) => {
  (async () => {
    const returnPath = location?.state?.referrer?.pathname ?? '/';

    try {
      await getCurrentUser();

      history.push(returnPath);
    } catch (e) {
      const status = e?.response?.status;

      if (status === 401) {
        window.location.assign(
          `${process.env.API_BASE_URL}authentication/sign-in?redirectUri=${encodeURIComponent(
            (process.env.APP_BASE_URL ?? '') + returnPath,
          )}`,
        );
      } else {
        handleApiError(e, enqueueSnackbar);
        if (status !== 403 && status !== 404) history.push('/system-error');
      }
    }
  })();
};

export default compose(
  withSnackbar(),

  withHistory(),
  withLocation(),

  withAction('getCurrentUser', getCurrentUser),

  withEffect(onLoad, []),

  withStyles({
    container: {
      height: '100vh',
    },
  }),
)(GetCurrentUserPage);
