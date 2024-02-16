// Get all sessions
export default function getAllRuns(callback, errorCallback) {
  fetch(`https://go-kart-api.onrender.com/runs`)
    .then((response) => response.json())
    .then((res) => {
      callback(res);
    })
    .catch((error) => errorCallback(error))
    .finally(() => console.log("All done"));
}

//Get all laps per session
export function getAllLapsPerRun(filename, callback, errorCallback) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/`)
    .then((response) => response.json())
    .then((res) => {
      callback(res);
    })
    .catch((error) => errorCallback(error))
    .finally(() => console.log("All done"));
}

// Get by Lap
export function getLap(filename, lapNum, callback, errorCallback) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNum}`)
    .then((response) => response.json())
    .then((res) => {
      callback(res);
    })
    .catch((error) => errorCallback(error))
    .finally(() => console.log("All done"));
}
