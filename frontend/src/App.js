import React,{Component} from 'react';
import "./App.css";
import "./styles.css";
import TakeInput from "./takeInput";

class App extends Component{
render() {
  return (
    <div className="App" >
      <header className="App-header" >
        <div class="signin">
        
        <TakeInput/>
        </div>
      </header>
    </div>
  );
}
}
export default App;
