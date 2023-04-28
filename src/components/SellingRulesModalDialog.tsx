import * as React from 'react';

import { SellingRulesModalData } from "./SellingRulesModalData";
import { ModalDialog } from "./ModalDialog";

export function SellingRulesModalDialog(props: any): JSX.Element {
  return (
    <ModalDialog Title='Правила приобретения' 
                 Content={SellingRulesModalData(null)}
                 OnClosedClicked={props.onHide}
                 Show={props.show}
                 />
   );
}