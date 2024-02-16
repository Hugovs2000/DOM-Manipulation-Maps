let map = L.map("map");
export default function generateMap(lat, long) {
  map = map.setView([lat, long], 17);

  let mapLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}
let circles = 0;
export function putCircle(lat, long) {
  let circle = L.circle([lat, long], {
    color: "obsidian",
    fillColor: "blue",
    fillOpacity: 1,
    radius: 1,
  });

  circles = L.layerGroup([circle]).addTo(map);
}

export function cleanMap() {}
