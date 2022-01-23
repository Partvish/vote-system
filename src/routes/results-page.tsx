import React, { useEffect, useState } from 'react';
import CandidateRankingRow from '../components/candidate-ranking-row';
import ColumnChart from '../components/column-chart';
import { FetchWithHeaders } from '../methods/api-call-methods';
import {BsSortUp, BsSortDown} from 'react-icons/bs';
import './results-page.css'

const ResultPage = ()=>{
    const [rankings, setRankings] = useState<any[]>([]);
    const [regions, setRegions] = useState<any[]>([]);
    const [selected, setSelected] = useState(-1);
    const [errorMessage, setErrorMessage] = useState("");
    const [isAscending, setIsAscending] = useState(false);
    const [currentList, setCurrentList] = useState<any[]>([]);

    useEffect(()=>{
        FetchWithHeaders('results', {method: 'GET'})
            .then( async response=> {
                if(response.ok){
                    const data = await response.json();
                    console.log(data)
                    if(data.candidate_results){
                        setRankings(data.candidate_results);
                    }
                    else {
                        setErrorMessage("Oops Something went wrong. Ranking data couldn't be loaded");
                    }
                }
            })
            FetchWithHeaders('regions', {method: 'GET'})
            .then( async response=> {
                if(response.ok){
                    const data = await response.json();
                    console.log(data)
                    if(data.regions){
                        setRegions(data.regions);
                       
                    }
                    else {
                        setErrorMessage("Oops Something went wrong. Ranking data couldn't be loaded");
                    }
                }
            })
    }, [])



    useEffect(()=>{
        const computeRankings = ()=>{
            let sorting = (isAscending)? (a: any, b: any)=>a.total_points-b.total_points : (a: any, b: any)=>b.total_points-a.total_points;
    
            if(selected===-1){
                setCurrentList( rankings.filter(e=>!e.in_region)
                                .sort(sorting))
                            
            }
            else{
                let region_id = regions[selected].id;
                 setCurrentList( rankings.filter(e=>e.in_region===region_id)
                                .sort(sorting))      
            }
        }
        computeRankings();
    }, [isAscending, selected, rankings, regions])

    

    return <main>
        <h1>Election Results</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <div style={{marginBottom: 15}}>Here you can see the current election results. Choose your region to get the latest news, or choose global to see the candidates who run for the country. </div>
        <div style={{display: 'flex', justifyContent: 'space-evenly', maxWidth: 1200, maxHeight: 1200, flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: 320}}>
                <div style={{marginBottom: 15}}>
                
                    <select name="Regions" id="regions" onChange={e=> setSelected( Number.parseInt(e.target.value))} defaultValue={-1}>
                        <option value={-1}  >Global</option>
                        {regions.map((e: any, index: number)=><option key={index} value={index}>{e.region_name}</option>)}
                    </select>
                    <button className="sortButton" onClick={e=> setIsAscending(!isAscending)} >
                        {isAscending? <BsSortUp />: <BsSortDown />}
                    </button>
                </div>
                <div>{ currentList.map((e,i)=> <CandidateRankingRow key={i} name={e.candidate_id} votes={e.total_points} index={i} />) }</div>
            </div>

            <div style={{ maxWidth: 800, flex: 2}}>
               {  <ColumnChart data={currentList.map((e, i)=>{ return {index: i, value: e.total_points}})} candidates={currentList.map(e=>e.candidate_id)} /> }
            </div>
        </div>
        
    </main>;
}

export default ResultPage;