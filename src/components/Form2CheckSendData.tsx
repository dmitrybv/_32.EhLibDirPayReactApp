import * as React from 'react';
import * as Fmk from 'formik';
import * as BS from "react-bootstrap";
import * as InputRows from "./InputRows";
import dateFormat from "dateformat";

import { MyFormValues, EditFormState } from "../data/GlobalState";
import SendMail from "../data/SendMail";
import { MultiLineText } from "./MultiLineText";
import { DimmingScreenLoad } from "./DimmingScreenLoad";

import { SellingRulesModalDialog } from "./SellingRulesModalDialog";
import { PersonalDataRulesModalDialog } from "./PersonalDataRulesModalDialog";
import { PrivacyPolicyModalDialog } from "./PrivacyPolicyModalDialog";

interface SignupForm2Ptops {
  FormData: MyFormValues;
  SetNextState: (state: EditFormState) => void;
}

interface SignupForm2State {
  SendDataErrorText: string;
  OrderIsProcessing: boolean;
  RulesAgreed: boolean;
  SellingRulesModal: boolean;
  PersonalDataRulesModal: boolean;
  PrivacyPolicyModal: boolean;
}

type Action =
  { type: 'SET_ERROR_TEXT'; SendDataErrorText: string } |
  { type: 'SET_PROCESSING'; OrderIsProcessing: boolean } |
  { type: 'SET_RULES_AGREED'; RulesAgreed: boolean} |
  { type: 'SET_SELLING_RULES_MODAL'; SellingRulesModal: boolean} |
  { type: 'SET_PERSONAL_DATA_RULES_MODAL'; PersonalDataRulesModal: boolean} |
  { type: 'SET_PRIVACY_POLICY_MODAL'; PrivacyPolicyModal: boolean}
  ;

export function reducer(state: SignupForm2State, action: Action): SignupForm2State {
  //let act = action.SendDataErrorText;
  switch (action.type) {
    case 'SET_ERROR_TEXT':
      return { ...state, SendDataErrorText: action.SendDataErrorText };
    case 'SET_PROCESSING':
      return { ...state, OrderIsProcessing: action.OrderIsProcessing };
    case 'SET_RULES_AGREED':
        return { ...state, RulesAgreed: action.RulesAgreed };
    case 'SET_SELLING_RULES_MODAL':
      return { ...state, SellingRulesModal: action.SellingRulesModal };
    case 'SET_PERSONAL_DATA_RULES_MODAL':
      return { ...state, PersonalDataRulesModal: action.PersonalDataRulesModal };
    case 'SET_PRIVACY_POLICY_MODAL':
      return { ...state, PrivacyPolicyModal: action.PrivacyPolicyModal };
  
    default:
      return state;
  }
}

