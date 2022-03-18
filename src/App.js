import './App.css';
import Floorplan from './components/Floorplan/Floorplan.jsx';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {Switch, Route, useHistory } from 'react-router-dom';

function App() {

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [allFloorId, setAllFloorId] = useState([]);
  const [floorId, setFloorId] = useState(null);
  

  useEffect(async () => {
    setLoading(true);
    const response = await axios.get('http://localhost:5001/');
    console.log(response);
    setLoading(false);
    setAllFloorId(response.data.allFloorsId)
    setFloorId(response.data.allFloorsId[1]);
  }, []);

  useEffect(()=>{
    if(floorId){
      history.push(`/floor/${floorId}`);
    }
  }, [floorId]);

  if(loading){ 
    return(
      <div className='loading'>
        Loading...
      </div>
    )
  }

  return (
      <div className="App">
        <Switch>
          <Route path="/floor/:floorId" exact>
            <Floorplan
              key={floorId}
              setFloorId={setFloorId}
              allFloorId={allFloorId}
            />
          </Route>
        </Switch>
      </div>
  );
}

export default App;
