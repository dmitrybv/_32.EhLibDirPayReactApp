import * as React from 'react';
//import * as Fmk from 'formik';
import * as BS from "react-bootstrap";

function ErrorMessage(props: any): JSX.Element | null {
  if (props.errorText === undefined) {
    return null;
  }
  else {
    return (<div className='text-danger'>{props.errorText}</div>);
  }
}

export type KeyDisplayValue = {
  key: string;
  displayValue: string;
}

//
//  DisplayTextRow
//
export type DisplayTextRowArg =
  {
    LabelCaption: string;
    FieldValue: string;
  }

export function DisplayTextRow(props: DisplayTextRowArg): JSX.Element {
  return (
    <BS.Row className='mb-2'>
      <BS.Col md={4} className='mt-1'>
        <label>{props.LabelCaption}</label>
      </BS.Col>

      <BS.Form.Group as={BS.Col} md={8} className='mt-1'>
        <label><b>{props.FieldValue}</b></label>
      </BS.Form.Group>
    </BS.Row>
  );
}

//
//  InputTextRow
//

export type InputTextRowArg =
  {
    FieldName: string;
    LabelCaption: string;
    PlaceHolder?: string;
    formikProps: any;
    Required?: boolean;
    editControlSubs?: JSX.Element | null;
    inputType?: string;
  }

export function InputTextRow(props: InputTextRowArg): JSX.Element {
  let editControl: JSX.Element | null;
  let inputType: string = 'text' 
  let errorText = props.formikProps.errors[props.FieldName];
   
  if (props.formikProps.values[props.FieldName] === undefined)
    throw Error(`function InputTextRow: "${props.FieldName}" does not exists! `);   

  if (props.inputType === 'number' )
  {
    inputType = 'number';
  }

  if (props.editControlSubs === undefined) {
    editControl = (
      <BS.Form.Control
        className='form-control form-control-sm'
        id={props.FieldName}
        name={props.FieldName}
        placeholder={props.PlaceHolder}
        type={inputType}
        onChange={props.formikProps.handleChange}
        value={props.formikProps.values[props.FieldName]}
        isInvalid={!(props.formikProps.errors[props.FieldName] === undefined)}
      />
    );
  }
  else {
    editControl = props.editControlSubs;
  }

  return (
    <BS.Row className='mb-2'>
      <BS.Col md={4} className='mt-2'>
        <label htmlFor={props.FieldName}>{props.LabelCaption}</label>
        { (props.Required) ? <span className="text-danger">&nbsp;*</span> : null }
      </BS.Col>

      <BS.Form.Group as={BS.Col} md={8}>

        {editControl}

        <ErrorMessage errorText={errorText} />

        {/* <Fmk.ErrorMessage name={props.FieldName}>
          {msg => (<div className='text-danger'>{msg}</div>)}
        </Fmk.ErrorMessage> */}

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

  let errorText = props.formikProps.errors[props.fieldName];

  return (
    <BS.Row className='mb-2'>
      <BS.Col md={4} className='mt-2'>
        <label htmlFor={props.fieldName}>{props.labelCaption}</label>
        <span className='text-danger'>&nbsp;*</span>
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
