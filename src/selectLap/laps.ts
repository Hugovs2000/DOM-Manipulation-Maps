import "leaflet/dist/leaflet.css";
import {
  lapSummarySubject$,
  runSummarySubject$,
  signalNewLapRequest$,
  signalNewLapsPerRunRequest$,
} from "../api/requests";
import generateMap, { animateLap, removePolyline } from "../dom/map-setup";
import addLapButton, {
  addHeaderDetails,
  addShadowDom,
  createReplayButton,
  hideSpinner,
  moreInfoDropdown,
  removeMoreInfo,
  removeReplayButton,
  showSpinner,
  toggleActiveButton,
} from "../dom/ui-manip";
import "../index.scss";
import { stopTimer } from "../utility/timer";

let lapNum: number;
const passedFilename: string | null = localStorage.getItem("Passed Filename");

function initializeMap() {
  generateMap(-29.697911, 30.525229);
}

initializeMap();

if (!passedFilename) {
  location.href = "../selectRace/";
} else {
  signalNewLapsPerRunRequest$.next(passedFilename);
}

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
        removeReplayButton();
        removeMoreInfo();
        toggleActiveButton(button.id);
        removePolyline();
        stopTimer();
        lapNum = +button.id;
        showSpinner();
        signalNewLapRequest$.next({
          fileName: passedFilename!,
          lapNum: lapNum,
        });
        document.querySelector("lap-details")?.remove();
        addHeaderDetails(runsJSON, lapNum);
        moreInfoDropdown(runsJSON, lapNum);
        addShadowDom(runsJSON, lapNum, "#lap-details");
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
    const replayButton = createReplayButton();

    animateLap(lapJSON);
    hideSpinner();

    replayButton?.addEventListener("click", function resetClick() {
      removePolyline();
      stopTimer();
      animateLap(lapJSON);
    });
  }
});
