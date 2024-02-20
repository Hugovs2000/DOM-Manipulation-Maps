import { hideSpinner, showSpinner } from "../dom/ui-manip";

// Get all sessions
export default function getAllRuns(callback, errorCallback) {
  showSpinner();
  fetch(`https://go-kart-api.onrender.com/runs`)
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        throw new Error("Cannot find Run");
      }
      callback(res);
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
        throw new Error("Cannot find Laps for Run");
      }
      callback(res);
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
      callback(res);
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      console.log(`Got Lap: ${lapNum}`);
      hideSpinner();
    });
}
