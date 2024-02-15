export default function generateMap(lat, long) {
  let map = L.map("map").setView([lat, long], 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  return map;
}

export function putCircle(map, lat, long) {
  let circle = L.circle([lat, long], {
    color: "obsidian",
    fillColor: "blue",
    fillOpacity: 1,
    radius: 1,
  }).addTo(map);
}
