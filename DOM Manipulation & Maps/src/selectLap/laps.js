import getAllRuns, { getAllLapsPerRun, getLap } from "../api/requests";
import generateMap, {
  addLatLng,
  cleanMap,
  drawPolyline,
  putCircle,
  removeLayers,
} from "../dom/mapsetup";
import addButton, { addLapDetails } from "../dom/ui-manip";
import "./laps.scss";

let map;
let filename;
let lapNum = 0;
let timer;

function initializeMap() {
  map = generateMap(-29.697911, 30.525229);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
  }
}

const lapCallback = (lapJSON) => {
  let counter = 0;

  timer = setInterval(() => {
    if (
      !(
        lapJSON?.dataSet?.[counter]?.["Lat."] ||
        lapJSON?.dataSet?.[counter]?.["Lon."]
      )
    ) {
      throw new Error("Cannot find coordinates");
    }

    let long = lapJSON.dataSet[counter]["Lon."] * 0.000001;
    let lat = lapJSON.dataSet[counter]["Lat."] * 0.000001;
    removeLayers();
    addLatLng(lat, long);
    drawPolyline();
    putCircle(lat, long);

    if (counter < lapJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      stopTimer();
    }
  }, 10);
};

const kartingRunCallback = (runsJSON) => {
  let btnNum = 1;

  for (let lap of runsJSON.lapSummaries) {
    const button = document.createElement("button");

    addButton(button, btnNum);

    button.addEventListener("click", function btnClick() {
      cleanMap();
      stopTimer();
      lapNum = button.id;
      getLap(filename, lapNum, lapCallback, (error) => console.error(error));
      addLapDetails(runsJSON, lapNum);
    });

    btnNum += 1;
  }
};

const allKartingRunsCallback = (allRunsJSON) => {
  if (!allRunsJSON?.[0]) {
    throw new Error("Cannot find filename");
  }
  filename = allRunsJSON[0];
  getAllLapsPerRun(filename, kartingRunCallback, (error) =>
    console.error(error)
  );
};

function initializeApp() {
  getAllRuns(allKartingRunsCallback, (error) => console.error(error));
}

initializeMap();
initializeApp();
