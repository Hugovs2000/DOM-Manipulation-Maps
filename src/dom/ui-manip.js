import { format, parse } from "date-fns";

const spinnerContainer = document.getElementById("all");
const detailsContainer = document.getElementById("heading");
const buttonContainer = document.getElementById("select-button");
const racesContainer = document.getElementById("select-race");
const lapDetailsContainer = document.getElementById("lap-details");

export default function addLapButton(btnNum, runsJSON) {
  const button = document.createElement("button");

  button.id = `${btnNum}`;
  button.innerHTML = `
  <div>
    Lap ${btnNum}: Time: 
    ${runsJSON.lapSummaries[btnNum - 1]["time lap"] / 1000}s - 
    Max Speed: ${runsJSON.lapSummaries[btnNum - 1]["Max Speed GPS"] / 10}km/h
  </div>
  `;

  buttonContainer.appendChild(button);

  return button;
}

export function showSpinner() {
  spinnerContainer.style = `opacity: 0.7;`;
}

export function hideSpinner() {
  spinnerContainer.style = `opacity: 1.0;`;
}

export function addHeaderDetails(runsJSON, lapNum) {
  detailsContainer.id = "details";
  detailsContainer.innerHTML = `${runsJSON.trackName}:<br />${runsJSON.driver} - Lap ${lapNum}`;
}

export function addLapDetails(runsJSON, lapNum) {
  lapDetailsContainer.innerHTML = `

    <h3>Lap:  <span>${lapNum}</span></h3>
    <h3>Max speed:  <span>${
      runsJSON.lapSummaries[lapNum - 1]["Max Speed GPS"] / 10
    }km/h </span></h3>
    <h3>Min speed: <span>${
      runsJSON.lapSummaries[lapNum - 1]["Min Speed GPS"] / 10
    }km/h</span></h3>
    <h3>Total Time:  <span>${
      runsJSON.lapSummaries[lapNum - 1]["time lap"] / 1000
    }s </span></h3>
    <h3>Sector 1:  <span>${
      runsJSON.lapSummaries[lapNum - 1]["time partiel 1"] / 1000
    }s </span></h3>
    <h3>Sector 2:  <span>${
      runsJSON.lapSummaries[lapNum - 1]["time partiel 2"] / 1000
    }s </span></h3>
    <h3>Sector 3:  <span>${
      runsJSON.lapSummaries[lapNum - 1]["time partiel 3"] / 1000
    }s </span></h3>
`;
}

export function createRaceCard(runsJSON) {
  const anchorContainer = document.createElement("a");
  anchorContainer.href = "../selectLap/laps.html";
  anchorContainer.style = `
    text-decoration: none;
    width: 250px;
    display:flex;
    align-itmes: center;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 0 10px 0px gray;
  `;

  const divContainer = document.createElement("div");
  divContainer.style = `
    background-color: aliceblue;
    color: rgb(46, 120, 240);
    padding: 1rem;
    border: 5px solid rgb(46, 120, 240);
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    width: 100%;
    display:flex;
    flex-flow: column nowrap;
    align-itmes: center;
  `;

  let newDate = format(
    parse(runsJSON.date + " " + runsJSON.time, "dd-MM-yyyy HH:mm", new Date()),
    "MMM dd yyyy - hh:mm a"
  );

  divContainer.innerHTML = `
    <h2>${runsJSON.trackName}</h2><h4 id='date'>${newDate}</h4><br>
    <h3>Racer: ${runsJSON.driver}</h3><br>
    <h3>Session: ${runsJSON.sessionName}</h3><br>
    <h3 id='laps'>${runsJSON.lapSummaries.length} Laps</h3>
  `;

  anchorContainer.appendChild(divContainer);
  racesContainer.appendChild(anchorContainer);
}
