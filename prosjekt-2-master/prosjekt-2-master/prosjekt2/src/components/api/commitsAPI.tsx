import { useEffect, useState } from "react";


export interface Commit {
    short_id: string,
    title: string,
    committed_date: object
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
 * @returns json-file of commits, from gitlab-api
 */
const useCommitService = (pathParam: string, tokenParam: string) => {
    const [result, setResult] = useState<Service<Commit[]>>({
        status: "loading"
    });

    let path = pathParam.trim() + "/repository/commits?per_page=100"
    let token = tokenParam.trim()

    useEffect(() => {
        const fetchIssues = async () => {
            await fetch(path, {
                method: "get",
                headers: new Headers({
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                })
            })
            .then((response) => {
                if (response.ok){
                    
                    /**
                     * OBS: Max objects fetched from GitLab = 100
                     * For a project with commits (or issues) > 100, only the last 100 will show
                     *  
                     * SOLUTION:
                     * Headers detailing total number of pages -> append all pages to get all info
                     * OBS: The get-request to /repository/commits doesn't return these necessary headers
                     *  
                     * const totalPages = response.headers.get("x-total-pages")
                     * console.log("(C)TotalPages", totalPages) // -> null
                     * console.log(response.headers.get("x-total")) // -> null
                     */
                    
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
        fetchIssues();        
    }, [path, token]);
    return result;
}
export default useCommitService;