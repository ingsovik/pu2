import React from "react";
import {FlexibleWidthXYPlot , VerticalBarSeries, XAxis, YAxis, HorizontalGridLines } from 'react-vis';
import { useDate } from "../context/DateContext";

/*
*preData is an array of objects containing info about each issue
*/
interface Props {
    preData: [{ startDay: any, startMonth: any, endDay: any, endMonth: any }]
}

/**
 * Function to find if an issue is active at a given month based on its start value and end/close value
 * @param chosenMonth 
 * @param startMonth 
 * @param endMonth 
 * @returns True if issue is active, false it its not
 */
export function isActiveInMonth(chosenMonth: number | null, startMonth: number, endMonth: number) {
    let booleanActive = false
    if (chosenMonth != null) {
        if (!(startMonth > chosenMonth)) {
            if (!(endMonth < chosenMonth && endMonth !== 0)) {
                booleanActive = true;
            }
        }
    }
    return booleanActive
}

/**
 * Function to find if an issue is active at given day of month based on its start values and end values
 * @param chosenDay 
 * @param chosenMonth 
 * @param startDay 
 * @param endDay 
 * @param startMonth 
 * @returns True if issue is active, false if not
 */
export function isActiveOnDay(chosenDay: number | null, chosenMonth: number | null, startDay: number, endDay: number, startMonth: number) {
    let booleanActive = false;
    if (chosenDay != null && chosenMonth != null) {
        if (startMonth < chosenMonth) {
            booleanActive = true;
        } else {
            if ((startDay < chosenDay || startDay === chosenDay) && (endDay > chosenDay || endDay === 0 || endDay === chosenDay)) {
                booleanActive = true
            }
        };
    }
    return booleanActive;
}

/**
 * Function to visualize active issues based on incoming data as a graph
 * @param preData from parent component 
 * @returns graph as jsx
 */
function IssuesGraph({ preData }: Props) {
    /*date from DateContext*/
    const date: Date = useDate();

    /*
    * x is the day of the issue, y is the number of active issues at the x value
    */
    const activeIssues: [{ x: any, y: any }] = [{ x: 1, y: 0 }]

    /**
     * Function to calculate the number of active issues at a given day of month based on all logged issues 
     * @param chosenDay 
     * @param chosenMonth 
     * @returns count of active issues
     */
    function calcNumActiveIssuePerDay(chosenDay: number | null, chosenMonth: number | null) {
        if (chosenDay != null && chosenMonth != null) {
            let count: number = 0;
            for (let el of preData) {
                if (isActiveInMonth(chosenMonth, el.startMonth, el.endMonth) && isActiveOnDay(chosenDay, chosenMonth, el.startDay, el.endDay, el.startMonth)) {
                    count++
                };
            };
            return count;
        }
    }

    /**
     * Function for finding the number of days of a given Date object
     * @param inputDay 
     * @returns number of days in month
     */
    function getDaysInMonth(inputDay: Date) {
        const month = inputDay.getMonth();
        if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
            return 31
        }
        else if (month === 1) {
            return 28
        }
        else { return 30 }
    }/** */

    /**
     * Function for logging number of active issues for the given Date. 
     * Values saved to activeIssues array
     * @param chosenDay 
     */
    function findActiveIssuesForOneDay(chosenDay: Date) {
        activeIssues.pop();
        const chosenDayAsNumber = chosenDay.getDate();
        const chosenMonthAsNumber = chosenDay.getMonth();
        const numberOfActiveIssues = calcNumActiveIssuePerDay(chosenDayAsNumber, chosenMonthAsNumber)
        for (let i = 1; i <= getDaysInMonth(date); i++) {
            if (numberOfActiveIssues != null) {
                if (numberOfActiveIssues > 0 && chosenDayAsNumber === i) {
                    activeIssues.push({ x: chosenDayAsNumber, y: numberOfActiveIssues });
                } else {
                    activeIssues.push({ x: i, y: 0.0001 });
                }
            }
        }

    }


    return (
        <div>
            <h2 className="graphH">Active issues in selected day</h2>
            <p>Choose any day from the calendar</p>
            {findActiveIssuesForOneDay(date)}
                <FlexibleWidthXYPlot height={400} margin={35} yDomain={[0, 10]}>
                    <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                    <VerticalBarSeries data={activeIssues} barWidth={1} color='rgb(149, 206, 255)' />
                    <XAxis title='Dates' tickTotal={7} />
                    <YAxis title='Number of active issues' tickTotal={9} />
                </FlexibleWidthXYPlot >
        </div>
    )

}

export default IssuesGraph;