export const SignupForm2: React.FC<SignupForm2Ptops> = (props: SignupForm2Ptops) => {

  const defState: SignupForm2State = { 
    SendDataErrorText: "", 
    OrderIsProcessing: false, 
    RulesAgreed: false,
    SellingRulesModal: false,
    PersonalDataRulesModal: false,
    PrivacyPolicyModal: false,
  };

  const [state, dispatch] = React.useReducer(reducer, defState);

  function onSubmit(values: any, actions: any) {
  }

  async function CheckoutOrderClickedHandle(formValue: MyFormValues) {
    dispatch({ type: 'SET_PROCESSING', OrderIsProcessing: true });

    let createdDate = new Date();
    formValue.OrderCreatedDateTimeSys = createdDate;
    formValue.OrderCreatedDateTimeValue = dateFormat(createdDate, 'yyyy-mm-dd HH:MM:ss');

    let sendResult: string = await SendMail(formValue);
    if (sendResult === "") {
      props.SetNextState(EditFormState.ShowResult);
    }
    else {
      let errotrText = 'Ошибка при формировании заказа \n' + sendResult;
      SetSendErrorState(errotrText);
      window.scrollTo(0, 0);
    }
    //SetLocalState({ ...editFormState, OrderIsProcessing : false });
    dispatch({ type: 'SET_PROCESSING', OrderIsProcessing: false });
  }

  // async function SetTestOrderIsProcessing() {
  //   dispatch({ type: 'SET_PROCESSING', OrderIsProcessing: true });
  // }

  function SetSendErrorState(errorText: string) {
    //SetLocalState({ ...editFormState, SendDataErrorText: errorText })
    dispatch({ type: 'SET_ERROR_TEXT', SendDataErrorText: errorText });
  }

  function SetRulesAgreed(agreed: boolean) {
    dispatch({ type: 'SET_RULES_AGREED', RulesAgreed : agreed });
  }

  function SetSellingRulesModal(sellingRulesModal: boolean) {
    dispatch({ type: 'SET_SELLING_RULES_MODAL', SellingRulesModal : sellingRulesModal });
  }

  function HideSellingRulesDialog(): void { 
    SetSellingRulesModal(false);
  }; 

  function SetPersonalDataRulesModal(isModal: boolean) {
    dispatch({ type: 'SET_PERSONAL_DATA_RULES_MODAL', PersonalDataRulesModal : isModal });
  }

  function HidePersonalDataRulesDialog(): void { 
    SetPersonalDataRulesModal(false);
  }; 

  function SetPrivacyPolicyModal(isModal: boolean) {
    dispatch({ type: 'SET_PRIVACY_POLICY_MODAL', PrivacyPolicyModal : isModal });
  }

  function HidePrivacyPolicyModal(): void { 
    SetPrivacyPolicyModal(false);
  }; 

  const initialValues: MyFormValues = props.FormData;

  function FormikChildren(frmProps: Fmk.FormikProps<MyFormValues>): React.ReactNode {
  
    //props: Fmk.FormikProps<MyFormValues>,
    // SetNextState: (state: EditFormState) => void,
    // CheckoutOrderClickedHandle: (formValues: MyFormValues) => void,
    // SetTestOrderIsProcessingHandler: () => void

    function changeOrderClicked() {
      //props.SetNextState, CheckoutOrderClicked, SetTestOrderIsProcessing
      props.SetNextState(EditFormState.Edit);
    }
  
    async function CheckoutOrderClicked() {
      CheckoutOrderClickedHandle(props.FormData);
    }

    function handleCheckboxChange(e: React.FormEvent<HTMLInputElement>): void { 
      const newValue = e.currentTarget.checked;
      SetRulesAgreed(newValue);
      //console.log('The checkbox was toggled'); 
    }; 

    function SellingRulesClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void { 
      e.preventDefault();
      SetSellingRulesModal(!state.SellingRulesModal);
    }; 

    function PersonalDataRulesClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void { 
      e.preventDefault();
      SetPersonalDataRulesModal(!state.PersonalDataRulesModal);
    }; 

    function PrivacyPolicyClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void { 
      e.preventDefault();
      SetPrivacyPolicyModal(!state.PrivacyPolicyModal);
    }; 
   

    //Форматировать номер телефона
    function FormatPhoneNumber(phone: string): string {
      function s(start: number, end?: number): string {
        return phone.substring(start, end);
      }
  
      let result = `${s(0, 2)} (${s(2, 5)}) ${s(5, 8)}-${s(8, 10)}-${s(10, 12)}`;
      return result;
    }
  
    ///* Основные данные
    function MainDataFields(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          {/* Покупатель Физ лицо/Юр лицо: */}
          <InputRows.DisplayTextRow
            FieldValue={props.values.BuyerEntityName}
            LabelCaption="Покупатель:" />
  
          {/* Тип лицензии: */}
          <InputRows.DisplayTextRow
            FieldValue={props.values.SoftLicenceTypeName}
            LabelCaption="Тип лицензии:"
          />
  
          {/* Описание лицензии: SoftLicenceTypeDescription */}
          <InputRows.DisplayTextRow
            FieldValue={props.values.SoftLicenceTypeDescription}
            LabelCaption="Описание лицензии:"
          />
  
          {/* Цена + Описание Цены */}
          <InputRows.DisplayTextRow
            FieldValue={props.values.LicencePriceText}
            LabelCaption="Цена одной лицензии:"
          />
  
          {/* Количество лицензий: NumberOfLicenses */}
          <InputRows.DisplayTextRow
            FieldValue={props.values.NumberOfLicenses.toString()}
            LabelCaption="Количество лицензий:"
          />
  
          {/* Способ оплаты */}
          <InputRows.DisplayTextRow
            FieldValue={props.values.PaymentMethodName}
            LabelCaption="Способ оплаты:"
          />
  
          {/* Общая стоимость заказа: */}
          <div className="form-group row my-4 fs-5">
            <label className="col-sm-4 col-form-label-lg my-def-text-color">
              Общая стоимость заказа:
            </label>
            <div className="col-sm-8 d-flex align-self-center">
              <label className="font-weight-bold"
                id="OrderPrice">
                <strong>
                  {props.values.OrderPrice.toLocaleString() + " руб."}
                </strong>
              </label>
            </div>
          </div>
        </>
      );
    }
  
    ///* Данные покупателя Заголовок : Фамилия, Имя, Email, Телефон, Страна, Город, Адрес
    function BuyerData(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          {/* Данные покупателя Заголовок */}
  
          <div className="mb-2 mt-4 mb-3">
            {
              props.values.BuyerForOtherEntity === true ?
                <h5>Данные покупателя</h5> :
                <h5>Данные покупателя и пользователя лицензии</h5>
            }
          </div>
  
          {/* Покупатель Фамилия Компонент: */}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerLastName} LabelCaption="Фамилия:" />
  
          {/* Покупатель Имя Компонент: */}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerFirstName} LabelCaption="Имя:" />
  
          {/* Покупатель Email Компонент:*/}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerEmail} LabelCaption="Email:" />
  
          {/* Покупатель Телефон Компонент:*/}
          <InputRows.DisplayTextRow FieldValue={FormatPhoneNumber(props.values.BuyerPhone)} LabelCaption="Телефон:" />
  
          {/* Покупатель Страна:*/}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerActualCountry} LabelCaption="Страна:" />
  
          {/* Покупатель Город:*/}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerActualCity} LabelCaption="Город:" />
  
          {/* Покупатель Адрес:*/}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerActualAddress} LabelCaption="Адрес:" />
        </>
      );
    }
  
    //Реквизиты компании покупателя: Название компании, ИНН, KPP, Юридический адрес
    function BuyerCompanyFields(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          <div className="mb-2 mt-4">
            <h6>Реквизиты компании покупателя</h6>
          </div>
  
          {/* Покупатель Название компании: */}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerCompName} LabelCaption="Название компании:" />
  
          {/* Покупатель ИНН: */}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerINN} LabelCaption="ИНН:" />
  
          {/* Покупатель KPP: */}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerCompKPP} LabelCaption="КПП:" />
  
          {/* Покупатель Юридический адрес: */}
          <InputRows.DisplayTextRow FieldValue={props.values.BuyerLegalAddress} LabelCaption="Юридический адрес:" />
        </>
      );
    }
  
    //Реквизиты компании пользователя лицензии: Название компании, ИНН, KPP, Юридический адрес
    function LicenseCompanyFields(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          <div className="mb-2 mt-4">
            <h6>Реквизиты компании пользователя лицензии</h6>
          </div>
  
          {/* Пользователя лицензии: Название компании: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserCompName} LabelCaption="Название компании:" />
  
          {/* Пользователя лицензии: ИНН: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserINN} LabelCaption="ИНН:" />
  
          {/* Пользователя лицензии: KPP: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserCompKPP} LabelCaption="КПП:" />
  
          {/* Пользователя лицензии: Юридический адрес: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserLegalAddress} LabelCaption="Юридический адрес:" />
        </>
      );
    }
  
    //Данные пользователя лицензии: 
    function LicenseUserData(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          {/* Checkbox X Оформить лицензию на другое лицо или компанию */}
          <div className="mb-2 mt-5 mb-3">
            <Fmk.Field type="checkbox"
              checked={props.values.BuyerForOtherEntity}
              id="BuyerForOtherEntity"
              name="BuyerForOtherEntity"
              disabled="disabled"
            />
            <label htmlFor="BuyerForOtherEntity">&nbsp;Оформить лицензию на другое лицо или компанию</label>
          </div>
  
          <div className="mb-2 mt-4 mb-3">
            <h5>Данные пользователя лицензии</h5>
          </div>
  
          {/* Покупатель Физ лицо/Юр лицо: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserEntityName} LabelCaption="Пользователь лицензии:" />
  
          {/* Пользователя лицензии Фамилия: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserLastName} LabelCaption="Фамилия:" />
  
          {/* Пользователя лицензии Имя: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserFirstName} LabelCaption="Имя:" />
  
          {/* Пользователя лицензии Email: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserEmail} LabelCaption="Email:" />
  
          {/* Пользователя лицензии Страна: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserActualCountry} LabelCaption="Страна:" />
  
          {/* Пользователя лицензии Город: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserActualCity} LabelCaption="Город:" />
  
          {/* Пользователя лицензии Адрес: */}
          <InputRows.DisplayTextRow FieldValue={props.values.SoftUserActualAddress} LabelCaption="Адрес:" />
  
          {/* Если копания Реквизиты компании пользователя лицензии: List */}
          {props.values.SoftUserEntityID === "LEG" ?
            LicenseCompanyFields(props) :
            null
          }
  
        </>
      );
    }
  
    //Дополнительные данные: PreviousLicenseNumber, OrderComment
    function AdditionalData(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          {/* PreviousLicenseNumber: */}
          <InputRows.DisplayTextRow FieldValue={props.values.PreviousLicenseNumber} LabelCaption="Номер предыдущей регистрации или заказа:" />
  
          {/* OrderComment: */}
          <InputRows.DisplayTextRow FieldValue={props.values.OrderComment} LabelCaption="Комментарий к заказу:" />
        </>
      );
    }
  
    return (
      <Fmk.Form>
  
        <br />
        <h3 className='mb-3'>Оформление заказа</h3>
  
        {/* Основные данные: */}
        {MainDataFields(frmProps)}
  
        {/* Данные покупателя Заголовок: List */}
        {BuyerData(frmProps)}
  
        {/* Реквизиты компании покупателя: List */}
        {frmProps.values.BuyerEntityID === "LEG" ?
          BuyerCompanyFields(frmProps) :
          null
        }
  
        {/* Если на другое лицо, то вот данные пользователя лицензии: List */}
        {frmProps.values.BuyerForOtherEntity === true ?
          LicenseUserData(frmProps)
          :
          null
        }
  
        {/* Дополнительные данные */}
        <div className="mb-2 mt-5 mb-3">
          <h5>Дополнительные данные</h5>
        </div>
  
        {AdditionalData(frmProps)}
  
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
              disabled={!state.RulesAgreed}
              onClick={CheckoutOrderClicked}
            >
              Оформить заказ
            </BS.Button>
          </BS.Col>
  
  
          {/* Кнопка: Test */}
          {/* <BS.Col md={4} className="d-grid gap-2" >
            <BS.Button
              variant="success"
              type="button"
              onClick={SetTestOrderIsProcessing}
            >
              Test waiting status
            </BS.Button>
          </BS.Col> */}
          </BS.Row>
  
          <br />
          <BS.Row className='mb-2'>
            <label>
              <input type="checkbox" 
                     name="toggle" 
                     checked ={state.RulesAgreed}
                     onChange={handleCheckboxChange} />
  
              <span className="">
                &ensp;Оформляя заказ на покупку, я принимаю&ensp;
  
                <a className="" style={{cursor: 'pointer'}}
                  href="/"
                  onClick={SellingRulesClick}
                >правила продажи</a>
  
                &ensp;и даю согласие на&ensp;
                <a className="" style={{cursor: 'pointer'}}
                   href="/"
                   onClick={PersonalDataRulesClick}
                >
                  обработку моих персональных данных
                </a> в соответствии с
                <a className="b-link"
                   href="/"
                   onClick={PrivacyPolicyClick}
                >
                  политикой конфиденциальности
                </a>
              </span>
            </label>
          </BS.Row>
  
  
      </Fmk.Form>
    );
  }
  
  let sendErrorElement: React.ReactElement | null;
  if (state.SendDataErrorText === "") {
    sendErrorElement = null;
  } else {
    sendErrorElement = (
      <BS.Alert key='danger' variant='danger'>
        {/* {editFormState.SendDataErrorText} */}
        <MultiLineText mlText={state.SendDataErrorText} />
      </BS.Alert>
    );
  }

  return (
    <div>
      {sendErrorElement}
      <Fmk.Formik
        initialValues={initialValues}
        //        validate={validateForm}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {/* {p => FormikChildren(p, props.SetNextState, setEditFormState, CheckoutOrderClicked)} */}
        {p => FormikChildren(p)}
      </Fmk.Formik>

      <SellingRulesModalDialog
        show={state.SellingRulesModal}
        onHide={() => HideSellingRulesDialog()}
      />

      <PersonalDataRulesModalDialog
        show={state.PersonalDataRulesModal}
        onHide={() => HidePersonalDataRulesDialog()}
      />

      <PrivacyPolicyModalDialog
        show={state.PrivacyPolicyModal}
        onHide={() => HidePrivacyPolicyModal()}
      />

      <DimmingScreenLoad Show={state.OrderIsProcessing} />
    </div>
  );
};

export default SignupForm2;