import * as React from 'react';

import { PersonalDataRulesModalData } from "./PersonalDataRulesModalData";
import { ModalDialog } from "./ModalDialog";

export function PersonalDataRulesModalDialog(props: any): JSX.Element {
  return (
    <ModalDialog Title='Правила передачи и обработки личных данных' 
                 Content={PersonalDataRulesModalData(null)}
                 OnClosedClicked={props.onHide}
                 Show={props.show}
                 />
   );
}