import React, {InputHTMLAttributes, ReactNode} from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {useField} from 'formik';

type Props = {
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

export default ({
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
  const [field, , helpers] = useField(name);

  const checkbox = (
    <Checkbox
      name={field.name}
      checked={Boolean(field.value)}
      onChange={(e) => helpers.setValue(e.target.checked)}
      onBlur={field.onBlur}
      checkedIcon={checkedIcon}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      icon={icon}
      id={id ?? name}
      indeterminate={indeterminate}
      indeterminateIcon={indeterminateIcon}
      inputProps={inputProps}
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
