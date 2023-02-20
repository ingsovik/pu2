import React from 'react';
import { usePath, useToken } from './context/inputContext';
import useInfoService from './components/api/projectInfoAPI';
import { ReactComponent as ReactLogo } from './profile.svg';


export const ProjectInfo: React.FC<{}> = () => {
    const path: string = usePath();
    const token: string = useToken();
    const service = useInfoService(path, token);
    let arr = {};
    let id: string | unknown = "";
    let name: string | unknown = "";


    function getInfo() {
        if (service.status === "loaded") {
            arr = service.payload

            if (Object.values(arr)[0] !== "unknown") {
                id = Object.values(arr)[0]
            }
            if (Object.values(arr)[0] !== "unknown") {
                name = Object.values(arr)[2]
            }

        }

    }

    return (
        <>
            <div className="projectInfoDiv">
                <ReactLogo />
                {getInfo()}
                <div id="infoHs">
                    <h2 id="infoID">Project ID: {id}</h2>
                    <h2 id="infoName">Project name: {name}</h2>
                </div>
            </div>
        </>
    )
}