import React, {InputHTMLAttributes, ReactNode} from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {compose, withEffect} from '@truefit/bach';
import {FormContextValues, withFormContext} from '@truefit/bach-react-hook-form';

type PublicProps = {
  name: string;
  checkedIcon?: ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  disableRipple?: boolean;
  icon?: ReactNode;
  id?: string;
  indeterminate?: boolean;
  indeterminateIcon?: ReactNode;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  required?: boolean;
  size?: 'small' | 'medium';
};

type Props = PublicProps & {
  formContext: FormContextValues;
};

const HookFormCheckbox = ({
  formContext,
  name,
  checkedIcon,
  color,
  disabled,
  disableRipple,
  icon,
  id,
  indeterminate,
  indeterminateIcon,
  inputProps,
  label,
  labelPlacement,
  required,
  size,
}: Props) => {
  const {watch, setValue} = formContext;
  const formValue = watch(name);

  const checkbox = (
    <Checkbox
      name={name}
      checked={formValue}
      checkedIcon={checkedIcon}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      icon={icon}
      id={id ?? name}
      indeterminate={indeterminate}
      indeterminateIcon={indeterminateIcon}
      inputProps={inputProps}
      onChange={(e) => setValue(name, e.target.checked)}
      required={required}
      size={size}
    />
  );

  return label ? (
    <FormControlLabel control={checkbox} label={label} labelPlacement={labelPlacement} />
  ) : (
    checkbox
  );
};

export default compose<PublicProps>(
  withFormContext(),

  withEffect(({name, formContext: {register}}: Props) => register({name}), []),
)(HookFormCheckbox);
