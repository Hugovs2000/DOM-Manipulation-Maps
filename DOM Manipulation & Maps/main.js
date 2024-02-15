import generateMap, { putCircle } from "./mapsetup";
import getAndSetLocal from "./requests";
import "./style.css";

let map = generateMap(-29.697411, 30.525229);

const handleCallback = (resJSON) => {
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
  console.log(resJSON);
};

let lapNum = 1;

getAndSetLocal(lapNum, handleCallback, (error) => console.error(error));
