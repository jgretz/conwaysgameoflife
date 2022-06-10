import React from 'react';
import {compose, withEffect} from '@truefit/bach';
import {withStyles} from '@truefit/bach-material-ui';
import {get} from '@truefit/http-utils';
import {CircularProgress, Grid, Fade} from '@material-ui/core';

type PublicProps = {
  onRender: () => void;
};

type InternalProps = {
  classes: {
    container: string;
  };
};

type Props = PublicProps & InternalProps;

const Component = ({classes}: Props) => (
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

const getAntiForgeryToken = ({onRender}: Props) => {
  // This will load a CSRF token in a cookie that will be automatically discovered
  // by the axios library in order to use double submit cookie CSRF protection.
  // This is important to use if you are using cookies to store any kind of
  // sensitive data like a JWT or other token or you're using cookie based auth.
  // You can find more details of the attack here: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
  // And the mitigation method we are using here: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
  // This requires configuration on the API side to validate the XSRF token
  // correctly.
  (async () => {
    try {
      await get('antiforgery-token');
    } catch (e) {
      /* eslint-disable no-console */
      console.dir(e);
      console.error('Failed to request an antiforgery token.');
      /* eslint-enable no-console */
    } finally {
      onRender();
    }
  })();
};

export default compose<PublicProps>(
  withEffect(getAntiForgeryToken, []),

  withStyles({
    container: {
      height: '100vh',
    },
  }),
)(Component);
