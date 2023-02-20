
import React from "react";
import {VerticalBarSeries, FlexibleWidthXYPlot , XAxis, YAxis, HorizontalGridLines } from 'react-vis';
import useCommitService from "./api/commitsAPI";
import { usePath, useToken } from "../context/inputContext";
import { useDate } from "../context/DateContext";


/**
     * Function for finding the number of days of a given Date object
     * @param inputDay 
     * @returns number of days in month
     */
export function getDaysInMonth(inputDay: Date) {
    const month = inputDay.getMonth()
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31
    }
    else if (month === 1) {
        return 28
    }
    else { return 30 }
}

/**
 * Function to make day part of input date object as string
 * @param dateObj 
 * @param serviceStatus 
 * @returns day as string
 */
export function dateBool(dateObj: Object | null, serviceStatus: string) {
    if (serviceStatus === "loaded") {
        if (dateObj === null) {
            return "--"
        }
        else {
            let objStr = dateObj.toString()
            objStr = objStr.substr(8, 2).replace('-', '.')
            return objStr //returns date only
        }
    }
}

/**
 * Functional component for creating the commits graphs
 * @returns graphs
 */
const CommitsGraph = () => {
    const date: Date = useDate();
    const path: string = usePath();
    const token: string = useToken();
    const service = useCommitService(path, token);

    /*
    * preData is an array of objects containing info about each commit
    */
    const preData: [{ x: any, y: any }] = [{ x: 0, y: 0 }]
    preData.pop();

    function countedCommits(commitDate: Object | null) {
        if (service.status === 'loaded') {

            let commitDateString = dateBool(commitDate, service.status);
            let commitMonthString = monthBool(commitDate)
            let floatCommitDate = 0;
            let floatCommitMonth = 0;

            if (commitDateString != null) {
                floatCommitDate = parseFloat(commitDateString.split('.').reverse().join('.'))
            }
            if (commitMonthString != null) {
                floatCommitMonth = parseFloat(commitMonthString.split('.').reverse().join('.')) - 1
            }
            preData.push({ x: floatCommitDate, y: floatCommitMonth });
        }
    }

    /**
    * Function to calculate the number of active commits at a given day of month based on all logged commit 
    * @param chosenDay 
    * @param chosenMonth 
    * @returns count of active commits
    */
    function calcCommitsPerDay(chosenDay: number | null, chosenMonth: number | null) {
        if (chosenDay != null && chosenMonth != null) {
            let count: number = 0;
            for (let el of preData) {
                if (el.x === chosenDay && el.y === chosenMonth) {
                    count++;
                }
            }
            return count;
        }
    }

    /*
    * x is the day of the commit, y is the number of active commits at the x value
    */
    const createdCommits: [{ x: any, y: any }] = [{ x: 0, y: 0 }]

    /**
   * Function to make month part of date object as string
   * @param dateObj 
   * @returns month as string
   */
    function monthBool(dateObj: Object | null) {
        if (service.status === "loaded") {
            if (dateObj === null) {
                return "--"
            }
            else {
                let objStr = dateObj.toString()
                objStr = objStr.substr(5, 2).replace('-', '.')
                return objStr
            }
        }
    }

    /**
     * Function for logging number of active commits for the month of the given Date. 
     * Values saved to activeIssues array
     * @param chosenDay 
     */
    function findActiveCommitsChosenMonth(chosenDay: Date) {
        createdCommits.pop();
        const chosenMonthAsNumber = chosenDay.getMonth();
        for (let i = 1; i <= getDaysInMonth(chosenDay); i++) {
            const numberOfActiveCommits = calcCommitsPerDay(i, chosenMonthAsNumber)
            if (numberOfActiveCommits != null) {
                if (numberOfActiveCommits > 0) {
                    createdCommits.push({ x: i, y: numberOfActiveCommits });

                } else {
                    createdCommits.push({ x: i, y: 0.0001 });
                }
            }
        }
    }


    /**
     * Function for returning the graph with the implemented data
     * Only run if service is loaded
     * @returns jsx elements and functions
     */
    function returnData() {
        if (service.status === "loaded") {
            return (
                <div>
                    <h2 className="graphH">Commits in chosen month</h2>
                    <p>Commits to master per day. Commits were not squashed on merge.</p>
                    {findActiveCommitsChosenMonth(date)}
                    <div id="commitGraph">
                        <FlexibleWidthXYPlot height={500} margin={35}>
                            <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                            <VerticalBarSeries data={createdCommits} barWidth={1} color='rgb(149, 206, 255)' />
                            <XAxis title='Dates' />
                            <YAxis title='Number of commits' />
                        </FlexibleWidthXYPlot  >
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {service.status === 'loaded' && service.payload.map(commits => countedCommits(commits.committed_date))}
            {returnData()}
        </div>
    )

}

export default CommitsGraph;