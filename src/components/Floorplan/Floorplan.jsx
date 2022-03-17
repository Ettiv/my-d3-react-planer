import React, { useState, memo, useEffect, useRef, useMemo } from "react";
import uuid from "../../functions/uuid";
import NewZone from "./NewZone/NewZone";
import DataZones from "./DataZones/DataZones";
import ContextMenu from "./ContextMenu/ContextMenu";
import Header from "../Header/Header";
import "./Floorplan.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Floorplan = (props) => {

  const {allFloorId, setFloorId} = props;

  const [loading, setLoading] = useState(false);

  const {floorId} = useParams();

  const [mod, setMod] = useState("Create");
  const userId = useMemo(() => {
    return uuid();
  }, []);


  const [conected, setConected] = useState(false);
  const webSocket = useRef();

  const [username, setUsername] = useState('user ' + uuid());

  //const floorId = '27f8324d-bdcc-4757-983c-df09d505229d';

  const [svgSize, setSvgSize] = useState({
    width: 0,
    height: 0
  });

  const [data, setData] = useState(
    {
      id: uuid(),
      name: "floor 1",
      floorPlanUrl: 'https://static.educalingo.com/img/en/800/floor-plan.jpg',
      zones: [
        {
          id: uuid(),
          name: "zone 1",
          points: [
            {
              id: uuid(),
              x: 50,
              y: 50
            },
            {
              id: uuid(),
              x: 100,
              y: 100
            },
            {
              id: uuid(),
              x: 100,
              y: 75
            }
          ]
        }
      ]
    }
  );

  const [newZone, setNewZone] = useState({
    id: uuid(),
    name: 'zone ' + uuid(),
    firstPoint: null,
    points: [],
  });

  const [currentHoveredZone, setCurrentHoveredZone] = useState(null);

  const [contextMenuProperties, setContextMenuProperties] = useState({
    show: false,
    x: 0,
    y: 0
  });

  const openContextMenu = (x, y) => {
    setContextMenuProperties({
      show: true,
      x: x,
      y: y
    })
  }

  const closeContextMenu = () => {
    setContextMenuProperties({
      ...contextMenuProperties,
      show: false
    })
  }

  //Old save lockal storage
  // useEffect(() => {
  //   const jsonData = JSON.parse(localStorage.getItem(floorId));
  //   setData(jsonData);
  // }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setSvgSize({
        width: img.width,
        height: img.height
      })
    }
    img.onerror = () => {
      console.error('Invalid url')
    }
    img.src = data.floorPlanUrl;
  }, [data.floorPlanUrl]);

  const sendNewZone = (newZone) => {
    let message = {
      event: 'new_zone_update',
      newZone: newZone,
      userId: userId,
      floorId: floorId
    }
    message = JSON.stringify(message);
    webSocket.current.send(message);
  }

  const sendNewData = (newData) => {
    let message = {
      event: 'zones_update',
      data: newData,
      userId: userId,
      floorId: floorId
    }
    message = JSON.stringify(message);
    webSocket.current.send(message);
  }

  let handleSvgClick = () => {
    return;
  }

  if (mod === 'Create') {
    handleSvgClick = (event) => {

      const { layerX, layerY } = event.nativeEvent;
      let newZoneToSend;

      if (newZone.firstPoint === null) {
        newZoneToSend = {
          ...newZone,
          firstPoint: {
            id: uuid(),
            x: layerX,
            y: layerY
          },
          points: [
            ...newZone.points,
            {
              id: uuid(),
              x: layerX,
              y: layerY
            }
          ]
        }
        setNewZone(newZoneToSend);
      } else {
        newZoneToSend = {
          ...newZone,
          points: [
            ...newZone.points,
            {
              id: uuid(),
              x: layerX,
              y: layerY
            }
          ]
        }
        setNewZone(newZoneToSend);
      }
      sendNewZone(newZoneToSend);
    }
  }

  const onConectClick = () => {
    setLoading(true);
    webSocket.current = new WebSocket('ws://localhost:5000');

    webSocket.current.onopen = () => {
      setConected(true);
      let message = {
        event: 'connection',
        username: username,
        userId: userId,
        floorId: floorId
      }
      message = JSON.stringify(message);
      webSocket.current.send(message);
      console.log('Conection success');
    }

    webSocket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.event) {
        case 'connection':
          console.log(message.username + ' conected');
          if(message.userId === userId){
            setData(message.floor);
            setNewZone(message.floor.newZone);
            setLoading(false);
          }
          break;
        case 'zones_update':
          setData(message.data);
          break;
        case 'new_zone_update':
          setNewZone(message.newZone);
          break;
        default:
          console.log(message);
          console.warn('Unknown event type of message');
      }
    }

    webSocket.current.onclose = () => {
      console.log('Conection ended');
    }

    webSocket.current.onerror = () => {
      console.error('Error conect to server');
    }
  }

  if (mod === "Edit" || mod === "Edit2" || mod === "Edit3") {
    handleSvgClick = () => {
      closeContextMenu();
    }
  }

  if (!conected) {
    return (
      <div className="connection-wraper">
        <div className="connection-form">
          <input
            className="connection-input"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <button
            className="connection-button"
            onClick={onConectClick}
          >
            Connect
          </button>
        </div>
      </div>
    )
  }

  if(loading) {
    return(
      <div className="loading">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <Header
        mod={mod}
        setMod={setMod}
        data={data}
        allFloorId={allFloorId}
        setFloorId={setFloorId}
        floorId={floorId}
      />
      <main>
        <ContextMenu
          sendNewData={sendNewData}
          show={contextMenuProperties.show}
          x={contextMenuProperties.x}
          y={contextMenuProperties.y}
          zoneName={currentHoveredZone?.name}
          setData={setData}
          currentHoveredZone={currentHoveredZone}
          data={data}
          closeContextMenu={closeContextMenu}
        />
        <svg
          style={{
            backgroundImage: `url("${data.floorPlanUrl}")`,
            backgroundRepeat: 'no-repeat',
            border: '2px solid black',
            margin: '5px'
          }}
          width={svgSize.width}
          height={svgSize.height}
          onClick={handleSvgClick}
        >
          <g>
            <DataZones
              sendNewData={sendNewData}
              data={data}
              setData={setData}
              mod={mod}
              setCurrentHoveredZone={setCurrentHoveredZone}
              openContextMenu={openContextMenu}
            />
            <NewZone
              sendNewData={sendNewData}
              sendNewZone={sendNewZone}
              newZone={newZone}
              data={data}
              setData={setData}
              setNewZone={setNewZone}
              mod={mod}
            />
          </g>
        </svg>
      </main>
    </div>
  )
}

export default memo(Floorplan);