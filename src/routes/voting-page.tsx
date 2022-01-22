import React, { useEffect, useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { FetchWithHeaders } from '../methods/api-call-methods';
import CandidatePickerRow from '../components/candidate-picker-row';
import CandidateMoveDirection from '../enmus/candidate-move-direction';


const VotingPage = ()=>
{

    const [errorMessage, setErrorMessage] = useState("");
    const [hideVoting, setHideVoting] = useState(true);
    const [globalCandidates, setGlobalCandidates] = useState<any[]>([]);
    const [regionalCandidates, setRegionalCandidates] = useState<any[]>([]);
    const [voter, setVoter] = useState<any>({});


    useEffect(()=>{

        FetchWithHeaders('candidates', {method: 'GET'} ).then( async response=>{
            
            if(response.ok ){
                const data = await response.json();
                if(data.candidates.length>0) {
                    setGlobalCandidates((data.candidates as any[]).filter(e=>e.in_global));
                    setRegionalCandidates((data.candidates as any[]).filter(e=>!e.in_global));
                }
            }
        })
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
                setRegionalCandidates(regionalCandidates.filter(e=>e.in_region.id&&e.in_region.id==data.voter.in_region_id));
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
                candidates.splice(index-1, 0, candidate);
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
        <div>Your vote counts!</div>
        { errorMessage && <div>{errorMessage}</div>}
        <Formik initialValues={{voterKey: ""}} onSubmit={handleVoterKeySubmission}> 
            {({
                isSubmitting
            })=>(
            <Form>
                <label>Your Voter Id:</label>
                <Field type="text" name="voterKey"/>
                <ErrorMessage name="voterKey" component="div"/>
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </Form>
            )}
        </Formik>
        { (hideVoting)? null :  <div>
            <h3>Regional candidates</h3>
            <div>
                {regionalCandidates.map((e, index)=>
                <CandidatePickerRow 
                    key={index} 
                    name={e.full_name} 
                    index={index} 
                    handleCandidateMovement={(direction, id)=>handleCandidateMovement(direction, id, false)}
                />)}
            </div>
            <h3>Global candidates</h3>
            <div>
                {globalCandidates.map((e, index)=>
                <CandidatePickerRow 
                    key={index} 
                    name={e.full_name} 
                    index={index} 
                    handleCandidateMovement={(direction, id)=> handleCandidateMovement(direction, id, true)}
                />)}
            </div>
            <button onClick={handleVoteSubmission}> Submit </button>
        </div>}
        </main>;
}

export default VotingPage;