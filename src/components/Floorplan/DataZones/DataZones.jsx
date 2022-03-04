import React,{memo} from 'react';
import makeStrokeOfPoints from '../../../functions/makeStrokeOfpoints';
import DataPoint from '../DataPoint/DataPoint';

const DataZones = (props) => {

  const {data,setData, mod} = props;

  return (
    <g>
      {data.zones.map((zone) => {

        const strokeOfPoints = makeStrokeOfPoints(zone.points);

        return (
          <g key={zone.id}>
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
        )
      })}
    </g>
  );
}

export default memo(DataZones);