import React, { useState, memo } from "react";
import uuid from "../../functions/uuid";
import NewZone from "./NewZone/NewZone";
import DataZones from "./DataZones/DataZones";
import ContextMenu from "./ContextMenu/ContextMenu";

const svgWidth = 960;
const svgHeight = 500;

const Floorplan = (props) => {

  const { mod } = props;

  const [data, setData] = useState(
    {
      id: uuid(),
      name: "floor 1",
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

  if(mod === "Edit" || mod === "Edit2" || mod === "Edit3"){
    handleSvgClick = () => {
      closeContextMenu();
    }
  }

  return (
    <div>
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
          backgroundImage: `url("https://static.educalingo.com/img/en/800/floor-plan.jpg")`,
          backgroundRepeat: 'no-repeat'
        }}
        width={svgWidth}
        height={svgHeight}
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
    </div>
  )
}

export default memo(Floorplan);