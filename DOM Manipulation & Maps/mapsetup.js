let map = L.map("map");
let circles = L.layerGroup();
let circle = L.circle();

export default function generateMap(lat, long) {
  map = map.setView([lat, long], 17);

  let mapLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

export function putCircle(lat, long) {
  circle = L.circle([lat, long], {
    color: "obsidian",
    fillColor: "rgb(46, 120, 240)",
    fillOpacity: 1,
    radius: 1,
  });

  circles.addLayer(circle);
  circles.addTo(map);
}

export function cleanMap() {
  circles.clearLayers();
}
