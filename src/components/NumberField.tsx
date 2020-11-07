import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled, { css } from 'styled-components';

const FieldTag = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelTag = styled.label`
  margin-bottom: 8px;
`;

const ErrorTag = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: red;
`;

const InputTag = styled.input<{ invalid: boolean }>`
  height: 32px;
  border-radius: 4px;
  border: 1px solid;
  padding: 0 8px;
  color: rgba(0, 0, 0, 0.87);

  ${({ invalid }) =>
    css`
      border-color: ${invalid ? 'red' : '#d7d7d7'};
    `}
`;

interface NumberFieldProps extends FieldRenderProps<number> {
  min?: number;
  max?: number;
  label: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({ input, meta, label, ...rest }) => {
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      input.onChange(event.target.value);
    },
    [input],
  );

  return (
    <FieldTag>
      <LabelTag>{label}</LabelTag>
      <InputTag
        type="number"
        value={input.value}
        onChange={onChange}
        onBlur={input.onBlur}
        invalid={!!meta.invalid}
        {...rest}
      />
      {meta.error && meta.touched && <ErrorTag>{meta.error}</ErrorTag>}
    </FieldTag>
  );
};
