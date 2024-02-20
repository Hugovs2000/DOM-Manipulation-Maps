let map = L.map("map");
let circles = L.layerGroup();
let circle = L.circle();

let polylines = L.layerGroup();
let latlngs = [];

export default function generateMap(lat, long) {
  map = map.setView([lat, long], 18);

  let mapLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export function addLatLng(lat, long) {
  latlngs.push([lat, long]);
}

export function drawPolyline() {
  let polyline = L.polyline(latlngs, {
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

export function cleanMap() {
  latlngs = [];
}
