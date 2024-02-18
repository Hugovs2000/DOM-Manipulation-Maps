const detailsContainer = document.getElementById("heading");
const buttonContainer = document.getElementById("select-button");

export default function addButton(button, btnNum) {
  button.id = `${btnNum}`;
  button.textContent = `${btnNum}`;

  buttonContainer.appendChild(button);
}

export function addLapDetails(runsJSON, lapNum) {
  detailsContainer.id = "details";
  detailsContainer.innerHTML = `${runsJSON.trackName}:<br />${runsJSON.driver} - Lap : ${lapNum}`;
}
