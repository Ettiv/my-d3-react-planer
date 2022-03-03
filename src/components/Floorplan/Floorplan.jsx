import React, { useState } from "react";
import uuid from "../../functions/uuid";
import DataPoint from './DataPoint/DataPoint';

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
            },
            {
              x: 100,
              y: 75
            }
          ]
        }
      ]
    }
  );

  const makeStrokeOfPoints = (pointsArray) => {

    let strokePoints = '';

    pointsArray.map((point, index) => {
      if (pointsArray.length === index + 1) {
        strokePoints += point.x;
        strokePoints += ' ';
        strokePoints += point.y;
      } else {
        strokePoints += point.x;
        strokePoints += ' ';
        strokePoints += point.y;
        strokePoints += ',';
      }
    })

    return strokePoints;
  }

  const [newZone, setNewZone] = useState({
    id: uuid(),
    name: 'zone ' + uuid(),
    firstPoint: null,
    points: [],
  });

  const createNewEmptyZone = () => {
    setNewZone({
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
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

      setData({
        ...data,
        zones: [
          ...data.zones,
          newZone
        ]
      })
      createNewEmptyZone();
    }
  }

  const dataPointOnMouseDown = (zoneId, index, event) => {

    event.stopPropagation();

    const currentZone = data.zones.filter((zone) => {
      return zone.id === zoneId;
    })[0];

    const onMouseMove = () => {
      const dataWithoutOldZone = data.zones.filter(zone => {
        return zone.id !== zoneId;
      })

      const { layerX, layerY } = event.nativeEvent;
      const newX = layerX;
      const newY = layerY;

      currentZone.points[index].x = newX;
      currentZone.points[index].y = newY;

      const newData = {
        ...data,
        zones: [
          ...dataWithoutOldZone,
          currentZone
        ]
      }

      setData(newData);
    }

    const point = event.target;

    point.addEventListener('mousemove', onMouseMove);

    point.addEventListener('mouseup', () => {
      point.removeEventListener('mousemove', onMouseMove);
    })
  }
  const onCircleDataClick = (event) => {
    event.stopPropagation();
  }

  return (
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
        {data.zones.map((zone) => {

          const strokeOfPoints = makeStrokeOfPoints(zone.points);

          return (
            <g>
              <polygon
                points={strokeOfPoints}
                stroke="black"
                strokeWidth='2'
                fill='red'
                fillOpacity='0.25'
              />
              {zone.points.map((point, index) => {
                return (
                  <DataPoint
                    index={index}
                    point={point}
                    data={data}
                    setData={setData}
                    zone={zone}
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
        <polyline
          points={makeStrokeOfPoints(newZone.points)}
          fill='none'
          stroke="black"
          strokeWidth='2'
        />
      </g>
    </svg>
  )
}

export default Floorplan;