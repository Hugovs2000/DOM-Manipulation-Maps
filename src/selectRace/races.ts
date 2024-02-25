import getAllRuns, { getAllLapsPerRun } from "../api/requests";
import { createRaceCard, hideSpinner, showSpinner } from "../dom/ui-manip";
import { IKartLapsPerRun } from "../models/go-kart-types";
import "./races.scss";

let filename;

const kartingRunCallback = (runsJSON: IKartLapsPerRun) => {
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
    return;
  }

  createRaceCard(runsJSON);
};

const allLapsFinallyCallback = () => {
  hideSpinner();
};

const allKartingRunsCallback = (allRunsJSON: string[]) => {
  if (!allRunsJSON?.[0]) {
    return;
  }
  filename = allRunsJSON[0];
  getAllLapsPerRun(
    filename,
    kartingRunCallback,
    (error: Error) => console.error(error),
    allLapsFinallyCallback
  );
};

const allRunsFinallyCallback = () => {
  //hidespinner();
};

showSpinner();
getAllRuns(
  allKartingRunsCallback,
  (error: Error) => console.error(error),
  allRunsFinallyCallback
);
