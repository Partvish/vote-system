import React, {  useEffect, useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { FetchWithHeaders } from '../methods/api-call-methods';
import CandidatePickerRow from '../components/candidate-picker-row';
import CandidateMoveDirection from '../enmus/candidate-move-direction';
import './voting-page.css'
import store, { useAppSelector } from '../store/api-store';

/**
 * Main Ui element, Page.
 * It represents the voting page
 */
const VotingPage = ()=>
{

    const [errorMessage, setErrorMessage] = useState("");
    const [hideVoting, setHideVoting] = useState(true);
    const [globalCandidates, setGlobalCandidates] = useState<any[]>(useAppSelector(state=>state.candidates).filter((e:any)=>e.in_global));
    const [regionalCandidates, setRegionalCandidates] = useState<any[]>(useAppSelector(state=>state.candidates));
    const [voter, setVoter] = useState<any>({});

    useEffect(()=>{
        const handleChange=()=>{
            setGlobalCandidates(store.getState().candidates.filter((e:any)=>e.in_global))
            setRegionalCandidates(store.getState().candidates)
        }
        store.subscribe(handleChange)
    }, [])

    const handleVoterKeySubmission= (values: any)=>{

        FetchWithHeaders('voters/info', {
            method: 'POST',
            body: JSON.stringify( {
               'key': values.voterKey
            })

        }).then(async response=> {
            const data = await response.json();
            if(response.ok && data.voter.id){
                data.voter['key']=values.voterKey; 
                setVoter(data.voter);
                setRegionalCandidates(regionalCandidates.filter((e:any)=>e.in_region&&e.in_region.id&&e.in_region.id===data.voter.in_region_id));
                setHideVoting(false);
            }
            else {
                setErrorMessage("This key is not recorded in our database. Check again!");
            }
        })
        
        return values;
    }

    const handleVoteSubmission = ()=>{
        if(!voter) {
            setErrorMessage("Voter data lost, please resend your Voter Key");
            return;
        }
 

        FetchWithHeaders('voters/vote', {
            method: 'POST',
            body: JSON.stringify({
                'rankings_global': globalCandidates.map(e=>e.id),
                'rankings_region': regionalCandidates.map(e=>e.id),
                'voter_id': voter.id,
                'voter_key': voter.key
            })
        } 
    ).then(response=>{
            if(response.ok){
                setHideVoting(true);
            } else {
                setErrorMessage("Vote wasn't cast, please try again.")
            }
        });

        
    }

    const handleCandidateMovement= (direction: CandidateMoveDirection, index: number, isGlobal: boolean)=>{
        let candidates: any[]; 

        if(isGlobal) {
            candidates = new Array(...globalCandidates);
        }
        else {
            candidates = new Array(...regionalCandidates);
        }
    
        let candidate = candidates.splice(index, 1)[0];

        switch(direction){
            case CandidateMoveDirection.CandidateTop:
                candidates.unshift(candidate);
                break;
            case CandidateMoveDirection.CandidateBottom:
                candidates.push(candidate);
                break;
            case CandidateMoveDirection.CandidateUp:
                
                candidates.splice( (index-1<0)? 0: index-1, 0, candidate);
                break;
            case CandidateMoveDirection.CandidateDown:
                candidates.splice(index+1, 0, candidate);
                break;
            default:
                candidates.splice(index, 0, candidate);
                break;
        }

        if(isGlobal){
            setGlobalCandidates(candidates);
        } else {
            setRegionalCandidates(candidates);
        }
    }

  

    return <main>
        <h1>Cast your vote</h1>
        <div style={{marginBottom: 10,}}>Your vote counts!</div>
        { errorMessage && <div className="votingPageErrorMessage" style={{marginBottom: 10}}>{errorMessage}</div>}
        <Formik initialValues={{voterKey: ""}} onSubmit={handleVoterKeySubmission}> 
            {({
                isSubmitting,
                isValid
            })=>(
            <Form>
                <div style={{ fontSize: 12, color: '#673AB7', marginLeft: 5}}>Enter your Voter Key here:</div>
                <Field type="text" name="voterKey" validate={(value: string)=>{
                    let error='';
                    if(value.length>32 || value.length<32)
                        error += 'The key format is off. Please recheck your key, it should be 32 character long.';
                    else if(/[^a-zA-Z0-9]/.test(value))
                        error += 'The key format is off. Please recheck your key, it shouldn\'t contain special characters.';
                    return error;
                }} />
                
                <button className="votingPageButton grow" type="submit" style={{marginLeft: 5}} disabled={isSubmitting || !isValid}>
                    Check
                </button>
                <ErrorMessage name="voterKey" component="div" className="votingPageErrorMessage"/>
            </Form>
            )}
        </Formik>
        { (hideVoting)? null :  <div>
            <h3 style={{marginBottom: 10}}>Regional candidates</h3>
            <div style={{marginBottom: 15}}>Rearrange your candidates, based on your preference. The top most candidate is your first choice.</div>
            <div style={{maxWidth: 600}}><hr  /></div>
            <div style={{border: '1px solid #673AB7', maxWidth: 410, padding: 5}}>
                {regionalCandidates.map((e, index)=>
                <CandidatePickerRow 
                    key={index} 
                    name={e.full_name} 
                    index={index} 
                    handleCandidateMovement={(direction, id)=>handleCandidateMovement(direction, id, false)}
                />)}
            </div>
            <h3 style={{marginBottom: 10}}>Global candidates</h3>
            <div style={{marginBottom: 15}}>Rearrange your candidates, based on your preference. The top most candidate is your first choice.</div>
            <div style={{maxWidth: 600}}><hr  /></div>
            <div style={{border: '1px solid #673AB7', maxWidth: 410, padding: 5, marginBottom: 15}}>
                {globalCandidates.map((e, index)=>
                <CandidatePickerRow 
                    key={index} 
                    name={e.full_name} 
                    index={index} 
                    handleCandidateMovement={(direction, id)=> handleCandidateMovement(direction, id, true)}
                />)}
            </div>
            <button className="votingPageButton grow" onClick={handleVoteSubmission}> Submit </button>
        </div>}
        </main>;
}

export default VotingPage;