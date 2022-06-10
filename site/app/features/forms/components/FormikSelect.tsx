import React, {ElementType, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react';
import {MenuProps, FormControl, Select, InputLabel, FormHelperText} from '@material-ui/core';
import {useField} from 'formik';

type Props = {
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

export default ({
  name,
  children,
  autoFocus,
  autoWidth,
  disabled,
  displayEmpty,
  fullWidth,
  helperText,
  id,
  IconComponent,
  label,
  margin,
  MenuProps,
  multiple,
  renderValue,
  required,
  SelectDisplayProps,
  size,
  variant,
}: Props) => {
  const [field, meta] = useField(name);
  const displayError = Boolean(meta.touched && meta.error);

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
      <Select
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
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
      </Select>
      <FormHelperText>{displayError ? meta.error : helperText}</FormHelperText>
    </FormControl>
  );
};
