import { format, parse } from "date-fns";
import { IKartLapsPerRun } from "../models/go-kart-types";

const spinnerContainer = document.getElementById("all");
const detailsContainer = document.getElementById("heading");
const buttonContainer = document.getElementById("select-button");
const racesContainer = document.getElementById("select-race");

const buttons: HTMLButtonElement[] = [];
let button: HTMLButtonElement;

export default function addLapButton(
  btnNum: number,
  runsJSON: IKartLapsPerRun,
) {
  button = document.createElement("button");

  button.id = `${btnNum}`;
  button.className =
    "h-[47px] w-full bg-blue-400 border-t-[1px] border-slate-50 text-base flex justify-start items-center";
  button.innerHTML = `
  <div class="m-4 flex items-center justify-start md:w-full">
    Lap ${btnNum}: Time: ${runsJSON.lapSummaries[btnNum - 1]["time lap"] / 1000}s - Max Speed: ${runsJSON.lapSummaries[btnNum - 1]["Max Speed GPS"] / 10}km/h
  </div>
  `;
  if (buttonContainer) {
    buttonContainer.appendChild(button);
  }
  buttons.push(button);

  return button;
}

let spinner: HTMLDivElement;

export function showSpinner() {
  if (spinnerContainer) {
    spinnerContainer.setAttribute("style", `opacity: 0.7;`);
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
    racesContainer.setAttribute("style", `display:none`);
  }

  if (buttons.length >= 1) {
    for (const button in buttons) {
      buttons[button].disabled = true;
    }
  }
}

export function hideSpinner() {
  if (spinnerContainer) {
    spinnerContainer.setAttribute("style", `opacity: 1.0;`);
    const spinnerElement = document.getElementById("spinner");
    if (spinnerElement) {
      spinnerContainer.removeChild(spinnerElement);
    }
  }

  if (racesContainer) {
    racesContainer.setAttribute("style", ``);
  }

  if (buttons.length >= 1) {
    for (const button in buttons) {
      buttons[button].disabled = false;
    }
  }
}

export function addHeaderDetails(
  runsJSON: { trackName: string; driver: string },
  lapNum: number,
) {
  if (detailsContainer) {
    detailsContainer.innerHTML = `${runsJSON.trackName}:<br />${runsJSON.driver} - Lap ${lapNum}`;
  }
}

export function createRaceCard(runsJSON: IKartLapsPerRun) {
  const anchorContainer = document.createElement("a");
  anchorContainer.id = `${runsJSON.filename}`;
  anchorContainer.href = "../selectLap/";
  anchorContainer.className =
    "w-60 flex items-center justify-center rounded-xl";

  const divContainer = document.createElement("div");
  divContainer.className =
    "flex flex-col flex-nowrap items-center bg-blue-50 text-blue-600 p-4 border-4 border-blue-600 rounded-xl text-center w-full transition-all ease-in-out shadow-std hover:scale-105 hover:shadow-blue-600";

  let newDate = format(
    parse(runsJSON.date + " " + runsJSON.time, "dd-MM-yyyy HH:mm", new Date()),
    "MMM dd yyyy - hh:mm a",
  );

  divContainer.innerHTML = `
    <div class="flex justify-center m-0 text-2xl">
      ${runsJSON.trackName}
    </div>
    <div class="w-full pt-1 px-0 pb-4 text-base flex justify-center border-b-2 border-blue-600">
      ${newDate}
    </div>
    <div class="flex flex-col gap-4 mt-4 w-full text-left text-lg">
      <span>
        Racer: ${runsJSON.driver}
      </span>
      <span>
        Session: ${runsJSON.sessionName}
      </span>
      <span>
        Laps: ${runsJSON.lapSummaries.length} 
      </span>
    </div>
  `;

  anchorContainer.appendChild(divContainer);

  if (racesContainer) {
    racesContainer.appendChild(anchorContainer);
  }
  const myButton = document.getElementById(`${runsJSON.filename}`);
  myButton?.addEventListener("click", () => {
    localStorage.setItem("Passed Filename", runsJSON.filename);
  });
}

export function toggleActiveButton(id: string) {
  const allButtons = document.querySelectorAll("button");

  for (const button of allButtons) {
    if (id === button.id) {
      button.classList.add("bg-blue-700");
    } else {
      button.classList.remove("bg-blue-700");
    }
  }
}
const mapContainer = document.getElementById("map-container");

export function createReplayButton() {
  const replayButton = document.createElement("button");

  replayButton.id = "reset-button";
  replayButton.className =
    "absolute right-[6.2rem] top-2.5 z-[1] rounded-xl border-2 border-slate-50 bg-blue-600 p-2 text-slate-50 shadow-std transition-all ease-in-out hover:scale-110 hover:shadow-blue-600 md:right-[9rem] md:top-6 md:p-3 md:text-base";
  replayButton.innerHTML = "Replay";
  if (mapContainer) {
    mapContainer.appendChild(replayButton);
    return replayButton;
  }
}

export function removeReplayButton() {
  if (mapContainer) {
    const checkReplayButton = document.getElementById("reset-button");
    if (checkReplayButton) {
      mapContainer.removeChild(checkReplayButton);
    }
  }
}

export function addShadowDom(
  runsJSON: IKartLapsPerRun,
  lapNum: number,
  target: string,
) {
  const lapDetails = document.createElement("lap-details");
  lapDetails.setAttribute("lap", `${lapNum}`);
  lapDetails.setAttribute(
    "max-speed",
    `${runsJSON.lapSummaries[lapNum - 1]["Max Speed GPS"] / 10}`,
  );
  lapDetails.setAttribute(
    "min-speed",
    `${runsJSON.lapSummaries[lapNum - 1]["Min Speed GPS"] / 10}`,
  );
  lapDetails.setAttribute(
    "total-time",
    `${runsJSON.lapSummaries[lapNum - 1]["time lap"] / 1000}`,
  );
  lapDetails.setAttribute(
    "sec1-time",
    `${runsJSON.lapSummaries[lapNum - 1]["time partiel 1"] / 1000}`,
  );
  lapDetails.setAttribute(
    "sec2-time",
    `${runsJSON.lapSummaries[lapNum - 1]["time partiel 2"] / 1000}`,
  );
  lapDetails.setAttribute(
    "sec3-time",
    `${runsJSON.lapSummaries[lapNum - 1]["time partiel 3"] / 1000}`,
  );

  document.querySelector(`${target}`)?.appendChild(lapDetails);
}

export function moreInfoDropdown(runsJSON: IKartLapsPerRun, lapNum: number) {
  const moreInfo = document.createElement("div");
  moreInfo.id = "more-info";
  moreInfo.className = "md:hidden absolute top-2.5 left-14 dropdown";
  moreInfo.innerHTML = `
  <div tabindex="0" role="button" class="rounded-xl border-2 border-slate-50 bg-blue-600 p-2 text-slate-50 shadow-std">More info</div>
  <div tabindex="0" class="dropdown-content top-14 z-[1] card card-compact w-64 p-2 shadow-std bg-blue-600 text-slate-50 border-2 border-slate-50">
    <div id="lap-details-card" class="card-body">
    </div>
  </div>
  `;
  if (mapContainer) {
    mapContainer.appendChild(moreInfo);

    addShadowDom(runsJSON, lapNum, "#lap-details-card");
  }
}

export function removeMoreInfo() {
  if (mapContainer) {
    const checkInfoButton = document.getElementById("more-info");
    if (checkInfoButton) {
      mapContainer.removeChild(checkInfoButton);
    }
  }
}
