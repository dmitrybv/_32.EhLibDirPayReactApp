import React from 'react';
import styles from './DimmingScreenLoad.module.css';

//  const DivStyle = {
//    background: "#000",
//    opacity: "0.0",
//    position: "fixed", /* important to use fixed, not absolute */
//    top: "0",
//    left: "0",
//    width: "100%",
//    height: "100%",
//    display: "none",
//    zIndex: "9999", /* may not be necessary */
//  };

//  const DivStyleShow = {
//   display: "block !important",
//   animation: "visibleKeyFr 0.3s forwards",
// }

type DimmingScreenLoadArg =
  {
    Show: boolean;
  };

export function DimmingScreenLoad(props: DimmingScreenLoadArg): JSX.Element {

  let className = styles.dimmer;
  if (props.Show === true)
  {
    className = className + ' ' + styles.dimmer_show;
  }

  return (
    <div className= {className}>
      Text
    </div>
  );
}  

// export default MultiLineText;