import React from 'react';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './PrintComponent';

const PrintExportButton = (props: {
    userInfo:TFeedbackStates;
    title: string;
    body:string;
    draft:number;
}) => {
    const componentRef = React.useRef(null);
    const {
        body, title,
        draft, userInfo
    } = props;
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        
    });

  return (
    <div>
        <div style={{display:'none'}}>
            <ComponentToPrint ref={componentRef}
                draft={draft} userInfo={userInfo}
            />
        </div>
        <button onClick={handlePrint}>Print!</button>
    </div>
  )
};

export default PrintExportButton;
