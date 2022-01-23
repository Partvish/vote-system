
/**
 * Redux Middleware
 * It runs after the candidates and results lists are fetched from the api.
 * It's main funcationality is to create a merged list, and dispatch it to the store.
 */
const CWRMiddleWare = (store:any) => (next:any) => (action:any) => {
    const createCWR=()=>{
        let results: any[] = store.getState().results;
        console.log(results)
        let candidates: any[] =store.getState().candidates;
        console.log(candidates)
        let out = new Map<string, any>();
            results.forEach(e=>{ out.set(e.candidate_id, { id: e.candidate_id, total_points: e.total_points, in_region: e.in_region })});
            candidates.forEach(e => {
                if(out.has(e.id)){
                    out.set(e.id, {...out.get(e.id), full_name: e.full_name})
                }
            });

       return Array.from(out.values());
    }

    next(action)

    let shouldDispatch = false;
    switch(action.type) {
    case "candidates/set":
        if(store.getState().results.length>0)
            shouldDispatch = true;
        break;
    case "results/set":
        if(store.getState().candidates.length>0)
        shouldDispatch = true;
        
        break;
    default: 
        break;
    }
    if(shouldDispatch){
        store.dispatch({type: 'is-loading/set', data: !store.getState().isLoading});
        store.dispatch({type: 'candidates-with-results/set', data: createCWR()});
    }
    
  
  }

  export default CWRMiddleWare;