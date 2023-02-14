import * as React from 'react';
import * as Fmk from 'formik';
import * as BS from "react-bootstrap";
import * as InputRows from "./InputRows";
import { LicenceType, SoftLicenTypes, GetSoftLicenceTypeByID } from "../data/SoftLicenTypes";
import { PaymentMethod, PaymentMethods } from "../data/PaymentMethods";
import { GlobalStateType, MyFormValues, EditFormState } from "../data/GlobalState";
import { BusinessEntities, BusinessEntity } from "../data/BusinessEntities";


const validateForm = (values: MyFormValues) => {
  const errors: any = {};
  // if (!values.firstName) {
  //   errors.firstName = 'Поле обязательно для ввода';
  // } else if (values.firstName.length > 15) {
  //   errors.firstName = 'Must be 15 characters or less';
  // }

  // if (!values.lastName) {
  //   errors.lastName = 'Поле обязательно для ввода';
  // } else if (values.lastName.length > 20) {
  //   errors.lastName = 'Must be 20 characters or less';
  // }

  // if (!values.email) {
  //   errors.email = 'Поле обязательно для ввода';
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address';
  // }

  if (values.BuyerEntityID === "") {
    errors.buyerEntityID = 'Поле обязательно для ввода';
  }

  if (values.SoftLicenTypeID === "") {
    errors.softLicenTypeID = 'Поле обязательно для ввода';
  }

  if (values.PaymentMethodID === "") {
    errors.paymentMethodID = 'Поле обязательно для ввода';
  }

  return errors;
};

