import React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { startGame, getConfig } from '../store';
import { composeValidators, required, min, max } from '../validators';
import { NumberField } from './NumberField';

const SettingsTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const FormTag = styled.form`
  display: grid;
  grid-gap: 16px;
  width: 400px;
  background-color: #fff;
  border-radius: 4px;
  padding: 16px;
`;

const TitleTag = styled.h1`
  font-size: 20px;
  text-align: center;
  font-weight: 500;
`;

const ButtonTag = styled.button`
  height: 48px;
  background-color: #ff5252;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  border: 0;
  border-radius: 4px;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Settings = () => {
  const dispatch = useDispatch();

  const config = useSelector(getConfig);

  const onSubmit = React.useCallback(
    data => {
      dispatch(
        startGame({
          columns: parseInt(data.columns),
          rows: parseInt(data.rows),
          numberOfBoms: parseInt(data.numberOfBoms),
        }),
      );
    },
    [dispatch],
  );

  return (
    <SettingsTag>
      <Form onSubmit={onSubmit} initialValues={config}>
        {({ handleSubmit }) => (
          <FormTag onSubmit={handleSubmit}>
            <TitleTag>Minesweeper</TitleTag>
            <Field
              name="columns"
              label="Number of Columns"
              component={NumberField}
              validate={composeValidators([required, min(9), max(1001)])}
              data-e2e-id="settings.columnsInput"
            />
            <Field
              name="rows"
              label="Number of Rows"
              component={NumberField}
              validate={composeValidators([required, min(9), max(1001)])}
              data-e2e-id="settings.rowsInput"
            />
            <Field
              name="numberOfBoms"
              label="Number Of Boms"
              component={NumberField}
              validate={composeValidators([required])}
              data-e2e-id="settings.numberOfBomsInput"
            />
            <ButtonTag type="submit" data-e2e-id="settings.submitBtn">
              Start Game
            </ButtonTag>
          </FormTag>
        )}
      </Form>
    </SettingsTag>
  );
};
