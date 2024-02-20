import getAllRuns, { getAllLapsPerRun } from "../api/requests";
import "./races.scss";

let filename;
let trackName;

const buttonContainer = document.getElementById("select-race");

const kartingRunCallback = (runsJSON) => {
  const button = document.createElement("a");
  trackName = runsJSON.trackName;
  button.href = "../selectLap/laps.html";
  button.style = `
  background-color: whitesmoke;
  color: rgb(46, 120, 240);
  padding: 15px;
  border: 5px solid rgb(46, 120, 240);
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  `;
  button.innerText = `${trackName}`;
  buttonContainer.appendChild(button);
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
