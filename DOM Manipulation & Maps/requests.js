export default function getAndSetLocal(lapNum, callback, errorCallback) {
  fetch(
    `https://go-kart-api.onrender.com/runs/SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json/laps/${lapNum}`
  )
    .then((response) => response.json())
    .then((res) => {
      callback(res);
    })
    .catch((error) => errorCallback(error))
    .finally(() => console.log("All done"));
}
