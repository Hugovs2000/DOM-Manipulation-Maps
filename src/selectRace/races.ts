import {
  allFilesSubject,
  runSummarySubject$,
  signalNewFilenameRequest$,
  signalNewLapsPerRunRequest$,
} from "../api/requests";
import { createRaceCard, hideSpinner, showSpinner } from "../dom/ui-manip";
import "../index.scss";

function getData() {
  showSpinner();
  signalNewFilenameRequest$.next(null);
}

getData();

allFilesSubject.subscribe((filenames) => {
  if (!filenames) {
    alert("Could not find filenames for races.");
    hideSpinner();
  } else {
    for (const filename of filenames) {
      signalNewLapsPerRunRequest$.next(filename);
    }
  }
});

runSummarySubject$.subscribe((runsJSON) => {
  if (
    !(
      runsJSON?.date ||
      runsJSON?.driver ||
      runsJSON?.trackName ||
      runsJSON?.lapSummaries ||
      runsJSON?.sessionName ||
      runsJSON?.time
    )
  ) {
    alert("Could not find results for races.");
    hideSpinner();
  } else {
    createRaceCard(runsJSON);
    hideSpinner();
  }
});
