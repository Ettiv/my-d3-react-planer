import { color } from 'd3';
import React from 'react';

const NewZonePoint = (props) => {

  const {
    point,
    index,
    mod,
    newZone,
    setData,
    data,
    createNewEmptyZone
  } = props;

  //color of point
  let pointColor = 'black';

  //color of last point
  if(newZone.points.length === index + 1){
    pointColor = 'green'
  }

  //color of first point
  if(index === 0){
    pointColor = 'red'
  }

  let handleCircleClick = () => {
    return;
  }

  if (mod === "Create") {
    handleCircleClick = (event) => {

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
  }

  return (
    <circle
      key={point.id}
      cx={point.x}
      cy={point.y}
      r={4}
      fill={pointColor}
      onClick={handleCircleClick}
      style={{
        cursor: 'pointer'
      }}
    />
  );
}

export default NewZonePoint;