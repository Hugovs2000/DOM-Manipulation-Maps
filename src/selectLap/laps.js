import getAllRuns, { getAllLapsPerRun, getLap } from "../api/requests";
import generateMap, { animateLap, clearLatLngs } from "../dom/mapsetup";
import addLapButton, {
  addHeaderDetails,
  addLapDetails,
  hideSpinner,
  showSpinner,
} from "../dom/ui-manip";
import { stopTimer } from "../utility/timer";
import "./laps.scss";

let map;
let filename;
let lapNum = 0;

function initializeMap() {
  map = generateMap(-29.697911, 30.525229);
}

const lapCallback = (lapJSON) => {
  if (!lapJSON?.dataSet) {
    throw new Error("Cannot find lap");
  }

  animateLap(lapJSON);
};

const lapFinallyCallback = () => {
  hideSpinner();
};

const kartingRunCallback = (runsJSON) => {
  for (let btnNum = 1; btnNum <= runsJSON.lapSummaries.length; btnNum++) {
    let button = addLapButton(btnNum, runsJSON);

    button.addEventListener("click", function btnClick() {
      clearLatLngs();
      stopTimer();
      lapNum = button.id;
      showSpinner();
      getLap(
        filename,
        lapNum,
        lapCallback,
        (error) => console.error(error),
        lapFinallyCallback
      );
      addHeaderDetails(runsJSON, lapNum);
      addLapDetails(runsJSON, lapNum);
    });
  }
};

const allLapsFinallyCallback = () => {
  hideSpinner();
};

const allKartingRunsCallback = (allRunsJSON) => {
  if (!allRunsJSON?.[0]) {
    throw new Error("Cannot find filename");
  }
  filename = allRunsJSON[0];
  getAllLapsPerRun(
    filename,
    kartingRunCallback,
    (error) => console.error(error),
    allLapsFinallyCallback
  );
};

const allRunsFinallyCallback = () => {
  // hideSpinner();
};

function initializeApp() {
  showSpinner();
  getAllRuns(
    allKartingRunsCallback,
    (error) => console.error(error),
    allRunsFinallyCallback
  );
}

initializeMap();
initializeApp();
