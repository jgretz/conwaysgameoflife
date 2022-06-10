import React, {InputHTMLAttributes, ReactNode} from 'react';
import {withFormContext, FormContextValues} from '@truefit/bach-react-hook-form';
import {FormControlLabel, Radio} from '@material-ui/core';
import {RadioButtonChecked, RadioButtonUnchecked} from '@material-ui/icons';
import {compose, withEffect} from '@truefit/bach';

type PublicProps = {
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

type Props = PublicProps & {
  formContext: FormContextValues;
};

const HookFormRadio = ({
  formContext,
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
  const {watch, setValue} = formContext;
  const formValue = watch(name);

  const radio = (
    <Radio
      name={name}
      checked={formValue === value}
      checkedIcon={checkedIcon ?? <RadioButtonChecked />}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      icon={icon ?? <RadioButtonUnchecked />}
      id={id ?? name}
      inputProps={inputProps}
      onChange={(e) => setValue(name, e.target.value)}
      required={required}
      size={size}
      value={value}
    />
  );

  return label ? (
    <FormControlLabel control={radio} label={label} labelPlacement={labelPlacement} />
  ) : (
    radio
  );
};

export default compose<PublicProps>(
  withFormContext(),

  withEffect(({name, formContext: {register}}: Props) => register({name}), []),
)(HookFormRadio);
