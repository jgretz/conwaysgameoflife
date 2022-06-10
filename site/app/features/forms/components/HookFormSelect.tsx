import React, {ElementType, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react';
import {withFormContext, FormContextValues} from '@truefit/bach-react-hook-form';
import {MenuProps, FormControl, Select, InputLabel, FormHelperText} from '@material-ui/core';
import {Controller} from 'react-hook-form';
import {compose} from '@truefit/bach';

type PublicProps = {
  name: string;
  children: ReactNode;
  autoFocus?: boolean;
  autoWidth?: boolean;
  disabled?: boolean;
  displayEmpty?: boolean;
  fullWidth?: boolean;
  helperText?: ReactNode;
  id?: string;
  IconComponent?: ElementType;
  label?: ReactNode;
  margin?: 'none' | 'dense' | 'normal';
  MenuProps?: Partial<MenuProps>;
  multiple?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderValue?: (value: any) => ReactNode;
  required?: boolean;
  SelectDisplayProps?: HTMLAttributes<HTMLDivElement>;
  size?: 'small' | 'medium';
  variant?: 'standard' | 'outlined' | 'filled';
};

type Props = PublicProps & {
  formContext: FormContextValues;
};

const HookFormSelect = ({
  formContext,
  name,
  children,
  autoFocus,
  autoWidth,
  disabled,
  displayEmpty,
  fullWidth = true,
  helperText,
  id,
  IconComponent,
  label,
  margin = 'normal',
  MenuProps,
  multiple,
  renderValue,
  required,
  SelectDisplayProps,
  size,
  variant,
}: Props) => {
  const {errors} = formContext;
  const error = errors[name];
  const displayError = Boolean(error?.message);

  const inputLabel = useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current?.offsetWidth ?? 0);
  }, [label]);

  const controlId = id ?? name;
  const labelId = `${controlId}-label`;

  return (
    <FormControl
      disabled={disabled}
      error={displayError}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
      size={size}
      variant={variant}
    >
      <InputLabel ref={inputLabel} id={labelId}>
        {label}
      </InputLabel>
      <Controller
        as={Select}
        name={name}
        autoFocus={autoFocus}
        autoWidth={autoWidth}
        displayEmpty={displayEmpty}
        IconComponent={IconComponent}
        id={controlId}
        labelId={labelId}
        labelWidth={variant === 'outlined' ? labelWidth : 0}
        MenuProps={MenuProps}
        multiple={multiple}
        renderValue={renderValue}
        SelectDisplayProps={SelectDisplayProps}
      >
        {children}
      </Controller>
      <FormHelperText>{displayError ? error.message : helperText}</FormHelperText>
    </FormControl>
  );
};

export default compose<PublicProps>(withFormContext())(HookFormSelect);
