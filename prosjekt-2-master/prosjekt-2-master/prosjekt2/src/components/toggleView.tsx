import React, { useEffect } from "react"
import Issues from './issues';
import Commits from './commits';
import useTgl from "use-tgl";
import CommitsGraph from "./visualCommits";
import { ToogleVisIssues } from "./toggleVisIssue";
import { ProjectInfo } from "../ProjectInfo";
import { DateProvider } from "../context/DateContext";
import ToggleColor from './toggleColor'

/**
 * Function for toggling between Issue- og Commits-view with a button-click
 * @returns ProjectInfo with updated calues,
 *    XML-rendered elements like buttons and headers,
 *    and either the Issue-content or the Commit-content
 *      (incl. graph and grid)
 */
export function ToggleView() {
  const { enabled, on, off, toggle } = useTgl(true);

  useEffect(() => {
    toggle();
  }, [toggle]);

  return enabled ? (
    <>
      <div className="toggleDiv">
        <ProjectInfo />
        <div className="tglBtnDiv">
          <button type="button" className="toggleBtn" onClick={off}>View Issues</button>
          <ToggleColor />
        </div>
        <div className="tglH1">
          <h1>Commits</h1>
          <p><i>Shows the latest 100 commits</i></p>
        </div>
        <DateProvider>
          <CommitsGraph />
        </DateProvider>
        <Commits />
      </div>
    </>
  ) : (
    <>
      <div className="toggleDiv">
        <ProjectInfo />
        <div className="tglBtnDiv">
          <button type="button" className="toggleBtn" onClick={on}>View Commits</button>
          <ToggleColor />
        </div>
        <div className="tglH1">
          <h1>Issues</h1>
          <p><i>Shows the latest 100 issues</i></p>
        </div>
        <ToogleVisIssues />
        <Issues />
      </div>
    </>
  );
}