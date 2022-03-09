import React, { memo, useCallback } from 'react';
import uuid from '../../../functions/uuid';
import makeStrokeOfPoints from '../../../functions/makeStrokeOfpoints';
import NewZonePoint from '../NewZonePoint/NewZonePoint';

const NewZone = (props) => {

  const {
    setNewZone,
    newZone,
    setData,
    data,
    mod
  } = props;

  const createNewEmptyZone = useCallback(() => {
    setNewZone({
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
    })
  }, [])

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
    <g>
      <polyline
        points={makeStrokeOfPoints(newZone.points)}
        fill='none'
        stroke="black"
        strokeWidth='2'
      />
      {newZone.points.map((point, index) => {
        return (
          <NewZonePoint
            key={point.id}
            index={index}
            point={point}
            mod={mod}
            newZone={newZone}
            setData={setData}
            data={data}
            createNewEmptyZone={createNewEmptyZone}
          />
        )
      })}
    </g>
  );
}

export default memo(NewZone);