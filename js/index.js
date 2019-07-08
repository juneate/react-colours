// NOTE TO STUDENTS: this document should be read bottom-up

// Include "useState" as part of this project
const { useState } = React;

// Component: controls a single Channel of each swatch (R, G or B)
const Channel = (props) => {
    let [rgbNum, setRgb] = useState(props.rgb);         // Defines rgbNum as a state variable
    const increaseValue = () => setRgb(rgbNum + 1);     // Increase rgbNum by 1
    const decreaseValue = () => setRgb(rgbNum - 1);     // Decrease rgbNum by 1
    const changeValue = ({target}) => setRgb(Number(target.value));     // If the value in the box changes, update rgbNum

    return (
        <div class="channel">
            <button type="button" class="btn up" onClick={increaseValue}>+</button>
            <input type="text" class="txt" value={rgbNum} onChange={changeValue} />
            <button type="button" class="btn down" onClick={decreaseValue}>-</button>
        </div>
    );
};

// Component: a Colour (swatch) row inside of a palette column
const Colour = (props) => {
    // Define a background-color for the swatch
    const myStyles = {
        backgroundColor: `rgb(${props.red},${props.green},${props.blue})`
    }

    return (
        <li class="colour" style={myStyles}>
          <div>rgb(</div>
            <Channel rgb={props.red} />
            <Channel rgb={props.green} />
            <Channel rgb={props.blue} />
          <div>);</div>
        </li>
    );
};

// Component: a single colour Palette column
const Palette = () => {
    return (
      <ul class="palette">
        <Colour red={255} green={0} blue={0} />
        <Colour red={0} green={255} blue={0} />
        <Colour red={0} green={0} blue={255} />
      </ul>
    );
};

// Create an instance of the Palette Component, put it into "#app" (index.html)
ReactDOM.render(<Palette />, document.getElementById('app') );