import React from 'react';
import './candidate-ranking-row.css';

type CandidateRankingRowPropsType = {
    index: number,
    name: string,
    votes: number
}


const CandidateRankingRow =(props: CandidateRankingRowPropsType)=>{

    return <div className="candidateRankingRowContainer">
        <div className="candidateRankingRowIndex">{`${props.index+1}.`}</div>
        <div className="candidateRankingRowName" >{props.name}</div>
        <div className="candidateRankingRowVote" >{props.votes}</div>
    </div>
}

export default CandidateRankingRow;