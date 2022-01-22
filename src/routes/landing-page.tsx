import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { FetchWithHeaders } from '../methods/api-call-methods';

const LandingPage = ()=> {
    const [results, setResults] = useState<any[]>([]);
    useEffect(()=>{
        
        FetchWithHeaders('results/global', {method: 'GET'})
            .then( async response=> {
                if(response.ok){
                    const data: any = await response.json();
                    if(data.candidate_results) {
                        setResults((data.candidate_results as any[]).sort((a, b)=> a.total_points - b.total_points));
                    }
                }
            })
    }, [])

    return <main>
        <h1>Welcome to the Voting System Application!</h1>
        <div> 
            <h2>The current state of the election</h2>
            <div style={{display: "flex"}}> {results.map((e, index)=><div key={index}> {e.candidate_id} </div>)} </div>
        </div>
        <div>
            <h2>Your vote counts</h2>
            <div><Link to="/vote">Vote</Link></div>
            <div><Link to="/results">Results</Link></div>
        </div>
    </main>;
}

export default LandingPage;