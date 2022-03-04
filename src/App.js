import './App.css';
import Floorplan from './components/Floorplan/Floorplan.jsx';
import Header from './components/Header/Header';
import React, {useState} from 'react';

function App() {

  const [mod, setMod] = useState("Create");
  
  return (
    <div className="App">
      <Header
        mod={mod}
        setMod={setMod}
      />
      <main>
        <Floorplan
          mod={mod}
        />
      </main>
    </div>
  );
}

export default App;
