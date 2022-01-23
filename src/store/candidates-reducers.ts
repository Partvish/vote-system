/**
 * Extremely simple reducer
 * It handles the candidate lists.
 */

const CandidateReducer = (state=[], action: any) =>{
     switch(action.type){
        case "candidates/set":
            return action.data;
        default:
            return state;
    }
}



export {
    CandidateReducer
}