import React from 'react';
import { useFormik } from 'formik';
import * as BS from "react-bootstrap";

import { MyFormValues, EditFormState } from "../data/GlobalState";
import * as InputRows from "./InputRows";

interface SignupForm3Ptops {
  FormData: MyFormValues;
  SetNextState: (state: EditFormState) => void;
}

const SignupForm3 = (props: SignupForm3Ptops) => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  function BackToEhLib() {
    //props.SetNextState(EditFormState.Edit);
    //window.location.replace('https://www.ehlib.com');
    window.location.assign('https://www.ehlib.com');
  }

  function StartNewOrderClicked() {
    props.SetNextState(EditFormState.NewOrder);
  }

  return (
    <form onSubmit={formik.handleSubmit}>

      <h3 className="h3 my-def-text-color mb-3">Заказ оформлен и отправлен продавцу</h3>

      <div className="mb-2 mt-5 mb-3">
        <span>На вашу электронную почту <b>{props.FormData.BuyerEmail}</b> будет отправлено письмо с номером заказа и счетом на оплату.</span>
      </div>

      {/* Общая стоимость заказа: */}
      <InputRows.DisplayTextRow
        FieldValue={props.FormData.OrderPriceText}
        LabelCaption="Общая стоимость заказа:"
      />

      {/* Способ оплаты: */}
      <InputRows.DisplayTextRow
        FieldValue={props.FormData.PaymentMethodName}
        LabelCaption="Способ оплаты:"
      />

      {/*  */}
      {/* Кнопки */}
      {/*  */}
      <br />
      <br />
      <BS.Row className='mb-2'>

        {/* Кнопка: Вернуться на главную страницу */}
        <BS.Col md={4}>
          <BS.Button
            variant="primary"
            type="button"
            onClick={BackToEhLib}
          >
            Вернуться на главную страницу
          </BS.Button>
        </BS.Col>

        <BS.Col md={1} className="d-grid gap-2" >
        </BS.Col>

      {/* Кнопка: Оформить новый заказ */}
      <BS.Col md={4} className="d-grid gap-2" >
          <BS.Button 
            variant="light"
            type="button" 
            onClick={StartNewOrderClicked}
          >
              Оформить новый заказ
          </BS.Button>
        </BS.Col>
      </BS.Row>


      {/* <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <button type="submit">Submit</button> */}
    </form>
  );
};

export default SignupForm3;