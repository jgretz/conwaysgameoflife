import React from 'react';
import {compose, withEffect, withMemo} from '@truefit/bach';
import {withAction} from '@truefit/bach-redux';
import {withStyles} from '@truefit/bach-material-ui';
import {withHistory, withLocation} from '@truefit/bach-react-router';
import {History, Location} from 'history';
import {Fade, CircularProgress, Grid} from '@material-ui/core';
import {signOut} from '../actions';
import {handleApiError} from '../../shared/services';

interface Props {
  history: History;
  location: Location<ReferrerLocationState>;
  queryString: URLSearchParams;
  localOnly: boolean;
  signOut: () => Promise<void>;
  classes: {
    container: string;
  };
}

type ReferrerLocationState = {
  referrer: Location;
};

const SignOut = ({classes}: Props) => (
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

const onLoad = ({history, location, localOnly, signOut}: Props) => {
  const returnPath = location?.state?.referrer?.pathname ?? '/';

  if (localOnly) {
    (async () => {
      try {
        await signOut();

        history.push(returnPath);
      } catch (e) {
        handleApiError(e);
      }
    })();
  } else {
    setTimeout(() => {
      window.location.assign(
        `${process.env.API_BASE_URL}authentication/sign-out-all?redirectUri=${encodeURIComponent(
          (process.env.APP_BASE_URL ?? '') + returnPath,
        )}`,
      );
    });
  }
};

export default compose(
  withHistory(),
  withLocation(),

  withMemo('queryString', ({location}: Props) => new URLSearchParams(location.search), [
    'location',
  ]),
  withMemo(
    'localOnly',
    ({queryString}: Props) => Boolean(queryString.get('localOnly') === 'true'),
    ['queryString'],
  ),

  withAction('signOut', signOut),

  withEffect(onLoad, []),

  withStyles({
    container: {
      height: '100vh',
    },
  }),
)(SignOut);
