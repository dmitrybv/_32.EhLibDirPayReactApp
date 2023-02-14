import * as React from 'react';
import * as Fmk from 'formik';
import * as BS from "react-bootstrap";

export type KeyDisplayValue = {
  key: string;
  displayValue: string;
}

//
//  DisplayTextRow
//
export type DisplayTextRowArg =
  {
    labelCaption: string;
    fieldValue: string;
  }

export function DisplayTextRow(props: DisplayTextRowArg): JSX.Element {
  return (
    <BS.Row className='mb-2'>
      <BS.Col md={4} className='mt-2'>
        <label>{props.labelCaption}</label>
      </BS.Col>

      <BS.Form.Group as={BS.Col} md={8}>
        <label><b>{props.fieldValue}</b></label>
      </BS.Form.Group>
    </BS.Row>
  );
}

//
//  InputTextRow
//

export type InputTextRowArg =
  {
    fieldName: string;
    labelCaption: string;
    formikProps: any;
    editControlSubs?: JSX.Element | null;
  }

export function InputTextRow(props: InputTextRowArg): JSX.Element {
  let editControl: JSX.Element | null;

  if (props.editControlSubs === undefined) {
    editControl = (
      <BS.Form.Control
        className='form-control form-control-sm'
        id={props.fieldName}
        name={props.fieldName}
        type="text"
        onChange={props.formikProps.handleChange}
        value={props.formikProps.values[props.fieldName]}
        isInvalid={!(props.formikProps.errors[props.fieldName] === undefined)}
      />
    );
  }
  else {
    editControl = props.editControlSubs;
  }

  return (
    <BS.Row className='mb-2'>
      <BS.Col md={4} className='mt-2'>
        <label htmlFor={props.fieldName}>{props.labelCaption}</label>
      </BS.Col>

      <BS.Form.Group as={BS.Col} md={8}>

        {editControl}

        <Fmk.ErrorMessage name={props.fieldName}>
          {msg => (<div className='text-danger'>{msg}</div>)}
        </Fmk.ErrorMessage>

      </BS.Form.Group>
    </BS.Row>
  );
}

//
//  InputComboboxRow
//

export type InputComboboxRowArg =
  {
    fieldName: string;
    labelCaption: string;
    //    key: string;
    items: Array<any>;
    itemKeyValueName: string;
    itemDisplayValueName: string;
    formikProps: any;
    onChange?: (e: React.ChangeEvent<any>) => void;
  }

function InputComboboxRowOptions(items: Array<any>,
  itemKeyValueName: string,
  itemDisplayValueName: string): Array<JSX.Element> {
  if (items === null || items.length === 0) {
    return [];
  }
  else {
    return (
      items.map((item: any, index: number) => {
        return (
          <option key={item[itemKeyValueName]}
            value={item[itemKeyValueName]}>
            {item[itemDisplayValueName]}
          </option>
        );
      })
    );
  }
}

export function InputComboboxRow(props: InputComboboxRowArg): JSX.Element {

  function onChange(e: React.ChangeEvent<any>) {
    if (props.onChange !== undefined) {
      props.onChange(e);
    }
    props.formikProps.handleChange(e);
  }

  function ErrorMessage(props: any): JSX.Element | null {
    if (props.errorText === undefined) {
      return null;
    }
    else {
      return (<div className='text-danger'>{props.errorText}</div>);
    }

  }

  let errorText = props.formikProps.errors[props.fieldName];

  return (
    <BS.Row className='mb-2'>
      <BS.Col md={4} className='mt-2'>
        <label htmlFor={props.fieldName}>{props.labelCaption}</label>
        <span className='text-danger'> *</span>
      </BS.Col>

      <BS.Form.Group as={BS.Col} md={8}>

        <BS.Form.Select
          className='form-select form-select-sm'
          id={props.fieldName}
          name={props.fieldName}
          onChange={onChange}
          value={props.formikProps.values[props.fieldName]}
          isInvalid={!(errorText === undefined)}
        >
          {InputComboboxRowOptions(props.items,
            props.itemKeyValueName,
            props.itemDisplayValueName)}
        </BS.Form.Select>

        <ErrorMessage errorText={errorText} />

        {/* <Fmk.ErrorMessage name={props.fieldName}>
          {msg => (<div className='text-danger'>{msg}</div>)}
        </Fmk.ErrorMessage> */}

      </BS.Form.Group>
    </BS.Row>
  );
}
