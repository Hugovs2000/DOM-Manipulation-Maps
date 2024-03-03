import { CircleMarker, Map, Polyline, TileLayer } from "leaflet";
import { ILapDataset } from "../models/go-kart-types";
import { lapTimer, stopTimer } from "../utility/timer";

let map = new Map("map");

let circle = new CircleMarker([0, 0], {
  fillOpacity: 1,
  radius: 5,
}).addTo(map);

let polyline = new Polyline([], {
  color: "purple",
}).addTo(map);

export default function generateMap(lat: number, long: number) {
  map.setView([lat, long], 18);

  new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export function drawPolyline(lat: number, long: number) {
  polyline.addLatLng([lat, long]);
}

export function moveCircle(lat: number, long: number) {
  circle.setLatLng([lat, long]);
  circle.redraw();
  circle.bringToFront();
}

export function removePolyline() {
  polyline.remove();
  polyline = new Polyline([], {
    color: "purple",
  }).addTo(map);
}

export function animateLap(lapJSON: ILapDataset) {
  let counter = 0;

  lapTimer(() => {
    if (
      !(
        lapJSON?.dataSet?.[counter]?.["Lat."] ||
        lapJSON?.dataSet?.[counter]?.["Lon."]
      )
    ) {
      return;
    }

    let long = lapJSON.dataSet[counter]["Lon."] * 0.000001;
    let lat = lapJSON.dataSet[counter]["Lat."] * 0.000001;

    drawPolyline(lat, long);
    moveCircle(lat, long);

    if (counter < lapJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      stopTimer();
    }
  });
}
