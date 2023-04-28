import React from 'react';

import styles from './DimmingScreenLoad.module.css';
import { Spinner } from 'react-bootstrap';
 
type DimmingScreenLoadArg =
  {
    Show: boolean;
  };

export function DimmingScreenLoad(props: DimmingScreenLoadArg): JSX.Element {

  //const [dimmerVisible, updateDimmerVisible] = React.useState(false);
  //const dimmerVisible = React.useRef(false);
  const selfRef = React.useRef<HTMLDivElement>(null);

  let className = styles.dimmer;
  if (props.Show === true)
  {
    className = className + ' ' + styles['dimmer-show'];
    //dimmerVisible.current  = true;
    //updateDimmerVisible(true);
  }
  //else if(props.Show === false /*&& dimmerVisible.current === true*/)
  else if(props.Show === false && 
          selfRef.current !== null && 
          selfRef.current.clientWidth )
  {
    className = className + ' ' + styles['dimmer-hide'];
    //updateDimmerVisible(false);
    //dimmerVisible.current  = false;
  }

  return (
    <div ref={selfRef} className= {className}>
      <Spinner className={styles['spinner-center']} animation="border" />
    </div>
  );
}  

// export default MultiLineText;