/**
 * Extremely simple reducer
 * It handles the regions lists.
 */
const RegionsReducer = (state=[], action: any) =>{
    switch(action.type){
       case "regions/set":
           return action.data;
       default:
           return state;
   }
}



export {
    RegionsReducer
}