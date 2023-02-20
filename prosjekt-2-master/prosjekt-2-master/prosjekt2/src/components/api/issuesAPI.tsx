import { useEffect, useState } from "react";


export interface Issue {
    id: string,
    iid: string,
    title: string
    state: string,
    created_at: object,
    closed_at: object,
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
* @returns json-file of issues, from gitlab-api
*/
const useIssueService = (pathParam: string, tokenParam: string) => {
    const [result, setResult] = useState<Service<Issue[]>>({
        status: "loading"
    });
    
    let path = pathParam.trim() + "/issues?per_page=100"
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
                     * For a project with issues (or commits) > 100, only the last 100 will show
                     *  
                     * SOLUTION:
                     * Headers detailing total number of pages -> append all pages to get all info
                     *  
                     * const totalPages = response.headers.get("x-total-pages")
                     * console.log("(I)TotalPages", totalPages)
                     * console.log(response.headers.get("x-total"))
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
        }
        fetchIssues()
    }, [path, token])
    
    return result;
}
export default useIssueService;