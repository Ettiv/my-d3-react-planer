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
    mod,
    sendNewData,
    sendNewZone
  } = props;

  const createNewEmptyZone = useCallback(() => {
    const newEmptyZone = {
      id: uuid(),
      name: 'zone ' + uuid(),
      firstPoint: null,
      points: [],
    }
    setNewZone(newEmptyZone);
    sendNewZone(newEmptyZone);
  }, [setNewZone]);

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
            sendNewData={sendNewData}
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