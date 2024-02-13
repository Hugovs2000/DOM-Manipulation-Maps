import './style.css'

let map = L.map('map').setView([-29.697411, 30.525229], 13);

// Add a marker on the map
let marker = L.marker([51.5, -0.09]).addTo(map);

// Show map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 18,
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add circle to map
let circle = L.circle([-29.697411, 30.5252299], {
  color: 'blue',
  fillColor: 'blue',
  fillOpacity: 1,
  radius: 1
}).addTo(map);

let circle2 = L.circle([-29.697434, 30.525509], {
  color: 'green',
  fillColor: 'green',
  fillOpacity: 1,
  radius: 1
}).addTo(map);