import React from "react"
import useCommitService from "./api/commitsAPI";
import '../App.css';
import { usePath, useToken } from "../context/inputContext";

/**
 * Hook using path and token context to return grid of commits
 * @returns on loading/error: text as xml, on loaded: grid of commits as xml
 */
const Commits: React.FC<{}> = () => {
    const path: string = usePath();
    const token: string = useToken();
    const service = useCommitService(path, token);    

    /**
     * Function for getting the date only from dateObject
     * @param dateObj 
     * @returns date-part of string only
     */
    function dateBool(dateObj: object | null) {
        if (service.status === "loaded"){
            if (dateObj === null){
                return "--"
            }
            else{
                let objStr = dateObj.toString()
                return objStr.substr(0, 10)
            }
        }
    }


    return (
        <div className="commitsGrid">
            <div className="gridDiv">
                {service.status === 'loading' && <div className="loadText">Loading...</div>}
                {service.status === 'loaded' &&
                    service.payload.map(commit => (
                        <div className="commitInfoDiv" key={commit.short_id}>
                            <p className="infoText"><b>Title:</b> <span className="commitSpan"><i>{commit.title}</i></span></p>
                            <p className="infoText"><b>Date committed:</b> <span className="commitSpan">{dateBool(commit.committed_date)}</span></p>
                        </div>
                ))}
                {service.status === 'error' && (
                    <div className="loadText">Error fetching data. Make sure you are authorized.</div>
                )}
            </div>
        </div>
    );
};

export default Commits;