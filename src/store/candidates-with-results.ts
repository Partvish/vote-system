/**
 * Extremely simple reducer
 * It handles the merged candidate-results lists.
 */
const CandidatesWithResultsReducer = (state=[], action: any) =>{
    switch(action.type){
        case "candidates-with-results/set":
            return action.data;
        default:
            return state;
    }
}



export {
    CandidatesWithResultsReducer
}