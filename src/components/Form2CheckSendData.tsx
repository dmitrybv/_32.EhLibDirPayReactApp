import * as React from 'react';
import * as Fmk from 'formik';
import * as BS from "react-bootstrap";
import * as InputRows from "./InputRows";
import { LicenceType, SoftLicenTypes, GetSoftLicenceTypeByID } from "../data/SoftLicenTypes";
import { PaymentMethod, PaymentMethods } from "../data/PaymentMethods";
import { GlobalStateType, MyFormValues, EditFormState } from "../data/GlobalState";
import SendMail from "../data/SendMail";
import { MultiLineText } from "./MultiLineText";
import {DimmingScreenLoad} from "./DimmingScreenLoad";

// const validateForm = (values: MyFormValues) => {
//   const errors: any = {};
//   if (!values.firstName) {
//     errors.firstName = 'Поле обязательно для ввода';
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less';
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Поле обязательно для ввода';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'Поле обязательно для ввода';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   if (values.buyerEntityID === "") {
//     errors.buyerEntityID = 'Поле обязательно для ввода';
//   }

//   if (values.softLicenTypeID === "") {
//     errors.softLicenTypeID = 'Поле обязательно для ввода';
//   }

//   if (values.paymentMethodID === "") {
//     errors.paymentMethodID = 'Поле обязательно для ввода';
//   }

//   return errors;
// };

function FormikChildren(
  props: Fmk.FormikProps<MyFormValues>,
  SetNextState: (state: EditFormState) => void,
  SetEditFormState: React.Dispatch<React.SetStateAction<SignupForm2State>>,
  CheckoutOrderClickedHandle: (formValues: MyFormValues) => void
): React.ReactNode {

  let buyerEntityOptions: Array<InputRows.KeyDisplayValue> =
    [
      { key: "", displayValue: "- Выберите объект -" },
      { key: "IND", displayValue: "Физическое лицо" },
      { key: "LEG", displayValue: "Юридическое лицо или ИП" },
    ];

  let SoftLicenTypeComboItems = SoftLicenTypes.map<InputRows.KeyDisplayValue>(
    (slt) => ({ key: slt.LicenceTypeID, displayValue: slt.LicenceTypeName })
  )

  SoftLicenTypeComboItems = [
    { key: "", displayValue: "- Выберите тип лицензии -" },
    ...SoftLicenTypeComboItems
  ];

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

  function changeOrderClicked() {
    SetNextState(EditFormState.Edit);
  }

  // function SetSendErrorState(errorText: string) {
  //   SetEditFormState({ SendDataErrorText: errorText })
  // }

  async function CheckoutOrderClicked() {
    CheckoutOrderClickedHandle(props.values);

    // let sendResult: string = await SendMail(props.values);
    // if (sendResult === "") {
    //   SetNextState(EditFormState.ShowResult);
    // }
    // else {
    //   let errotrText = 'Ошибка при формировании заказа \n' + sendResult;
    //   SetSendErrorState(errotrText)
    // }
  }

  return (
    <Fmk.Form>
      {/* <InputRows.DisplayTextRow
        labelCaption="First Name"
        fieldValue={props.values.firstName} />

      <InputRows.DisplayTextRow
        fieldValue={props.values.lastName}
        labelCaption="Last Name" />

      <InputRows.DisplayTextRow
        fieldValue={props.values.email}
        labelCaption="Email Address" /> */}

      <br />
      <h3 className='mb-3'>Оформление заказа</h3>

      {/* Покупатель Физ лицо/Юр лицо: */}
      <InputRows.DisplayTextRow
        fieldValue={props.values.BuyerEntityName}
        labelCaption="Покупатель:" />

      {/* Тип лицензии: */}
      <InputRows.DisplayTextRow
        fieldValue={props.values.SoftLicenceTypeName}
        labelCaption="Тип лицензии:"
      />

      {/* Описание лицензии: SoftLicenceTypeDescription */}
      <InputRows.DisplayTextRow
        fieldValue={props.values.SoftLicenceTypeDescription}
        labelCaption="Описание лицензии:"
      />

      {/* Цена + Описание Цены */}
      <InputRows.DisplayTextRow
        fieldValue={props.values.LicencePriceText}
        labelCaption="Цена одной лицензии:"
      />

      {/* Количество лицензий: NumberOfLicenses */}
      <InputRows.DisplayTextRow
        fieldValue={props.values.NumberOfLicenses.toString()}
        labelCaption="Количество лицензий:"
      />

      {/* Способ оплаты */}
      <InputRows.DisplayTextRow
        fieldValue={props.values.PaymentMethodName}
        labelCaption="Способ оплаты:"
      />

      {/*  */}
      {/* Кнопки */}
      {/*  */}
      <br />
      <BS.Row className='mb-2'>

        {/* Кнопка: Изменить заказ */}
        <BS.Col md={4}>
          <BS.Button
            variant="primary"
            type="button"
            onClick={changeOrderClicked}
          >
            Изменить данные заказа
          </BS.Button>
        </BS.Col>

        <BS.Col md={1} className="d-grid gap-2" >
        </BS.Col>

        {/* Кнопка: Оформить заказ */}
        <BS.Col md={4} className="d-grid gap-2" >
          <BS.Button
            variant="success"
            type="button"
            onClick={CheckoutOrderClicked}
          >
            Оформить заказ
          </BS.Button>
        </BS.Col>
      </BS.Row>

    </Fmk.Form>
  );
}

