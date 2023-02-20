import React from "react";
import useIssueService from "./api/issuesAPI";
import '../App.css';
import { usePath, useToken } from "../context/inputContext";

/**
 * Hook using path and token context to return grid of issues
 * @returns on loading/error: text as xml, on loaded: grid of issues as xml
 */
const Issues: React.FC<{}> = () => {
    const path: string = usePath();
    const token: string = useToken();
    const service = useIssueService(path, token);

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
        <div className="issuesGrid">
            <div className="gridDiv">
                {service.status === 'loading' && <div className="loadText">Loading...</div>}
                {service.status === 'loaded' &&
                    service.payload.map(issue => (
                        <div className="issueInfoDiv" key={issue.id}>
                            <p className="infoText"><b>IID:</b> <span className="issueSpan">{issue.iid}</span></p>
                            <p className="infoText"><b>Title:</b> <span className="issueSpan"><i>{issue.title}</i></span></p>
                            <p className="infoText"><b>State:</b> <span className="issueSpan">{issue.state}</span></p>
                            <p className="infoText"><b>Date created:</b> <span className="issueSpan">{dateBool(issue.created_at)}</span></p>                    
                            <p className="infoText"><b>Date closed:</b> <span className="issueSpan">{dateBool(issue.closed_at)}</span></p>                    
                        </div>
                ))}
                {service.status === 'error' && (
                    <div className="loadText">Error fetching data. Make sure you are authorized.</div>
                )}
            </div>
        </div>
    )
}

export default Issues;