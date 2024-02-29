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
  for (const filename of filenames) {
    signalNewLapsPerRunRequest$.next(filename);
  }
});

runSummarySubject$.subscribe((result) => {
  createRaceCard(result);
  hideSpinner();
});
