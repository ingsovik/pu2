import { useEffect, useState } from "react";


export interface Info {
    id: string,
    name: string
}


interface ServiceInit {
    status: "init";
}
interface ServiceLoading {
    status: 'loading';
}
interface ServiceLoaded<T> {
    status: 'loaded';
    payload: T;
}
interface ServiceError {
    status: 'error';
    error: Error;
}
export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;
   
    
/**
 * Uses FetchAPI (async) to access GitLabs RestAPI, uses url and token from input
 * @param pathParam 
 * @param tokenParam 
 * @returns json-file of project, from gitlab-api
 */
const useInfoService = (pathParam: string, tokenParam: string) => {
    const [result, setResult] = useState<Service<Info[]>>({
        status: "loading"
    });
    
    let path = pathParam.trim()
    let token = tokenParam.trim()


    useEffect(() => {
        const fetchInfo = async () => {
            await fetch(path, {
                method: "get",
                headers: new Headers({
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                })
            })
            .then((response) => {
                if (response.ok){
                    return response.json()
                }
                else{
                    throw new Error()
                }
            })
            .then(response => setResult({
                status: "loaded",
                payload: response
            }))
            .catch(error => setResult({
                status: "error",
                error
            }))
        };
        fetchInfo();        
    }, [path, token]);
    return result;
}
export default useInfoService;