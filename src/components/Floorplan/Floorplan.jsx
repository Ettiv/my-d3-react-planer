import React, { useState, memo, useEffect } from "react";
import uuid from "../../functions/uuid";
import NewZone from "./NewZone/NewZone";
import DataZones from "./DataZones/DataZones";
import ContextMenu from "./ContextMenu/ContextMenu";
import Header from "../Header/Header";

const Floorplan = (props) => {

  const [mod, setMod] = useState("Create");

  const floorId = '27f8324d-bdcc-4757-983c-df09d505229d';

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

  useEffect(()=>{
    const jsonData = JSON.parse(localStorage.getItem(floorId));
    setData(jsonData);
  }, []);

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


  let handleSvgClick = () => {
    return;
  }

  if (mod === 'Create') {
    handleSvgClick = (event) => {

      const { layerX, layerY } = event.nativeEvent;

      if (newZone.firstPoint === null) {
        setNewZone({
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
        })
      } else {
        setNewZone({
          ...newZone,
          points: [
            ...newZone.points,
            {
              id: uuid(),
              x: layerX,
              y: layerY
            }
          ]
        })
      }
    }
  }

  if (mod === "Edit" || mod === "Edit2" || mod === "Edit3") {
    handleSvgClick = () => {
      closeContextMenu();
    }
  }

  return (
    <div>
      <Header
        mod={mod}
        setMod={setMod}
        data={data}
      />
      <main>
        <ContextMenu
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
              data={data}
              setData={setData}
              mod={mod}
              setCurrentHoveredZone={setCurrentHoveredZone}
              openContextMenu={openContextMenu}
            />
            <NewZone
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