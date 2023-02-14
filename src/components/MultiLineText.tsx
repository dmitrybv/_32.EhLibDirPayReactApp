import React from 'react';

type MultiLineTextArg =
  {
    mlText: string;
  }

export function MultiLineText(props: MultiLineTextArg): JSX.Element {

  const lines = props.mlText.split(/\n/);

  const jsxLines = lines.map(function(item, idx) {
    return (
        <span key={idx}>
            { item }
            { (idx === lines.length - 1) ? null : <br/> }
        </span> )
  });

  return (
    <span>
      {jsxLines}
    </span>
  );
}  

// export default MultiLineText;