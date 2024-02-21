import getAllRuns, { getAllLapsPerRun } from "../api/requests";
import "./races.scss";

let filename;
let trackName;

const racesContainer = document.getElementById("select-race");

const kartingRunCallback = (runsJSON) => {
  if (
    !(
      runsJSON?.trackName ||
      runsJSON?.driver ||
      runsJSON?.sessionName ||
      runsJSON?.date ||
      runsJSON?.time ||
      runsJSON?.lapSummaries[0]
    )
  ) {
    return;
  }

  const anchorContainer = document.createElement("a");
  anchorContainer.href = "../selectLap/laps.html";
  anchorContainer.style = `
    text-decoration: none;
    width: 300px;
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

  divContainer.innerHTML = `
    <h2>${runsJSON.trackName}</h2><h4 id='session'>(${runsJSON.sessionName})</h4><br>
    <h3>Racer: ${runsJSON.driver}</h3><br>
    <h4>Date: ${runsJSON.date} ${runsJSON.time}</h4><br>
    <h3 id='laps'>${runsJSON.lapSummaries.length} Laps</h3>
  `;

  anchorContainer.appendChild(divContainer);
  racesContainer.appendChild(anchorContainer);
};

const allKartingRunsCallback = (allRunsJSON) => {
  if (!allRunsJSON?.[0]) {
    throw new Error("Cannot find filename");
  }
  filename = allRunsJSON[0];
  getAllLapsPerRun(filename, kartingRunCallback, (error) =>
    console.error(error)
  );
};

getAllRuns(allKartingRunsCallback, (error) => console.error(error));
