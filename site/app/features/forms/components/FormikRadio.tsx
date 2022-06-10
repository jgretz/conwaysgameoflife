import React, {InputHTMLAttributes, ReactNode} from 'react';
import {FormControlLabel, Radio} from '@material-ui/core';
import {RadioButtonChecked, RadioButtonUnchecked} from '@material-ui/icons';
import {useField} from 'formik';

type Props = {
  name: string;
  value: string;
  checkedIcon?: ReactNode;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  disableRipple?: boolean;
  icon?: ReactNode;
  id?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  required?: boolean;
  size?: 'small' | 'medium';
};

export default ({
  name,
  value,
  checkedIcon,
  color,
  disabled,
  disableRipple,
  icon,
  id,
  inputProps,
  label,
  labelPlacement,
  required,
  size,
}: Props) => {
  const [field] = useField(name);

  const radio = (
    <Radio
      name={field.name}
      value={value}
      checked={field.value === value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      checkedIcon={checkedIcon ?? <RadioButtonChecked />}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      icon={icon ?? <RadioButtonUnchecked />}
      id={id ?? name}
      inputProps={inputProps}
      required={required}
      size={size}
    />
  );

  return label ? (
    <FormControlLabel control={radio} label={label} labelPlacement={labelPlacement} />
  ) : (
    radio
  );
};
