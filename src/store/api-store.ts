import { configureStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CandidateReducer } from "./candidates-reducers";
import { ResultsReducer } from "./results-reducers";
import CWRMiddleWare from './candidate-with-result-middleware';
import { CandidatesWithResultsReducer } from "./candidates-with-results";
import { RegionsReducer } from "./regions";

/**
 * Redux store.
 * It was implemented to create app level state management for the application.
 */
const store= configureStore ({
    reducer: {
        results: ResultsReducer,
        candidates: CandidateReducer,
        candidatesWithResults: CandidatesWithResultsReducer,
        regions: RegionsReducer,
    },
    middleware: [CWRMiddleWare,]
    
})

/**
 * Type exports
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
