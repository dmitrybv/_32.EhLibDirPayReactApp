import * as React from 'react';
import * as Fmk from 'formik';
import * as BS from "react-bootstrap";
import * as InputRows from "./InputRows";
import { LicenceType, SoftLicenTypes, GetSoftLicenceTypeByID } from "../data/SoftLicenTypes";
import { PaymentMethods } from "../data/PaymentMethods";
import { MyFormValues, EditFormState } from "../data/GlobalState";
import { BusinessEntities } from "../data/BusinessEntities";
import validator from 'validator';


const validateForm = (values: MyFormValues) => {
  const errors: any = {};
  //#region Comments
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
  //#endregion

  function CheckField(fieldName: string, isRequired: boolean): void {
    let objValues: any = values;

    if (isRequired) {
      if (objValues[fieldName] === "")
        errors[fieldName] = 'Поле обязательно для ввода';
    }
  }

  function CustomCheckField(fieldName: string, checkFunc: Function, errorText: string): void {
    if (errors[fieldName] === "" || errors[fieldName] === undefined) {
      if (!checkFunc()) {
        errors[fieldName] = errorText;
      }
    }
  }

  function IsDigitsOnly(str: string): boolean {
    let isNum = /^\d+$/.test(str);
    return isNum;
  }

  function CheckINNField(fieldName: string, fieldValue: string): void {
    if (errors[fieldName] !== "" && errors[fieldName] !== undefined) {
      return;
    }

    let validINN: boolean = fieldValue !== '' &&
      (fieldValue.length === 10 || fieldValue.length === 12) &&
      IsDigitsOnly(fieldValue);

    if (validINN === false) {
      errors[fieldName] = "Поле должно содержать 10 или 12 арабских цифр";
    }
  }

  function CheckKPPField(fieldName: string, fieldValue: string): void {
    if (errors[fieldName] !== "" && errors[fieldName] !== undefined) {
      return;
    }

    let validINN: boolean = fieldValue !== '' &&
      (fieldValue.length === 9) &&
      IsDigitsOnly(fieldValue);

    if (validINN === false) {
      errors[fieldName] = "Поле должно содержать 9 арабских цифр";
    }
  }

  function CheckFieldAsEmail(fieldName: string): void {
    CustomCheckField(fieldName,
      () => {
        let email = (values as any)[fieldName];

        //if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        if (validator.isEmail(email)) { return true }
        else { return false }
      },
      "EMail is not valid");
  }

  // if (values.BuyerEntityID === "") {
  //   errors.BuyerEntityID = 'Поле обязательно для ввода';
  // }
  CheckField('BuyerEntityID', true);
  CheckField('SoftLicenTypeID', true);
  CheckField('NumberOfLicensesAsStr', true);
  CustomCheckField('NumberOfLicensesAsStr',
    () => parseInt(values.NumberOfLicensesAsStr) <= 0 ? false : true,
    'Количество лицензий должно быть больше 0');

  CheckField('PaymentMethodID', true);

  CheckField('BuyerFirstName', true);
  CheckField('BuyerLastName', true);
  CheckField('BuyerEmail', true);
  CheckFieldAsEmail('BuyerEmail');
  CheckField('BuyerPhone', true);
  CheckField('BuyerActualCountry', true);
  CheckField('BuyerActualCity', true);

  if (values.BuyerEntityID === "LEG") {
    CheckField('BuyerCompName', true);
    CheckField('BuyerINN', true);
    CheckINNField('BuyerINN', values.BuyerINN);
    CheckKPPField('BuyerCompKPP', values.BuyerCompKPP);
    CheckField('BuyerLegalAddress', true);
  }

  if (values.BuyerForOtherEntity === true) {
    CheckField('SoftUserEntityID', true);
    CheckField('SoftUserLastName', true);
    CheckField('SoftUserFirstName', true);
    CheckField('SoftUserEmail', true);
    CheckFieldAsEmail('SoftUserEmail');
    CheckField('SoftUserActualCountry', true);
    CheckField('SoftUserActualCity', true);
    //CheckField('SoftUserActualAddress', true);

    if (values.SoftUserEntityID === "LEG") {
      CheckField('SoftUserCompName', true);
      CheckINNField('SoftUserINN', values.SoftUserINN);
      CheckKPPField('SoftUserCompKPP', values.SoftUserCompKPP);
      CheckField('SoftUserLegalAddress', true);
    }
  }

  if (values.PrevLicNumberIsNeeded)
  {
    CheckField('PreviousLicenseNumber', true);
  }

  return errors;
};

interface SignupForm1Ptops {
  FormData: MyFormValues;
  SetNextState: (state: EditFormState) => void;
}

