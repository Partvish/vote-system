import { wrap } from 'module';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ImageLinkButton from '../components/image-link-button';
import { FetchWithHeaders } from '../methods/api-call-methods';
import './landing-page.css';

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
            <div className="landingResultContainer"> {results.map((e, index)=><div key={index} style={{marginRight: 15, textAlign: 'center'}}> {`${index+1}. ${e.candidate_id}`} </div>)} </div>
        </div>

        <div>
            <h2>Your vote counts</h2>
            <div className="imageLinkButtonContainer">
            <ImageLinkButton imgLink="/vote.png" link="/vote" text="Vote"/>
            <ImageLinkButton imgLink="/results.jpg" link="/results" text="Results" />
            </div>
        </div>
    </main>;
}

export default LandingPage;