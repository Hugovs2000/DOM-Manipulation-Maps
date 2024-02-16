import generateMap, { putCircle } from "./mapsetup";
import getAllRuns, { getAllLapsPerRun, getLap } from "./requests";
import "./style.css";

let map = generateMap(-29.697411, 30.525229);
let filename = undefined;
let lapNum = 1;
let numOfLaps = 0;

const lapCallback = (lapJSON) => {
  let counter = 0;
  const timer = setInterval(() => {
    if (
      !(
        lapJSON?.dataSet?.[counter]?.["Lat."] &&
        lapJSON?.dataSet?.[counter]?.["Lon."]
      )
    ) {
      throw new Error("Can not find");
    }

    let long = lapJSON.dataSet[counter]["Lon."];
    let lat = lapJSON.dataSet[counter]["Lat."];

    lat = lat * 0.000001;
    long = long * 0.000001;

    putCircle(map, lat, long);

    if (counter < lapJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      clearInterval(timer);
    }
  }, 10);
};

const runCallback = (runsJSON) => {
  numOfLaps = runsJSON.lapSummaries.length;
};

const allRunsCallback = (allRunsJSON) => {
  filename = allRunsJSON[0];
  getAllLapsPerRun(filename, runCallback, (error) => console.error(error));
  getLap(filename, lapNum, lapCallback, (error) => console.error(error));
  console.log(allRunsJSON);
};

getAllRuns(allRunsCallback, (error) => console.error(error));
