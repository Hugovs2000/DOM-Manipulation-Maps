class LabDetails extends HTMLElement {
  static observedAttributes = [
    "lap",
    "max-speed",
    "min-speed",
    "total-time",
    "sec1-time",
    "sec2-time",
    "sec3-time",
  ];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
    <div id="lap-details">
        <div>
            Lap:  
            <span id="lap" class= "lap-details-span">
            </span>
        </div>
        <div>
            Max speed:  
            <span id="max-speed" class= "lap-details-span">
            </span>
        </div>
        <div>
            Min speed: 
            <span id="min-speed" class= "lap-details-span">
            </span>
        </div>
        <div>
            Total Time:  
            <span id="total-time" class= "lap-details-span">
            </span>
        </div>
        <div>
            Sector 1:  
            <span id="sec1-time" class= "lap-details-span">
            </span>
        </div>
        <div>
            Sector 2:  
            <span id="sec2-time" class= "lap-details-span">
            </span>
        </div>
        <div>
            Sector 3:  
            <span id="sec3-time" class= "lap-details-span">
            </span>
        </div>
    </div>
    <style>
        #lap-details {
            color: white;
            font-size: 1rem;
            display: flex;
            flex-flow: column nowrap;
            gap: 1rem;

            span{
                color: yellow;
                margin: 0rem 0.2rem;
                font-size: 1.1rem;
            }
        }
    </style>`;
  }

  attributeChangedCallback(name: string, _oldValue: null, newValue: number) {
    this.setTargetToValue(name, newValue);
  }

  setTargetToValue(name: string, value: number) {
    if (!this.shadowRoot) {
      return;
    }
    const target = this.shadowRoot.getElementById(name);

    if (!target) {
      return;
    }

    switch (name) {
      default:
        target.innerText = `${value}`;
        break;
      case "max-speed":
        target.innerText = `${value} km/h `;
        break;
      case "min-speed":
        target.innerText = `${value} km/h`;
        break;
      case "total-time":
        target.innerText = `${value}s`;
        break;
      case "sec1-time":
        target.innerText = `${value}s`;
        break;
      case "sec2-time":
        target.innerText = `${value}s`;
        break;
      case "sec3-time":
        target.innerText = `${value}s`;
        break;
    }
  }
}

customElements.define("lap-details", LabDetails);
