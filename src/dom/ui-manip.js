import { format, parse } from "date-fns";

const spinnerContainer = document.getElementById("all");
const detailsContainer = document.getElementById("heading");
const buttonContainer = document.getElementById("select-button");
const racesContainer = document.getElementById("select-race");
const lapDetailsContainer = document.getElementById("lap-details");
const nextPageButtons = document.getElementById("nextpage");

const buttons = [];
let button;

export default function addLapButton(btnNum, runsJSON) {
  button = document.createElement("button");

  button.id = `${btnNum}`;
  button.innerHTML = `
  <div>
    Lap ${btnNum}: Time: 
    ${runsJSON.lapSummaries[btnNum - 1]["time lap"] / 1000}s - 
    Max Speed: ${runsJSON.lapSummaries[btnNum - 1]["Max Speed GPS"] / 10}km/h
  </div>
  `;

  buttonContainer.appendChild(button);
  buttons.push(button);

  return button;
}

let spinner;

export function showSpinner() {
  if (spinnerContainer) {
    spinnerContainer.style = `opacity: 0.7;`;
    spinner = document.createElement("div");
    spinner.id = "spinner";
    spinner.innerHTML = `<svg stroke="rgb(46, 120, 240)" fill="rgb(46, 120, 240)" stroke-width="0" viewBox="0 0 16 16" height="100px" width="100px" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.917 7A6.002 6.002 0 0 0 2.083 7H1.071a7.002 7.002 0 0 1 13.858 0h-1.012z"></path>
    </svg>
    <style>
      #spinner{
        top: calc(50% - 4rem);
        right: calc(50% - 3rem);
        z-index:100;
        position: absolute;
        animation: spin 2s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>`;

    spinnerContainer.appendChild(spinner);
  }

  if (racesContainer) {
    racesContainer.style = `display:none`;
  }

  if (nextPageButtons) {
    nextPageButtons.style = `display:none;`;
  }

  if (buttons.length >= 1) {
    for (button in buttons) {
      buttons[button].disabled = true;
    }
  }
}

export function hideSpinner() {
  if (spinnerContainer) {
    spinnerContainer.style = `opacity: 1.0;`;
    spinnerContainer.removeChild(document.getElementById("spinner"));
  }

  if (racesContainer) {
    racesContainer.style = ``;
  }

  if (nextPageButtons) {
    nextPageButtons.style = ``;
  }
  if (buttons.length >= 1) {
    for (button in buttons) {
      buttons[button].disabled = false;
    }
  }
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
  anchorContainer.href = "../selectLap/";
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
