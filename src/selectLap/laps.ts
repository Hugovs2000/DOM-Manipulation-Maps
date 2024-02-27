import "leaflet/dist/leaflet.css";
import getAllRuns, { getAllLapsPerRun, getLap } from "../api/requests";
import generateMap, { animateLap, clearLatLngs } from "../dom/map-setup";
import addLapButton, {
  addHeaderDetails,
  addLapDetails,
  hideSpinner,
  showSpinner,
} from "../dom/ui-manip";
import "../index.scss";
import { IKartLapsPerRun, ILapDataset } from "../models/go-kart-types";
import { stopTimer } from "../utility/timer";

let filename: string;
let lapNum: number;

function initializeMap() {
  generateMap(-29.697911, 30.525229);
}

const lapCallback = (lapJSON: ILapDataset) => {
  if (!lapJSON?.dataSet) {
    return;
  }

  animateLap(lapJSON);
};

const lapFinallyCallback = () => {
  hideSpinner();
};

const kartingRunCallback = (runsJSON: IKartLapsPerRun) => {
  for (let btnNum = 1; btnNum <= runsJSON.lapSummaries.length; btnNum++) {
    let button = addLapButton(btnNum, runsJSON);

    button.addEventListener("click", function btnClick() {
      clearLatLngs();
      stopTimer();
      lapNum = +button.id;
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

const allKartingRunsCallback = (allRunsJSON: string[]) => {
  if (!allRunsJSON?.[0]) {
    return;
  }
  filename = allRunsJSON[0];
  getAllLapsPerRun(
    filename,
    kartingRunCallback,
    (error) => console.error(error),
    allLapsFinallyCallback
  );
};

function initializeApp() {
  showSpinner();
  getAllRuns(allKartingRunsCallback, (error: Error) => {
    console.error(error);
    hideSpinner();
  });
}

initializeMap();
initializeApp();
