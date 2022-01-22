import React from 'react';
import CandidateMoveDirection from '../enmus/candidate-move-direction';

type CandidateRankingRowPropsType = {
    name: string,
    votes: number
}


const CandidateRankingRow =(props: CandidateRankingRowPropsType)=>{

    return <div style={{display: "flex"}}>
        <div>{props.name}</div>
        <div>{props.votes}</div>
    </div>
}

export default CandidateRankingRow;