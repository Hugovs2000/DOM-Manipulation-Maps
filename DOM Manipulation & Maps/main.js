import generateMap, { cleanMap, putCircle } from "./mapsetup";
import getAllRuns, { getAllLapsPerRun, getLap } from "./requests";
import "./style.css";

let map;
let filename;
let lapNum = 0;
let timer;
const detailsContainer = document.getElementById("heading");

function initializeMap() {
  map = generateMap(-29.697911, 30.525229);
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

    let long = lapJSON.dataSet[counter]["Lon."];
    let lat = lapJSON.dataSet[counter]["Lat."];

    lat = lat * 0.000001;
    long = long * 0.000001;

    putCircle(lat, long);

    if (counter < lapJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      clearInterval(timer);
    }
  }, 20);
};

const runCallback = (runsJSON) => {
  let btnNum = 1;
  const buttonContainer = document.getElementById("select-button");

  for (let lap in runsJSON.lapSummaries) {
    const button = document.createElement("button");
    button.id = `${btnNum}`;
    button.textContent = `${btnNum}`;

    buttonContainer.appendChild(button);

    button.addEventListener("click", function btnClick() {
      cleanMap();
      clearInterval(timer);
      lapNum = button.id;
      getLap(filename, lapNum, lapCallback, (error) => console.error(error));
      detailsContainer.id = "details";
      detailsContainer.innerHTML = `${runsJSON.trackName}:<br />${runsJSON.driver} - Lap : ${lapNum}`;
    });

    btnNum += 1;
  }

  console.log(runsJSON);
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
