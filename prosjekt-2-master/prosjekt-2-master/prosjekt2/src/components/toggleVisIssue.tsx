import React, { useState } from "react";
import WeekIssues from "./weekIssues";
import DayIssues from "./dayIssues"
import MonthIssues from './monthIssues'
import { DateProvider } from "../context/DateContext";
import { usePath, useToken } from "../context/inputContext";
import useIssueService from "./api/issuesAPI";

export function ToogleVisIssues() {
  const path: string = usePath();
  const token: string = useToken();
  const service = useIssueService(path, token);

  /**
   * Function to make day part of input date object as string
   * @param dateObj 
   * @returns day as string
   */
  function dateBool(dateObj: Object | null) {
    if (service.status === "loaded") {
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
        return objStr //returns date only
      }
    }
  }

  /**
   * Function to reverse string 
   * @param str 
   * @returns reversed string
   */
  function reverseString(str: String | undefined) {
    if (str !== undefined) {
      return str.split(" ").reverse().join("");
    }
  }
  /*
  * preData is an array of objects containing info about each issue
  */
  const preData: [{ startDay: any, startMonth: any, endDay: any, endMonth: any }] = [{ startDay: 0, startMonth: 0, endDay: 0.1, endMonth: 0.1 }]
  preData.pop()

  /**
   * Function to log start values and end values of each issue into an array (preData)
   * @param issueStart 
   * @param issueEnd 
   */
  function addStartEndToData(issueStart: Object | null, issueEnd: Object | null) {
    if (service.status === 'loaded') {
      let startValue = reverseString(dateBool(issueStart));
      let endValue = dateBool(issueEnd);

      let startValMonth = monthBool(issueStart);
      let endValMonth = monthBool(issueStart);

      let floatEndValue = 0;
      let floatStartValue = 0;
      let floatEndMonthValue = 0;
      let floatStartMonthValue = 0;

      if (endValue != null && endValue !== '--') {
        floatEndValue = parseFloat(endValue.split(".").reverse().join("."));
      }
      if (floatEndValue !== 0 && endValMonth != null && endValMonth !== '--') {
        floatEndMonthValue = parseFloat(endValMonth.split(".").reverse().join(".")) - 1;
      }
      if (startValue != null && startValue !== '--') {
        floatStartValue = parseFloat(startValue.split(".").reverse().join("."));
      }
      if (startValMonth != null && startValMonth !== '--') {
        floatStartMonthValue = parseFloat(startValMonth.split(".").reverse().join(".")) - 1;
      }
      preData.push({ startDay: floatStartValue, startMonth: floatStartMonthValue, endDay: floatEndValue, endMonth: floatEndMonthValue });
    }
  }


  /**
   * Values for toggling between the different graphs
   */
  const [displayMonth, setDisplayMonth] = useState(true);
  const [displayWeek, setDisplayWeek] = useState(false);
  const [displayDay, setDisplayDay] = useState(false);

  const showMonth = () => {
    setDisplayMonth(true);
    setDisplayWeek(false);
    setDisplayDay(false)
  }
  const showWeek = () => {
    setDisplayMonth(false);
    setDisplayWeek(true);
    setDisplayDay(false)
  }
  const showDay = () => {
    setDisplayMonth(false);
    setDisplayWeek(false);
    setDisplayDay(true)
  }

  /**
   * Function to return jsx elements and components if service is loaded (path and token is accepted)
   * @returns returns components if service is loaded
   */
  function returnData() {
    if (service.status === "loaded") {
      return (
        <>
          <div id="issueTglButtons">
            <button type="button" className="toggleBtn" onClick={showDay}>Day</button>
            <button type="button" className="toggleBtn" onClick={showWeek}>Week</button>
            <button type="button" className="toggleBtn" onClick={showMonth}>Month</button>
          </div>

          <div>
            <DateProvider>
              {displayDay && <div> <DayIssues preData={preData} /> </div>}
              {displayWeek && <div> <WeekIssues preData={preData} /> </div>}
              {displayMonth && <div> <MonthIssues preData={preData} /> </div>}
            </DateProvider>
          </div>
        </>
      )
    }
  }

  return (
    <>
      {service.status === 'loaded' && service.payload.map(issue => addStartEndToData(issue.created_at, issue.closed_at))}
      {returnData()}
    </>
  )
}