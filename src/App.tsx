import * as BS from "react-bootstrap";
import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Form1EnterData from './components/Form1EnterData'
import Form2CheckSendData from './components/Form2CheckSendData'
import Form3LastResult from './components/Form3LastResult'
import Header from './components/Header'
import { GlobalStateType, MyFormValues, EditFormState } from "./data/GlobalState";

let GlobalState: GlobalStateType = new GlobalStateType();

function App() {

  function SetNextFormState(state: EditFormState): void {
    if (state === EditFormState.NewOrder)
    {
      GlobalState.FormData.Clear();
      setEditFormState(EditFormState.Edit);
    }
    else
    {
      setEditFormState(state);
    }
  }
  
  const [editFormState, setEditFormState] = React.useState<EditFormState>(EditFormState.Edit);

  let form: React.ReactElement | undefined = undefined;
  if (editFormState === EditFormState.Edit) {
    form = (
      <Form1EnterData
        FormData={GlobalState.FormData}
        SetNextState={SetNextFormState}
      />
    )
  }
  else if (editFormState === EditFormState.PreviewToPost) {
    form = (
      <Form2CheckSendData
        FormData={GlobalState.FormData}
        SetNextState={SetNextFormState}
      />
    )
  }
  else if (editFormState === EditFormState.ShowResult) {
    form = (
      <Form3LastResult 
        FormData={GlobalState.FormData}
        SetNextState={SetNextFormState}
    />
    )
  }

  return (
    <div className="App">
      <Header />
      <BS.Container className="px-4 py-4 my-def-text-color">
        {form}
      </BS.Container>
    </div>
  );
}

export default App;
