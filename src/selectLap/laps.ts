import "leaflet/dist/leaflet.css";
import {
  allFilesSubject$,
  lapSummarySubject$,
  runSummarySubject$,
  signalNewFilenameRequest$,
  signalNewLapRequest$,
  signalNewLapsPerRunRequest$,
} from "../api/requests";
import generateMap, { animateLap, removePolyline } from "../dom/map-setup";
import addLapButton, {
  addHeaderDetails,
  addLapDetails,
  hideSpinner,
  showSpinner,
  toggleActiveButton,
} from "../dom/ui-manip";
import "../index.scss";
import { stopTimer } from "../utility/timer";

let lapNum: number;
let allFilenames: string[] = [];

function initializeMap() {
  generateMap(-29.697911, 30.525229);
}

function initializeAPI() {
  showSpinner();
  signalNewFilenameRequest$.next();
}

initializeMap();
initializeAPI();

allFilesSubject$.subscribe((filenames) => {
  if (!filenames) {
    alert("Could not find filenames for races.");
    hideSpinner();
  } else {
    for (const filename of filenames) {
      allFilenames.push(filename);
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
    for (let btnNum = 1; btnNum <= runsJSON.lapSummaries.length; btnNum++) {
      let button = addLapButton(btnNum, runsJSON);

      button.addEventListener("click", function btnClick() {
        toggleActiveButton(button.id);
        removePolyline();
        stopTimer();
        lapNum = +button.id;
        showSpinner();
        signalNewLapRequest$.next({
          fileName: allFilenames[0],
          lapNum: lapNum,
        });
        addHeaderDetails(runsJSON, lapNum);
        addLapDetails(runsJSON, lapNum);
      });
    }
    hideSpinner();
  }
});

lapSummarySubject$.subscribe((lapJSON) => {
  if (!lapJSON?.dataSet) {
    alert("Could not find lap.");
    hideSpinner();
  } else {
    animateLap(lapJSON);
    hideSpinner();
  }
});