interface SignupForm2Ptops {
  FormData: MyFormValues;
  SetNextState: (state: EditFormState) => void;
}

interface SignupForm2State {
  SendDataErrorText: string;
  OrderIsProcessing: boolean;
}

export const SignupForm2: React.FC<SignupForm2Ptops> = (props: SignupForm2Ptops) => {

  const defState: SignupForm2State = { SendDataErrorText: "", OrderIsProcessing: false };

  let [editFormState, setEditFormState] = React.useState<SignupForm2State>(defState);
  //React.useState({ SendDataErrorText: "", OrderIsProcessing: false });


  function SetLocalState(state: SignupForm2State)
  {
    setEditFormState(state);
    editFormState = state;
    //[editFormState, setEditFormState] = React.useState<SignupForm2State>(defState);
  }

  function onSubmit(values: any, actions: any) {
    // // console.log({ values, actions });
    // // alert(JSON.stringify(values, null, 2));
    // //props.FormData = {...values};
    // Object.assign(props.FormData, values);
    // actions.setSubmitting(false);
    // props.SetNextState(EditFormState.PreviewToPost);
  }

  async function CheckoutOrderClicked(formValue: MyFormValues) {
    SetLocalState({ ...editFormState, OrderIsProcessing : true });
    let sendResult: string = await SendMail(formValue);
    if (sendResult === "") {
      props.SetNextState(EditFormState.ShowResult);
    }
    else {
      let errotrText = 'Ошибка при формировании заказа \n' + sendResult;
      SetSendErrorState(errotrText)
    }
    SetLocalState({ ...editFormState, OrderIsProcessing : false });
  }

  function SetSendErrorState(errorText: string) {
    SetLocalState({ ...editFormState, SendDataErrorText: errorText })
  }

  const initialValues: MyFormValues = props.FormData;

  // children={FormikChildren}
  //  { props => FormikChildren(props) }
  let sendErrorElement: React.ReactElement | null;
  if (editFormState.SendDataErrorText === "") {
    sendErrorElement = null;
  } else {
    sendErrorElement = (
      <BS.Alert key='danger' variant='danger'>
        {/* {editFormState.SendDataErrorText} */}
        <MultiLineText mlText={editFormState.SendDataErrorText} />
      </BS.Alert>
    );
  }

  return (
    <div>
      {sendErrorElement}
      <h3>My Example</h3>
      <Fmk.Formik
        initialValues={initialValues}
        //        validate={validateForm}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {p => FormikChildren(p, props.SetNextState, setEditFormState, CheckoutOrderClicked)}
      </Fmk.Formik>
      <DimmingScreenLoad Show={editFormState.OrderIsProcessing}/>
    </div>
  );
};

export default SignupForm2;