// NOTE TO STUDENTS: this document should be read bottom-up

// Include "useState" as part of this project
const { useState } = React;

// Component: controls a single Channel of each swatch (R, G or B)
function Channel(props) {
    let rgbNum = props.rgb;         // Defines rgbNum
    
    const updateRgb = (channel) => {
      if( channel >= 0 && channel <= 255 ) {
        rgbNum = channel;
        props.handleOnChange(rgbNum);
      }
    }

    return (
        <div class="channel">
            <button type="button" class="btn up" onClick={e => updateRgb(rgbNum + 10)}>+</button>
            <input type="text" class="txt" value={rgbNum} onChange={e => updateRgb( e.target.value )} />
            <button type="button" class="btn down" onClick={e => updateRgb(rgbNum - 10)}>-</button>
        </div>
    );
}

// Component: a Colour (swatch) row inside of a palette column
function Colour(props) {

    const [r, setR] = useState(props.red);
    const [g, setG] = useState(props.green);
    const [b, setB] = useState(props.blue);

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
}

// Component: a single colour Palette column
function Palette(props) {

    const allSwatches = props.swatches.map(
      (swatch, i) => 
        <Colour key={i} red={swatch.r} green={swatch.g} blue={swatch.b} />
    );

    return (
      <ul class="palette">
        { allSwatches }
      </ul>
    );
}

function App() {

  const startingData = [
    {r: 255, g: 0, b: 255},
    {r: 255, g: 255, b: 0},
    {r: 0, g: 255, b: 255},
    {r: 255, g: 123, b: 0},
  ];

  return (
    <Palette swatches={startingData} />
  );
}


// Create an instance of the Palette Component, put it into "#app" (index.html)
ReactDOM.render(<App />, document.getElementById('app') );