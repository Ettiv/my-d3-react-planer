import React from 'react';
import makeStrokeOfPoints from '../../../../functions/makeStrokeOfpoints';
import DataPoint from '../../DataPoint/DataPoint';

const DataZone = (props) => {

  const {
    zone,
    data,
    setData,
    mod
  } = props;

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
            key={point.id}
            index={index}
            point={point}
            data={data}
            setData={setData}
            zone={zone}
            mod={mod}
          />
        )
      })}
    </g>
  );
}

export default DataZone;