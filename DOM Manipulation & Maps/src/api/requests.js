import { hideSpinner, showSpinner } from "../dom/ui-manip";

// Get all sessions
export default function getAllRuns(callback, errorCallback) {
  showSpinner();
  fetch(`https://go-kart-api.onrender.com/runs`)
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        errorCallback(new Error("cannot find Run"));
      } else {
        callback(res);
      }
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      console.log("Got All Runs");
      hideSpinner();
    });
}

//Get all laps per session
export function getAllLapsPerRun(filename, callback, errorCallback) {
  showSpinner();
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/`)
    .then((response) => response.json())
    .then((res) => {
      if (!res?.lapSummaries) {
        errorCallback(new Error("Cannot find lap"));
      } else {
        callback(res);
      }
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      console.log("Got all the Laps per Run");
      hideSpinner();
    });
}

// Get by Lap
export function getLap(filename, lapNum, callback, errorCallback) {
  showSpinner();
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNum}`)
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        errorCallback(new Error("Cannot get lap"));
      } else {
        callback(res);
      }
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      console.log(`Got Lap: ${lapNum}`);
      hideSpinner();
    });
}
