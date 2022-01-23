/**
 * Extremely simple reducer
 * It handles the results lists.
 */
const ResultsReducer = (state=[], action: any) =>{
    switch(action.type){
        case "results/set":
            return action.data;
        default:
            return state;
    }
}



export {
    ResultsReducer
}