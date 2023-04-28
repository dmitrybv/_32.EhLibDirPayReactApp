import * as React from 'react';
import * as BS from "react-bootstrap";

interface ModalDialogPtops {
  Title: string;
  Content: JSX.Element;
  OnClosedClicked: () => void;
  Show: boolean
}

export function ModalDialog(props: ModalDialogPtops): JSX.Element {
  return (
    <BS.Modal
      show = {props.Show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <BS.Modal.Header closeButton onHide={props.OnClosedClicked}>
        <BS.Modal.Title id="contained-modal-title-vcenter">
        {props.Title}
        </BS.Modal.Title>
      </BS.Modal.Header>
      <BS.Modal.Body>
        {props.Content}
      </BS.Modal.Body>
      <BS.Modal.Footer>
        <BS.Button onClick={props.OnClosedClicked}>Close</BS.Button>
      </BS.Modal.Footer>
    </BS.Modal>
  );
}