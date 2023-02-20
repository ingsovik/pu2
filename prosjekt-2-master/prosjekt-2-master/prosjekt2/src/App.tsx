import React from "react";
import "./App.css";
import { InputProvider } from './context/inputContext';
import { ToggleView } from './components/toggleView';


function App() {
  
  return (   
    <>               
      <div className="App">
        <InputProvider>
          <ToggleView />
        </InputProvider>
      </div>
    </>
    
  );
}

export default App;

