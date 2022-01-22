import React from 'react';
import CandidateMoveDirection from '../enmus/candidate-move-direction';

type CandidatePickerRowProps = {
    name: string,
    index: number,
    handleCandidateMovement: (direction: CandidateMoveDirection, id: number)=>void
}


const CandidatePickerRow =(props: CandidatePickerRowProps)=>{

    return <div style={{display: "flex"}}>
        <div>{props.name}</div>
        <button onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateTop, props.index)}>
            fel sokat
        </button>
        <button onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateUp, props.index)} >
            fel egyet
        </button>
        <button onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateDown, props.index)} >
            le egyet
        </button>
        <button onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateBottom, props.index)} >
            le sokat
        </button>
    </div>
}

export default CandidatePickerRow;