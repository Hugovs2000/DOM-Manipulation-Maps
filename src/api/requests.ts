import { IKartLapsPerRun, ILapDataset } from "../models/go-kart-types";

// Get all sessions
export default function getAllRuns(
  callback: (allRunsJSON: string[]) => void,
  errorCallback: (error: Error) => void,
  finallyCallback: (() => void) | undefined = undefined
) {
  fetch(`https://go-kart-api.onrender.com/runs`)
    .then((response) => response.json())
    .then((res: string[]) => {
      if (!res) {
        errorCallback(new Error("Cannot find Run"));
      } else {
        callback(res);
      }
    })
    .catch((error: Error) => errorCallback(error))
    .finally(() => {
      if (finallyCallback) finallyCallback();
    });
}

//Get all laps per session
export function getAllLapsPerRun(
  filename: string,
  callback: (runsJSON: IKartLapsPerRun) => void,
  errorCallback: (error: Error) => void,
  finallyCallback: () => void
) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/`)
    .then((response) => response.json())
    .then((res: IKartLapsPerRun) => {
      if (!res?.lapSummaries) {
        errorCallback(new Error("Cannot find Lap"));
      } else {
        callback(res);
      }
    })
    .catch((error: Error) => errorCallback(error))
    .finally(() => {
      finallyCallback();
    });
}

// Get by Lap
export function getLap(
  filename: string,
  lapNum: number,
  callback: (lapJSON: ILapDataset) => void,
  errorCallback: (error: Error) => void,
  finallyCallback: () => void
) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNum}`)
    .then((response) => response.json())
    .then((res: ILapDataset) => {
      if (!res) {
        errorCallback(new Error("Cannot get Lap"));
      } else {
        callback(res);
      }
    })
    .catch((error: Error) => errorCallback(error))
    .finally(() => {
      finallyCallback();
    });
}
