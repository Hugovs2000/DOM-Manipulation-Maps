// Get all sessions
export default function getAllRuns(callback, errorCallback, finallyCallback) {
  fetch(`https://go-kart-api.onrender.com/runs`)
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        errorCallback(new Error("Cannot find Run"));
      } else {
        callback(res);
      }
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      finallyCallback();
    });
}

//Get all laps per session
export function getAllLapsPerRun(
  filename,
  callback,
  errorCallback,
  finallyCallback
) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/`)
    .then((response) => response.json())
    .then((res) => {
      if (!res?.lapSummaries) {
        errorCallback(new Error("Cannot find Lap"));
      } else {
        callback(res);
      }
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      finallyCallback();
    });
}

// Get by Lap
export function getLap(
  filename,
  lapNum,
  callback,
  errorCallback,
  finallyCallback
) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNum}`)
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        errorCallback(new Error("Cannot get Lap"));
      } else {
        callback(res);
      }
    })
    .catch((error) => errorCallback(error))
    .finally(() => {
      finallyCallback();
    });
}
