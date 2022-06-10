import React, {ReactElement, ReactNode} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import {ParsableDate} from '@material-ui/pickers/constants/prop-types';
import {IconButtonProps, InputAdornmentProps, DialogProps} from '@material-ui/core';
import {FormContextValues, withFormContext} from '@truefit/bach-react-hook-form';
import {compose, withEffect} from '@truefit/bach';

type PublicProps = {
  // TextField pass through props
  name: string;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  label?: React.ReactNode;
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;

  // DatePicker specific props
  allowKeyboardControl?: boolean;
  animateYearScrolling?: boolean;
  autoOk?: boolean;
  disabled?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  disableToolbar?: boolean;
  emptyLabel?: string;
  format?: string;
  initialFocusedDate?: ParsableDate;
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  inputVariant?: 'standard' | 'outlined' | 'filled';
  invalidDateMessage?: ReactNode;
  invalidLabel?: string;
  KeyboardButtonProps?: Partial<IconButtonProps>;
  keyboardIcon?: ReactNode;
  labelFunc?: (date: Date, invalidLabel: string) => string;
  leftArrowButtonProps?: Partial<IconButtonProps>;
  leftArrowIcon?: ReactNode;
  loadingIndicator?: ReactElement;
  mask?: string;
  maskChar?: string;
  maxDate?: ParsableDate;
  maxDateMessage?: ReactNode;
  minDate?: ParsableDate;
  minDateMessage?: ReactNode;
  onAccept?: (date: Date) => void;
  onClose?: () => void;
  onError?: (error: ReactNode, value: ParsableDate) => void;
  onMonthChange?: (date: Date) => void | Promise<void>;
  onOpen?: () => void;
  onYearChange?: (date: Date) => void;
  openTo?: 'date' | 'year' | 'month';
  orientation?: 'portrait' | 'landscape';
  readOnly?: boolean;
  refuse?: RegExp;
  renderDay?: (
    day: Date,
    selectedDate: Date,
    dayInCurrentMonth: boolean,
    dayComponent: ReactElement,
  ) => ReactElement;
  rifmFormatter?: (str: string) => string;
  rightArrowButtonProps?: Partial<IconButtonProps>;
  rightArrowIcon?: ReactNode;
  shouldDisableDate?: (day: Date) => boolean;
  strictCompareDates?: boolean;
  variant?: 'dialog' | 'inline' | 'static';
  views?: Array<'year' | 'date' | 'month'>;

  // Only available with variant "dialog"
  cancelLabel?: ReactNode;
  clearable?: boolean;
  clearLabel?: ReactNode;
  DialogProps?: Partial<DialogProps>;
  okLabel?: ReactNode;
  showTodayButton?: boolean;
  todayLabel?: ReactNode;
};

type Props = PublicProps & {
  formContext: FormContextValues;
};

const HookFormDatePicker = ({
  formContext,

  // Underlying TextField props which are passed through
  name,
  fullWidth = true,
  helperText,
  id,
  label,
  margin = 'normal',
  required,

  // DatePicker specific props
  allowKeyboardControl,
  animateYearScrolling,
  autoOk,
  disabled,
  disableFuture,
  disablePast,
  disableToolbar,
  emptyLabel = '',
  format,
  initialFocusedDate,
  InputAdornmentProps,
  inputVariant,
  invalidDateMessage,
  invalidLabel,
  KeyboardButtonProps,
  keyboardIcon,
  labelFunc,
  leftArrowButtonProps,
  leftArrowIcon,
  loadingIndicator,
  mask,
  maskChar,
  maxDate,
  maxDateMessage,
  minDate,
  minDateMessage,
  onAccept,
  onClose,
  onError,
  onMonthChange,
  onOpen,
  onYearChange,
  openTo,
  orientation,
  readOnly,
  refuse,
  renderDay,
  rightArrowButtonProps,
  rightArrowIcon,
  shouldDisableDate,
  strictCompareDates,
  variant,
  views,

  // Only available with variant "dialog"
  cancelLabel,
  clearable,
  clearLabel,
  DialogProps,
  okLabel,
  showTodayButton,
  todayLabel,
}: Props) => {
  const {watch, setValue, errors} = formContext;
  const formValue = watch(name);
  const error = errors[name];
  const displayError = Boolean(error?.message);

  return (
    <KeyboardDatePicker
      name={name}
      error={displayError}
      fullWidth={fullWidth}
      helperText={displayError ? error.message : helperText}
      id={id ?? name}
      label={label}
      margin={margin}
      required={required}
      allowKeyboardControl={allowKeyboardControl}
      animateYearScrolling={animateYearScrolling}
      autoOk={autoOk}
      disabled={disabled}
      disableFuture={disableFuture}
      disablePast={disablePast}
      disableToolbar={disableToolbar}
      emptyLabel={emptyLabel}
      format={format}
      initialFocusedDate={initialFocusedDate}
      InputAdornmentProps={InputAdornmentProps}
      inputVariant={inputVariant}
      invalidDateMessage={invalidDateMessage}
      invalidLabel={invalidLabel}
      KeyboardButtonProps={KeyboardButtonProps}
      keyboardIcon={keyboardIcon}
      labelFunc={labelFunc}
      leftArrowButtonProps={leftArrowButtonProps}
      leftArrowIcon={leftArrowIcon}
      loadingIndicator={loadingIndicator}
      mask={mask}
      maskChar={maskChar}
      maxDate={maxDate}
      maxDateMessage={maxDateMessage}
      minDate={minDate}
      minDateMessage={minDateMessage}
      onAccept={onAccept}
      onChange={(value) => setValue(name, value)}
      onClose={onClose}
      onError={onError}
      onMonthChange={onMonthChange}
      onOpen={onOpen}
      onYearChange={onYearChange}
      openTo={openTo}
      orientation={orientation}
      readOnly={readOnly}
      refuse={refuse}
      renderDay={renderDay}
      rightArrowButtonProps={rightArrowButtonProps}
      rightArrowIcon={rightArrowIcon}
      shouldDisableDate={shouldDisableDate}
      strictCompareDates={strictCompareDates}
      value={formValue}
      variant={variant}
      views={views}
      cancelLabel={cancelLabel}
      clearable={clearable}
      clearLabel={clearLabel}
      DialogProps={DialogProps}
      okLabel={okLabel}
      showTodayButton={showTodayButton}
      todayLabel={todayLabel}
    />
  );
};

export default compose<PublicProps>(
  withFormContext(),

  withEffect(({name, formContext: {register}}: Props) => register({name}), []),
)(HookFormDatePicker);
