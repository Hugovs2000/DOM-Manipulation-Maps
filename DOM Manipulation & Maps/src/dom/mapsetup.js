import { lapTimer, stopTimer } from "../utility/timer";

let map = L.map("map");
let circles = L.layerGroup();
let circle = L.circle();

let polylines = L.layerGroup();
let latlngs = [];

export default function generateMap(lat, long) {
  map = map.setView([lat, long], 18);

  const mapLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      minZoom: 1,
      maxZoom: 20,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  ).addTo(map);
}

export function addLatLng(lat, long) {
  latlngs.push([lat, long]);
}

export function drawPolyline() {
  const polyline = L.polyline(latlngs, {
    color: "purple",
  });

  polylines.addLayer(polyline);
  polylines.addTo(map);
}

export function putCircle(lat, long) {
  circle = L.circle([lat, long], {
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

export function animateLap(lapJSON) {
  let counter = 0;

  lapTimer(() => {
    if (
      !(
        lapJSON?.dataSet?.[counter]?.["Lat."] ||
        lapJSON?.dataSet?.[counter]?.["Lon."]
      )
    ) {
      throw new Error("Cannot find coordinates");
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