function FormikChildren(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {

  //  BusinessEntityComboItems 
  let BusinessEntityComboItems = BusinessEntities.map<InputRows.KeyDisplayValue>(
    (slt) => ({ key: slt.EntityID, displayValue: slt.EntityName })
  )

  BusinessEntityComboItems = [
    { key: "", displayValue: "- Выберите объект -" },
    ...BusinessEntityComboItems
  ];

  //  PaymentMethodsComboItems 
  let buyerEntityID = props.values.BuyerEntityID;
  let PaymentMethodsForEntityID = PaymentMethods.filter(
    (pm) => (pm.AllowForEntityID === buyerEntityID)
  )

  let PaymentMethodsComboItems = PaymentMethodsForEntityID.map<InputRows.KeyDisplayValue>(
    (slt) => ({ key: slt.PaymentMethodID, displayValue: slt.PaymentMethodName })
  )

  PaymentMethodsComboItems = [
    { key: "", displayValue: "- Выберите способ оплаты -" },
    ...PaymentMethodsComboItems
  ];

  //  SoftLicenTypeComboItems 
  let SoftLicenTypeComboItems = SoftLicenTypes.map<InputRows.KeyDisplayValue>(
    (slt) => ({ key: slt.LicenceTypeID, displayValue: slt.LicenceTypeName })
  )

  SoftLicenTypeComboItems = [
    { key: "", displayValue: "- Выберите тип лицензии -" },
    ...SoftLicenTypeComboItems
  ];

  function onSoftLicenTypeChnaged(e: React.ChangeEvent<any>) {
    let val: string = e.target.value;
    if (val === "") {
      props.values.SoftLicenceTypeDescription = "";
      props.values.LicencePrice = 0;
      props.values.PrevLicNumberIsNeeded = false;
      props.values.SoftLicencePriceComment = '';
    }
    else {
      let litType: LicenceType = GetSoftLicenceTypeByID(val);
      props.values.SoftLicenceTypeDescription = litType.LicenceTypeDescription;
      props.values.LicencePrice = litType.PriceFinal;
      // props.values.LicencePriceText =
      //   litType.PriceFinal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // "1,234.57"

      props.values.PrevLicNumberIsNeeded = litType.PrevLicNumberIsNeeded;
      props.values.SoftLicencePriceComment = litType.PriceComment;
    }
  }

  return (
    <Fmk.Form>
      <InputRows.InputTextRow
        fieldName="firstName"
        labelCaption="First Name"
        formikProps={props} />

      <InputRows.InputTextRow
        fieldName="lastName"
        labelCaption="Last Name"
        formikProps={props} />

      <InputRows.InputTextRow
        fieldName="email"
        labelCaption="Email Address"
        formikProps={props} />

      <br />
      <h3 className='mb-3'>Оформление заказа</h3>

      {/* Покупатель Физ лицо/Юр лицо: */}
      <BS.Row className='mb-2'>
        <BS.Col md={4}>
          <label htmlFor="BuyerEntityID">Покупатель:</label>
          <span className='text-danger'> *</span>
        </BS.Col>
        <BS.Col md={8}>
          <select
            className='form-select form-select-sm'
            id="BuyerEntityID"
            name="BuyerEntityID"
            onChange={props.handleChange}
            value={props.values.BuyerEntityID}
          >
            <option value="">- Выберите объект -</option>
            <option value="IND">Физическое лицо</option>
            <option value="LEG">Юридическое лицо или ИП</option>
          </select>
          {props.errors.BuyerEntityID ? <div>{props.errors.BuyerEntityID}</div> : null}
        </BS.Col>
      </BS.Row>

      {/* Покупатель Физ лицо/Юр лицо: */}
      <InputRows.InputComboboxRow
        fieldName="BuyerEntityID"
        labelCaption="Покупатель:"
        formikProps={props}
        items={BusinessEntityComboItems}
        itemKeyValueName="key"
        itemDisplayValueName="displayValue"
      />

      {/* Тип лицензии: */}
      <InputRows.InputComboboxRow
        fieldName="SoftLicenTypeID"
        labelCaption="Тип лицензии:"
        formikProps={props}
        items={SoftLicenTypeComboItems}
        itemKeyValueName="key"
        itemDisplayValueName="displayValue"
        onChange={onSoftLicenTypeChnaged}
      />

      {/* Описание лицензии: SoftLicenceTypeDescription */}
      <InputRows.InputTextRow
        fieldName="SoftLicenceTypeDescription"
        labelCaption="Описание лицензии:"
        formikProps={props}
        editControlSubs={
          (
            <div className='mt-2 mb-2'>{props.values.SoftLicenceTypeDescription}</div>
          )
        }
      />

      {/* Цена + Описание Цены */}
      <InputRows.InputTextRow
        fieldName="licencePrice"
        labelCaption="Цена одной лицензии:"
        formikProps={props}
        editControlSubs={
          (props.values.SoftLicenTypeID === "") ?
            (<div className="mt-2 mb-2"> - </div>) :
            (
              <label className="font-weight-bold mt-2 mb-2" id="Price">
                <strong> {props.values.LicencePriceText} руб. </strong>
                <span> &nbsp; &nbsp; &nbsp;(</span>
                <span> {props.values.SoftLicencePriceComment} )</span>
              </label>
            )
        }
      />

      {/* Количество лицензий: NumberOfLicenses */}
      <InputRows.InputTextRow
        fieldName="NumberOfLicenses"
        labelCaption="Количество лицензий:"
        formikProps={props} />

      {/* Способ оплаты */}
      <InputRows.InputComboboxRow
        fieldName="PaymentMethodID"
        labelCaption="Способ оплаты:"
        formikProps={props}
        items={PaymentMethodsComboItems}
        itemKeyValueName="key"
        itemDisplayValueName="displayValue"
      // onChange={onSoftLicenTypeChnaged}
      />

      {/*  */}
      {/* Кнопка: Продолжить */}
      {/*  */}
      <br />
      <BS.Row className='mb-2'>
        <BS.Col md={4}>
        </BS.Col>
        <BS.Col md={4} className="d-grid gap-2" >
          <BS.Button variant="primary" type="submit">Продолжить</BS.Button>
        </BS.Col>
      </BS.Row>

    </Fmk.Form>
  );
}

interface SignupForm1Ptops {
  FormData: MyFormValues;
  SetNextState: (state: EditFormState) => void;
}

export const Form1EnterData: React.FC<SignupForm1Ptops> = (props: SignupForm1Ptops) => {

  // function forceUpdate() { 
  //   React.useState({})[1].bind(null, {})
  // }

  const [dummyValue, updateState] = React.useState(true);
  //const forceUpdate = React.useCallback(() => updateState(!dummyValue), []);

  function forceUpdate() {
    updateState(!dummyValue);
  }

  // function forceUpdate() {
  //   React.useState({})[1].bind(null, {});
  // }

  function onSubmit(values: any, actions: any) {
    // console.log({ values, actions });
    // alert(JSON.stringify(values, null, 2));
    //props.FormData = {...values};
    Object.assign(props.FormData, values);
    actions.setSubmitting(false);
    props.SetNextState(EditFormState.PreviewToPost);
  }

  function FillTestLegalEntity(): void {
    //props.FormData.firstName = "MyFirstName";
    //props.FormData.lastName = "MyLastName";
    //props.FormData.email = "test@mail.cm"
    props.FormData.BuyerEntityID = "LEG";
    props.FormData.SoftLicenTypeID = "RUS-STD";
    props.FormData.PaymentMethodID = "BANKPLAT";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {

    if (e.key === "Alt" ||
        e.key === "Control" ||
        e.key === "Shift"
    ) {
      return;
    }

    if ((e.key === "L" || e.key === "l") &&
        (e.altKey === true)) {
      FillTestLegalEntity();
      forceUpdate();
    }
    //  let ctrlPressed = false;
    //  let altPressed = false;
    //  let shiftPressed = false;

    //  //let evt = (e == null ? event : e);

    //  shiftPressed = e.shiftKey;
    //  altPressed = e.altKey;
    //  ctrlPressed = e.ctrlKey;
    //  let altCodesStr = "[" +
    //     (shiftPressed ? "Shift " : "")
    //   + (altPressed ? "Alt " : "")
    //   + (ctrlPressed ? "Ctrl " : "")
    //   + "]";

    //   if ((shiftPressed || altPressed || ctrlPressed)) {
    //   alert("You pressed the \"" + e.key + "\""
    //     + " key (keyCode " + e.code + ")\n"
    //     + "together with the following keys:\n"
    //     + altCodesStr
    //   )
  }

  const initialValues: MyFormValues = props.FormData;
  // onkeydown={handleKeyDown} 

  return (
    <div onKeyDown={handleKeyDown} >
      <h3>My Example</h3>
      <Fmk.Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        children={FormikChildren}
        validateOnChange={false}
        validateOnBlur={false}
      />
    </div>
  );
};

export default Form1EnterData;