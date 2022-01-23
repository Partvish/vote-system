const isLoadingReducer = (state=false, action: any) =>{
    switch(action.type){
        case "is-loading/set":
            return action.data;
        default:
            return state;
    }
}



export {
    isLoadingReducer
}