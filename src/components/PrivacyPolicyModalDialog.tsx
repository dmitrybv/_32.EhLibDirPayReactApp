import * as React from 'react';

import { PrivacyPolicyModalData } from "./PrivacyPolicyModalData";
import { ModalDialog } from "./ModalDialog";

export function PrivacyPolicyModalDialog(props: any): JSX.Element {
  return (
    <ModalDialog Title='Политика конфиденциальности' 
                 Content={PrivacyPolicyModalData(null)}
                 OnClosedClicked={props.onHide}
                 Show={props.show}
                 />
   );
}