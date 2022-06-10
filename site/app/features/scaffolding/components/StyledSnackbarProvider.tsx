import React, {ReactNode} from 'react';
import {SnackbarProvider} from 'notistack';
import {compose} from '@truefit/bach';
import {withStyles} from '@truefit/bach-material-ui';

type PublicProps = {
  children: ReactNode;
};

type Props = PublicProps & {
  classes: {
    variantSuccess: string;
    variantError: string;
    variantWarning: string;
    variantInfo: string;
  };
};

const StyledSnackbarProvider = ({classes, children}: Props) => (
  <SnackbarProvider classes={classes}>
    <>{children}</>
  </SnackbarProvider>
);

export default compose<PublicProps>(
  withStyles(() => ({
    variantSuccess: {},
    variantError: {},
    variantWarning: {},
    variantInfo: {},
  })),
)(StyledSnackbarProvider);
