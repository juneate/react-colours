// NOTE TO STUDENTS: this document should be read bottom-up

// Include "useState" as part of this project
const { useState, useContext } = React;

// Create a Context "Store"
const ColourContext = React.createContext({});

// Component: controls a single Channel of each swatch (R, G or B)
const Channel = (props) => {
    let rgbNum = props.rgb;         // Defines rgbNum
    
    const updateRgb = (channel) => {
      if( channel >= 0 && channel <= 255 ) {
        rgbNum = channel;
        props.handleOnChange(rgbNum);
      }
    }

    return (
        <div class="channel">
            <button type="button" class="btn up" onClick={e => updateRgb(rgbNum + 5)}>+</button>
            <input type="text" class="txt" value={rgbNum} onChange={e => updateRgb( e.target.value )} />
            <button type="button" class="btn down" onClick={e => updateRgb(rgbNum - 5)}>-</button>
        </div>
    );
};

// Component: a Colour (swatch) row inside of a palette column
const Colour = (props) => {

    const [r, setR] = useState(props.red);
    const [g, setG] = useState(props.green);
    const [b, setB] = useState(props.blue);

    // Make the Colour Component a "consumer" of the ColourContext data
    // useContext retuns the "value" from the ColourContext store
    let colourData = useContext(ColourContext);
    
    // update the "index" from the dataset that matches the index of this colour swatch
    colourData.data[props.index] = {r: r, g: g, b: b};

    // Now update the "database"
    colourData.update();
    
    console.log(`New colour is: rgb(${r},${g},${b})`)

    // Define a background-color for the swatch
    const myStyles = {
        backgroundColor: `rgb(${r},${g},${b})`
    }

    return (
        <li class="colour" style={myStyles}>
          <div>rgb(</div>
            <Channel rgb={r} handleOnChange={setR} />
            <Channel rgb={g} handleOnChange={setG} />
            <Channel rgb={b} handleOnChange={setB} />
          <div>);</div>
        </li>
    );
};

// Component: a single colour Palette column
const Palette = (props) => {

    // Add an "index" to the Colour component so we know which item it is from the dataset
    const allSwatches = props.swatches.map(
      (swatch, i) => 
        <Colour key={i} index={i} red={swatch.r} green={swatch.g} blue={swatch.b} />
    );

    return (
      <ul class="palette">
        { allSwatches }
      </ul>
    );
};

function App() {

  // Some default swatches
  const defaultData = [
    {r: 255, g: 0, b: 255},
    {r: 255, g: 255, b: 0},
    {r: 0, g: 255, b: 255},
  ];

  // Either pull some data from our localStorage, OR just use the "defaultData" above
  const startingData = JSON.parse(localStorage.getItem('colours')) || defaultData;

  // A new function used to update the database
  const updateLocalStorage = () => {
    console.log(`Time to update the database!`);
  
    // Access our local "Context" store
    let colourData = useContext(ColourContext);
    
    // Use the data to set a string version of our app to the browser
    localStorage.setItem('colours', JSON.stringify(colourData.data));
  };
  
  // What two things do we want to store globally to the Provider? Put them in an object
  let theData = { data:startingData, update:updateLocalStorage };

  // Wrap the App in a "Provider", pass it the values you need to share
  return (
    <ColourContext.Provider value={theData}>
      <Palette swatches={startingData} />
    </ColourContext.Provider>
  );
}


// Create an instance of the Palette Component, put it into "#app" (index.html)
ReactDOM.render(<App />, document.getElementById('app') );