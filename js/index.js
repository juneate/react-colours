// Include "useState" as part of this project
const { useState } = React;

function Channel(props) {
    let [rgbNum, setRgb] = useState(props.rgb);
    const increaseValue = () => setRgb(rgbNum + 1);
    const decreaseValue = () => setRgb(rgbNum - 1);
    const changeValue = ({target}) => setRgb(Number(target.value));

    return (
        <div class="channel">
            <button type="button" class="btn up" onClick={increaseValue}>+</button>
            <input type="text" class="txt" value={rgbNum} onChange={changeValue} />
            <button type="button" class="btn down" onClick={decreaseValue}>-</button>
        </div>
    );
}

function Colour(props) {
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
}

function Palette() {
    return (
      <ul class="palette">
        <Colour red={255} green={0} blue={0} />
        <Colour red={0} green={255} blue={0} />
        <Colour red={0} green={0} blue={255} />
      </ul>
    );
}

ReactDOM.render(<Palette />, document.getElementById('app') );