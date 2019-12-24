import React from "react";
import { fromEvent } from "rxjs";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  let [clicks, setClick] = React.useState(0);
  let [x, setX] = React.useState(0);
  let [y, setY] = React.useState(0);

  const click$ = fromEvent<MouseEvent>(document, "click").subscribe(event =>
    setClick((clicks += 1))
  );

  const mouse$ = fromEvent<MouseEvent>(document, "mousemove").subscribe(
    event => {
      setX(event.x);
      setY(event.y);
    }
  );

  click$.add();
  mouse$.add();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          X: {x} Y: {y}
        </p>
        <p style={{ fontSize: 36 }}>{clicks}</p>
      </header>
    </div>
  );
};

export default App;
