import { EMPTY, ReplaySubject, catchError, mergeMap, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { fromPromise } from "rxjs/internal/observable/innerFrom";
import { IKartLapsPerRun, ILapDataset } from "../models/go-kart-types";

export const signalNewFilenameRequest$ = new ReplaySubject<void>(1);
export const signalNewLapsPerRunRequest$ = new ReplaySubject<string>(1);
export const signalNewLapRequest$ = new ReplaySubject<{
  fileName: string;
  lapNum: number;
}>(1);

export const allFilesSubject$ = signalNewFilenameRequest$.pipe(
  switchMap(() =>
    fromFetch("https://go-kart-api.onrender.com/runs").pipe(
      switchMap((res) => fromPromise<string[]>(res.json())),
      catchError((error) => {
        console.error("JSON Parse Fail", error);
        return EMPTY;
      }),
    ),
  ),
);

export const runSummarySubject$ = signalNewLapsPerRunRequest$.pipe(
  mergeMap((filename) =>
    fromFetch(`https://go-kart-api.onrender.com/runs/${filename}/`).pipe(
      switchMap((res) => fromPromise<IKartLapsPerRun>(res.json())),
      catchError((error) => {
        console.error("JSON Parse Fail", error);
        return EMPTY;
      }),
    ),
  ),
);

export const lapSummarySubject$ = signalNewLapRequest$.pipe(
  mergeMap(({ fileName, lapNum }) =>
    fromFetch(
      `https://go-kart-api.onrender.com/runs/${fileName}/laps/${lapNum}`,
    ).pipe(
      switchMap((res) => fromPromise<ILapDataset>(res.json())),
      catchError((error) => {
        console.error("JSON Parse Fail", error);
        return EMPTY;
      }),
    ),
  ),
);
