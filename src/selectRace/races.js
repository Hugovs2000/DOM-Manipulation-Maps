import getAllRuns, { getAllLapsPerRun } from "../api/requests";
import { createRaceCard } from "../dom/ui-manip";
import "./races.scss";

let filename;

const kartingRunCallback = (runsJSON) => {
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

const allKartingRunsCallback = (allRunsJSON) => {
  if (!allRunsJSON?.[0]) {
    throw new Error("Cannot find Runs");
  }
  filename = allRunsJSON[0];
  getAllLapsPerRun(filename, kartingRunCallback, (error) =>
    console.error(error)
  );
};

getAllRuns(allKartingRunsCallback, (error) => console.error(error));
