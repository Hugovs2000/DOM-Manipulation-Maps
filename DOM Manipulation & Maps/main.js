import generateMap, { putCircle } from "./mapsetup";
import getAllRuns, { getAndSetLocal } from "./requests";
import "./style.css";

let map = generateMap(-29.697411, 30.525229);
let filename = undefined;
let lapNum = 2;

const lapCallback = (resJSON) => {
  let counter = 0;
  const timer = setInterval(() => {
    if (
      !(
        resJSON?.dataSet?.[counter]?.["Lat."] &&
        resJSON?.dataSet?.[counter]?.["Lon."]
      )
    ) {
      throw new Error("Can not find");
    }

    let long = resJSON.dataSet[counter]["Lon."];
    let lat = resJSON.dataSet[counter]["Lat."];

    lat = lat * 0.000001;
    long = long * 0.000001;

    putCircle(map, lat, long);

    if (counter < resJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      clearInterval(timer);
    }
  }, 30);
};

const allRunsCallback = (allRunsJSON) => {
  filename = allRunsJSON[0];
  getAndSetLocal(filename, lapNum, lapCallback, (error) =>
    console.error(error)
  );
};

getAllRuns(allRunsCallback, (error) => console.error(error));
