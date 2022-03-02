import React, { useState } from "react";
import uuid from "../../functions/uuid";

const svgWidth = 960;
const svgHeight = 500;

const Floorplan = (props) => {

  const [data, setData] = useState(
    {
      id: 1,
      name: "floor 1",
      zones: [
        {
          id: 1,
          name: "zone 1",
          points: [
            {
              x: 50,
              y: 50
            },
            {
              x: 100,
              y: 100
            }
          ],
          connections: [
            {
              x1: 50,
              y1: 50,
              x2: 100,
              y2: 100
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
    connections: []
  });

  const createNewEmptyZone = () => {
    setNewZone({
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
      connections: []
    })
  }
  const handleSvgClick = (event) => {
    const { layerX, layerY } = event.nativeEvent;

    if (newZone.firstPoint === null) {
      setNewZone({
        ...newZone,
        firstPoint: {
          x: layerX,
          y: layerY
        },
        points: [
          ...newZone.points,
          {
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
            x: layerX,
            y: layerY
          }
        ],
        connections: [
          ...newZone.connections,
          {
            x1: newZone.points[newZone.points.length - 1].x,
            y1: newZone.points[newZone.points.length - 1].y,
            x2: layerX,
            y2: layerY
          }
        ]
      })
    }
  }

  const handleCircleClick = (event) => {

    event.stopPropagation();

    if (newZone.points.length < 3) {
      return;
    }

    const pointX = +event.target.attributes.cx.value;
    const pointY = +event.target.attributes.cy.value;
    const firstPointX = +newZone.firstPoint.x;
    const firstPointY = +newZone.firstPoint.y;

    if (pointX === firstPointX && pointY === firstPointY) {

      const newZoneToData = {
        ...newZone,
        connections: [
          ...newZone.connections,
          {
            x1: newZone.points[newZone.points.length - 1].x,
            y1: newZone.points[newZone.points.length - 1].y,
            x2: firstPointX,
            y2: firstPointY
          }
        ]
      }
      setData({
        ...data,
        zones: [
          ...data.zones,
          newZoneToData
        ]
      })
      createNewEmptyZone();
    }
  }

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      onClick={handleSvgClick}
    >
      <g>
        {data.zones.map((zone) => {
          return (
            <g>
              {zone.points.map((point) => {
                return (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    style={{
                      cursor: 'pointer'
                    }}
                  />
                )
              })}
              {zone.connections.map((connection) => {
                return (
                  <line
                    x1={connection.x1}
                    x2={connection.x2}
                    y1={connection.y1}
                    y2={connection.y2}
                    stroke='black'
                  />
                )
              })}
            </g>
          )
        })}
        {newZone.points.map((point) => {
          return (
            <circle
              cx={point.x}
              cy={point.y}
              r={4}
              onClick={handleCircleClick}
              style={{
                cursor: 'pointer'
              }}
            />
          )
        })}
        {newZone.connections.map((connection) => {
          return (
            <line
              x1={connection.x1}
              x2={connection.x2}
              y1={connection.y1}
              y2={connection.y2}
              stroke='black'
            />
          )
        })}
      </g>
    </svg>
  )
}

export default Floorplan;