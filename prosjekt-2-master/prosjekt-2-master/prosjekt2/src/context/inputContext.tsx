import React, { createContext, FC, useContext, useState } from "react"

export let PathContext = createContext("--");
export let TokenContext = createContext("--");

export function usePath() {
    return useContext(PathContext)
}
export function useToken() {
    return useContext(TokenContext)
}

/**
 * Function for rendering input-xml, getting the input from the user,
 *      storing the input in localStorage, and displaying the stored
 *      values from localStorage on reload/reopening of the page
 * @param children  ->  context for fetching the path/token from input
 * @returns 
 */
export const InputProvider: FC = ({children}) => {

    /**
     * Variables for getting the stored strings from localStorage
     */
    let pathStore: string = ""
    const storageP = localStorage.getItem("Path")
    if (storageP) {
        pathStore = storageP
    }
    let tokenStore: string = ""
    const storageT = localStorage.getItem("Token")
    if (storageT) {
        tokenStore = storageT
    }

    const [path, setPath] = useState<string>("");
    const [tempPath, setTempPath] = useState<string>(pathStore);
    const [token, setToken] = useState<string>("")
    const [tempToken, setTempToken] = useState<string>(tokenStore);

    let enteredPath = '';
    let enteredToken = '';

    /**
     * Functions for updating the state of tempPath and tempToken when the user writes in the input
     * @param event  ->  triggers onChange in the input-fields path and token
     */
    const inputHandlerPath = (event: React.ChangeEvent<HTMLInputElement>) => {
        enteredPath = event.target.value;
        setTempPath(enteredPath);
    }
    const inputHandlerToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        enteredToken = event.target.value;
        setTempToken(enteredToken)
    }
    
    /**
     * Function for setting the final-typed path and token in state onClick submit,
     *  and storing in localStorage
     */
    const submit = () => {
        setPath(tempPath)
        setToken(tempToken)
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("Path", tempPath)
            localStorage.setItem("Token", tempToken)
        }
        else { alert("Your browser does not support web storage.") }
    }


    return (
        <>
            <div className="inputDiv">

                <div className="path">

                    <div className="labelDiv">
                        <label htmlFor="urlInput" className="inputLabels" id="urlLabel">Project url (ending in project-id):</label>
                    </div>
                    <input
                        type="url"
                        id="urlInput"
                        value={tempPath}
                        onChange={inputHandlerPath}
                        placeholder="https://gitlab.stud.idi.ntnu.no/api/v4/projects/xxxxx"
                        className="inputs"
                    />
                </div>
                <div className="token">

                    <div className="labelDiv">
                        <label htmlFor="tokenInput" className="inputLabels" id="tokenLabel">Project token:</label>
                    </div>
                    <input
                        type="text"
                        id="tokenInput"
                        value={tempToken}
                        onChange={inputHandlerToken}
                        placeholder="xxxx_xxxxxxxx"
                        className="inputs"
                    />
                </div>
                <button
                    id="submitBtn"
                    className="inputs"
                    onClick={submit}
                >Submit</button>
            </div>


            <PathContext.Provider value={path}>
                <TokenContext.Provider value={token}>
                    {children}
                </TokenContext.Provider>
            </PathContext.Provider>
        </>
    )
}
