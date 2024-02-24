import getAllRuns, { getAllLapsPerRun } from "../api/requests";
import { createRaceCard, hideSpinner, showSpinner } from "../dom/ui-manip";
import "./races.scss";

let filename;

const kartingRunCallback = (runsJSON: {
  trackName: any;
  driver: any;
  sessionName: any;
  date: any;
  time: any;
  lapSummaries: any;
}) => {
  if (
    !(
      runsJSON?.trackName ||
      runsJSON?.driver ||
      runsJSON?.sessionName ||
      runsJSON?.date ||
      runsJSON?.time ||
      runsJSON?.lapSummaries[0]
    )
  ) {
    throw new Error("Cannot find Run");
  }

  createRaceCard(runsJSON);
};

const allLapsFinallyCallback = () => {
  hideSpinner();
};

const allKartingRunsCallback = (allRunsJSON: any[]) => {
  if (!allRunsJSON?.[0]) {
    throw new Error("Cannot find Runs");
  }
  filename = allRunsJSON[0];
  // showSpinner();
  getAllLapsPerRun(
    filename,
    kartingRunCallback,
    (error) => console.error(error),
    allLapsFinallyCallback
  );
};

const allRunsFinallyCallback = () => {
  //hidespinner();
};

showSpinner();
getAllRuns(
  allKartingRunsCallback,
  (error: any) => console.error(error),
  allRunsFinallyCallback
);
