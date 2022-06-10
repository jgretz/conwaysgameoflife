import React from 'react';
import {Box, Theme, Typography} from '@material-ui/core';
import {ErrorTwoTone} from '@material-ui/icons';
import {compose} from '@truefit/bach';
import {withStyles} from '@truefit/bach-material-ui';

export type PublicProps = {
  validationErrors: string[];
};

export type Props = PublicProps & {
  classes: {
    errorText: string;
  };
};

const FormValidationSummary = ({validationErrors, classes}: Props) => {
  if (!validationErrors || validationErrors.length <= 0) {
    return null;
  }

  return (
    <>
      {validationErrors.map((ve) => (
        <Box display="flex" alignItems="center" marginTop={1} key={ve}>
          <ErrorTwoTone fontSize="small" color="error" />
          <Typography variant="body2" color="error" className={classes.errorText}>
            {ve}
          </Typography>
        </Box>
      ))}
    </>
  );
};

export default compose<PublicProps>(
  withStyles((theme: Theme) => ({
    errorText: {
      marginLeft: theme.spacing(1),
    },
  })),
)(FormValidationSummary);
