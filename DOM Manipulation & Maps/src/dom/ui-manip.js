const spinnerContainer = document.getElementById("all");
const detailsContainer = document.getElementById("heading");
const buttonContainer = document.getElementById("select-button");

export default function addButton(button, btnNum) {
  button.id = `${btnNum}`;
  button.textContent = `${btnNum}`;

  buttonContainer.appendChild(button);
}

export function showSpinner() {
  spinnerContainer.style = `opacity: 0.7;`;
}

export function hideSpinner() {
  spinnerContainer.style = `opacity: 1.0;`;
}

export function addLapDetails(runsJSON, lapNum) {
  detailsContainer.id = "details";
  detailsContainer.innerHTML = `${runsJSON.trackName}:<br />${runsJSON.driver} - Lap : ${lapNum}`;
}
