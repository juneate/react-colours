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
function Palette() {
    return (
      <ul class="palette">
        <Colour red={255} green={0} blue={0} />
        <Colour red={0} green={255} blue={0} />
        <Colour red={0} green={0} blue={255} />
      </ul>
    );
}

// Create an instance of the Palette Component, put it into "#app" (index.html)
ReactDOM.render(<Palette />, document.getElementById('app') );