//export const Form1EnterData: React.FC<SignupForm1Ptops> = (props: SignupForm1Ptops) => {
export function Form1EnterData(props: SignupForm1Ptops): React.ReactElement 
{

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

    props.FormData.BuyerEntityID = "LEG";
    props.FormData.SoftLicenTypeID = "RUS-STD";
    props.FormData.PaymentMethodID = "BANKPLAT";
    props.FormData.NumberOfLicenses = 1;

    props.FormData.BuyerFirstName = "ИмяТест";
    props.FormData.BuyerLastName = "ФамилияТест";
    props.FormData.BuyerEmail = "test@mail.ml";
    props.FormData.BuyerPhone = "+79110001122";
    props.FormData.BuyerActualCountry = "Россия";
    props.FormData.BuyerActualCity = "ГородТест";
    props.FormData.BuyerActualAddress = "АдресТест";

    props.FormData.BuyerCompName = "Компания тест";
    props.FormData.BuyerINN = "1234567890";
    props.FormData.BuyerCompKPP = "123456789";

    props.FormData.BuyerLegalAddress = "Полный адресс";

  }

  function FillTestIndividual(): void {
    props.FormData.BuyerEntityID = "IND";
    props.FormData.SoftLicenTypeID = "RUS-STD";
    props.FormData.NumberOfLicenses = 1;
    props.FormData.PaymentMethodID = "BANKCARD";

    props.FormData.BuyerFirstName = "ИмяТест";
    props.FormData.BuyerLastName = "ФамилияТест";
    props.FormData.BuyerEmail = "test@mail.ml";
    props.FormData.BuyerPhone = "+79110001122";

    //EdData.BuyerINN { get; set; }

    props.FormData.BuyerActualCountry = "Россия";
    props.FormData.BuyerActualCity = "ГородТест";
    props.FormData.BuyerActualAddress = "АдресТест";
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

    if ((e.key === "I" || e.key === "i") &&
      (e.altKey === true)) {
      FillTestIndividual();
      forceUpdate();
    }
  }

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
  
    ///* Данные покупателя Заголовок : Фамилия, Имя, Email, Телефон, Страна, Город, Адрес
    function BuyerData(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          {/* Данные покупателя Заголовок */}
  
          <div className="mb-2 mt-5 mb-3">
            {
              props.values.BuyerForOtherEntity === true ?
                <h5>Данные покупателя</h5> :
                <h5>Данные покупателя и пользователя лицензии</h5>
            }
          </div>
  
          {/* Покупатель Фамилия Компонент: */}
          <InputRows.InputTextRow FieldName="BuyerLastName" LabelCaption="Фамилия:" Required={true} formikProps={props} />
  
          {/* Покупатель Имя Компонент: */}
          <InputRows.InputTextRow FieldName="BuyerFirstName" LabelCaption="Имя:" Required={true} formikProps={props} />
  
          {/* Покупатель Email Компонент:*/}
          <InputRows.InputTextRow FieldName="BuyerEmail" LabelCaption="Email:" Required={true} formikProps={props} />
  
          {/* Покупатель Телефон Компонент:*/}
          <InputRows.InputTextRow FieldName="BuyerPhone" LabelCaption="Телефон:" Required={true} formikProps={props}
            PlaceHolder="Телефон в формате +79990001122"
          />
  
          {/* Покупатель Страна:*/}
          <InputRows.InputTextRow FieldName="BuyerActualCountry" LabelCaption="Страна:" Required={true} formikProps={props} />
  
          {/* Покупатель Город:*/}
          <InputRows.InputTextRow FieldName="BuyerActualCity" LabelCaption="Город:" Required={true} formikProps={props} />
  
          {/* Покупатель Адрес:*/}
          <InputRows.InputTextRow FieldName="BuyerActualAddress" LabelCaption="Адрес:" formikProps={props} />
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
          <InputRows.InputTextRow FieldName="BuyerCompName" LabelCaption="Название компании:" Required={true} formikProps={props} />
  
          {/* Покупатель ИНН: */}
          <InputRows.InputTextRow FieldName="BuyerINN" LabelCaption="ИНН:" Required={true} formikProps={props} />
  
          {/* Покупатель KPP: */}
          <InputRows.InputTextRow FieldName="BuyerCompKPP" LabelCaption="КПП:" Required={true} formikProps={props} />
  
          {/* Покупатель Юридический адрес: */}
          <InputRows.InputTextRow FieldName="BuyerLegalAddress" LabelCaption="Юридический адрес:" Required={true} formikProps={props} />
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
          <InputRows.InputTextRow FieldName="SoftUserCompName" LabelCaption="Название компании:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии: ИНН: */}
          <InputRows.InputTextRow FieldName="SoftUserINN" LabelCaption="ИНН:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии: KPP: */}
          <InputRows.InputTextRow FieldName="SoftUserCompKPP" LabelCaption="КПП:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии: Юридический адрес: */}
          <InputRows.InputTextRow FieldName="SoftUserLegalAddress" LabelCaption="Юридический адрес:" Required={true} formikProps={props} />
        </>
      );
    }
  
    //Данные пользователя лицензии: 
    function LicenseUserData(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      return (
        <>
          <div className="mb-2 mt-5 mb-3">
            <h5>Данные пользователя лицензии</h5>
          </div>
  
          {/* Покупатель Физ лицо/Юр лицо: */}
          <InputRows.InputComboboxRow
            fieldName="SoftUserEntityID"
            labelCaption="Пользователь лицензии:"
            formikProps={props}
            items={BusinessEntityComboItems}
            itemKeyValueName="key"
            itemDisplayValueName="displayValue"
          />
  
          {/* Пользователя лицензии Фамилия: */}
          <InputRows.InputTextRow FieldName="SoftUserLastName" LabelCaption="Фамилия:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии Имя: */}
          <InputRows.InputTextRow FieldName="SoftUserFirstName" LabelCaption="Имя:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии Email: */}
          <InputRows.InputTextRow FieldName="SoftUserEmail" LabelCaption="Email:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии Страна: */}
          <InputRows.InputTextRow FieldName="SoftUserActualCountry" LabelCaption="Страна:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии Город: */}
          <InputRows.InputTextRow FieldName="SoftUserActualCity" LabelCaption="Город:" Required={true} formikProps={props} />
  
          {/* Пользователя лицензии Адрес: */}
          <InputRows.InputTextRow FieldName="SoftUserActualAddress" LabelCaption="Адрес:" Required={false} formikProps={props} />
  
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
          <InputRows.InputTextRow FieldName="PreviousLicenseNumber" LabelCaption="Номер предыдущей регистрации или заказа:" Required={false} formikProps={props} />
  
          {/* OrderComment: */}
          <InputRows.InputTextRow FieldName="OrderComment" LabelCaption="Комментарий к заказу:" Required={false} formikProps={props} />
        </>
      );
    }
  
    function CheckShowErrorInfo(props: Fmk.FormikProps<MyFormValues>): React.ReactNode {
      if (props.isValid === true) {
        return null;
      }
      else {
        return (
          <>
            <BS.Alert key={'danger'} variant={'danger'}>
              Форма содержит ошибки!!!
            </BS.Alert>
          </>
        );
      }
    }
  
    // Fmk.Form HTML
    return (
      <Fmk.Form>
        <>
          {/* <InputRows.InputTextRow
          FieldName="firstName"
          LabelCaption="First Name"
          formikProps={props} />
  
        <InputRows.InputTextRow
          FieldName="lastName"
          LabelCaption="Last Name"
          formikProps={props} />
  
        <InputRows.InputTextRow
          FieldName="email"
          LabelCaption="Email Address"
          formikProps={props} /> */}
        </>
        <br />
        <h3 className='mb-3'>Оформление заказа</h3>
  
        <>
          {/* Покупатель Физ лицо/Юр лицо:
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
        </BS.Row> */}
        </>
  
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
          FieldName="SoftLicenceTypeDescription"
          LabelCaption="Описание лицензии:"
          formikProps={props}
          editControlSubs={
            (
              <div className='mt-2 mb-2'>{props.values.SoftLicenceTypeDescription}</div>
            )
          }
        />
  
        {/* Цена + Описание Цены */}
        <InputRows.InputTextRow
          FieldName="LicencePrice"
          LabelCaption="Цена одной лицензии:"
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
          FieldName="NumberOfLicensesAsStr"
          LabelCaption="Количество лицензий:"
          inputType='number'
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
  
        {/* Данные покупателя Заголовок: List */}
        {BuyerData(props)}
  
        {/* Реквизиты компании покупателя: List */}
        {props.values.BuyerEntityID === "LEG" ?
          BuyerCompanyFields(props) :
          null
        }
  
        {/* Checkbox X Оформить лицензию на другое лицо или компанию */}
        <div className="mb-2 mt-5 mb-3">
          <Fmk.Field type="checkbox"
            checked={props.values.BuyerForOtherEntity}
            id="BuyerForOtherEntity"
            name="BuyerForOtherEntity"
            onChange={props.handleChange}
          />
          <label htmlFor="BuyerForOtherEntity">&nbsp;Оформить лицензию на другое лицо или компанию</label>
        </div>
  
        {/* Если на другое лицо, то вот данные пользователя лицензии: List */}
        {props.values.BuyerForOtherEntity === true ?
          LicenseUserData(props) :
          null
        }
  
        {/* Дополнительные данные */}
        <div className="mb-2 mt-5 mb-3">
          <h5>Дополнительные данные</h5>
        </div>
  
        {AdditionalData(props)}
  
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
  
        {CheckShowErrorInfo(props)}
  
      </Fmk.Form>
    );
  }
  
  const initialValues: MyFormValues = props.FormData;
  // onkeydown={handleKeyDown} 

  return (
    <div onKeyDown={handleKeyDown} >
      <Fmk.Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
        children={FormikChildren}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      />
    </div>
  );
};

export default Form1EnterData;