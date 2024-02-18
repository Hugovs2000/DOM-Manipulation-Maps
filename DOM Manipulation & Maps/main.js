import generateMap, {
  addLatLng,
  cleanMap,
  drawPolyline,
  putCircle,
  removeLayers,
} from "./mapsetup";
import getAllRuns, { getAllLapsPerRun, getLap } from "./requests";
import "./style.css";
import addButton, { addLapDetails } from "./ui-manip";

let map;
let filename;
let lapNum = 0;
let timer;

function initializeMap() {
  map = generateMap(-29.697911, 30.525229);
}

function stopTimer() {
  clearInterval(timer);
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
    // cleanMap();
    putCircle(lat, long);
    addLatLng(lat, long);
    drawPolyline();

    if (counter < lapJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      stopTimer();
    }
  }, 20);
};

const runCallback = (runsJSON) => {
  let btnNum = 1;

  for (let lap in runsJSON.lapSummaries) {
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

const allRunsCallback = (allRunsJSON) => {
  filename = allRunsJSON[0];
  getAllLapsPerRun(filename, runCallback, (error) => console.error(error));
};

function initializeApp() {
  getAllRuns(allRunsCallback, (error) => console.error(error));
}

initializeMap();
initializeApp();
