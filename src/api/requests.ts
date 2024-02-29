import { IKartLapsPerRun, ILapDataset } from "../models/go-kart-types";

//Get all sessions
// export default function getAllRuns(
//   callback: (allRunsJSON: string[]) => void,
//   errorCallback: (error: Error) => void,
//   finallyCallback?: () => void,
// ) {
//   fetch(`https://go-kart-api.onrender.com/runs`)
//     .then((response) => response.json())
//     .then((res: string[]) => {
//       if (!res) {
//         errorCallback(new Error("Cannot find Run"));
//       } else {
//         callback(res);
//       }
//     })
//     .catch((error: Error) => errorCallback(error))
//     .finally(() => {
//       if (finallyCallback) finallyCallback();
//     });
// }

// export const signalNewFetchRequest = new Subject<null>();

// export const resultSetSubject =
//   signalNewFetchRequest
//     .pipe(
//       switchMap(
//         () => fromFetch('https://go-kart-api.onrender.com/runs')
//           .pipe(
//             switchMap(res => fromPromise(res.json())),
//             // switchMap(res => fromFetch(res.hour1)),
//             // switchMap(res => fromPromise(res.json())),
//             map((json: TODOEntry[]) => ({
//               result: json.map(todo => `${todo.id}: ${todo.title} ${todo.completed ? '👍🏻' : '👎🏻'}`)
//             })),
//             catchError(error => {
//               console.error('JSON Parse Fail', error);
//               return EMPTY;
//             })
//           )
//       )
//     );

//Get all laps per session
export function getAllLapsPerRun(
  filename: string,
  callback: (runsJSON: IKartLapsPerRun) => void,
  errorCallback: (error: Error) => void,
  finallyCallback?: () => void,
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
      if (finallyCallback) finallyCallback();
    });
}

// Get by Lap
export function getLap(
  filename: string,
  lapNum: number,
  callback: (lapJSON: ILapDataset) => void,
  errorCallback: (error: Error) => void,
  finallyCallback?: () => void,
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
      if (finallyCallback) finallyCallback();
    });
}
