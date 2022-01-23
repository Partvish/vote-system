import React from 'react';
import CandidateMoveDirection from '../enmus/candidate-move-direction';
import {BiArrowToTop, BiArrowToBottom, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'

import './candidate-picker-row.css';

type CandidatePickerRowProps = {
    name: string,
    index: number,
    handleCandidateMovement: (direction: CandidateMoveDirection, id: number)=>void
}

/**
 * Simple list ui element.
 * It's used in voting-page.ts to rearrange the order of the candidates.
 */
const CandidatePickerRow =(props: CandidatePickerRowProps)=>{

    return <div className="candidatePickerRowContainer" >
            <div style={{display: 'flex'}}>
                <div style={{marginRight: 10, fontWeight: 'bold'}}>{`${props.index + 1}.`}</div>
            <div className="candidatePickerRowName">{props.name}</div>
            </div>
                <div>
                    <button className="candidatePickerRowButton" onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateTop, props.index)}>
                        <BiArrowToTop />
                    </button>
                    <button className="candidatePickerRowButton" onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateUp, props.index)} >
                        <BiUpArrowAlt />
                    </button>
                    <button className="candidatePickerRowButton" onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateDown, props.index)} >
                        <BiDownArrowAlt />
                    </button>
                    <button className="candidatePickerRowButton" onClick={e=>props.handleCandidateMovement(CandidateMoveDirection.CandidateBottom, props.index)} >
                        <BiArrowToBottom />
                    </button>
                </div>
    </div>
    
}

export default CandidatePickerRow;