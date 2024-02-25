import {
  Circle,
  LatLngExpression,
  LayerGroup,
  Map,
  Polyline,
  TileLayer,
} from "leaflet";
import { ILapDataset } from "../models/go-kart-types";
import { lapTimer, stopTimer } from "../utility/timer";

let map = new Map("map");
const circles: LayerGroup = new LayerGroup([]);
const initialLatLng: LatLngExpression = [-29.697911, 30.525229];
let circle = new Circle(initialLatLng);

const polylines: LayerGroup = new LayerGroup([]);
let latlngs: LatLngExpression[] = [];

export default function generateMap(lat: number, long: number) {
  map.setView([lat, long], 18);

  new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export function addLatLng(lat: number, long: number) {
  latlngs.push([lat, long]);
}

export function drawPolyline() {
  const polyline = new Polyline(latlngs, {
    color: "purple",
  });

  polylines.addLayer(polyline);
  polylines.addTo(map);
}

export function putCircle(lat: number, long: number) {
  circle = new Circle([lat, long], {
    color: "rgb(46, 120, 240)",
    fillColor: "rgb(46, 120, 240)",
    fillOpacity: 1,
    radius: 3,
  });

  circles.addLayer(circle);
  circles.addTo(map);
}

export function removeLayers() {
  circles.clearLayers();
  polylines.clearLayers();
}

export function clearLatLngs() {
  latlngs = [];
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

    removeLayers();
    addLatLng(lat, long);
    drawPolyline();
    putCircle(lat, long);

    if (counter < lapJSON.dataSet.length - 1) {
      counter += 1;
    } else {
      stopTimer();
    }
  });
}
