import React from 'react';
import makeStrokeOfPoints from '../../../../functions/makeStrokeOfpoints';
import DataPoint from '../../DataPoint/DataPoint';

const DataZone = (props) => {

  const {
    zone,
    data,
    setData,
    mod,
    onHoverZone,
    openContextMenu
  } = props;

  const strokeOfPoints = makeStrokeOfPoints(zone.points);

  let onContextMenu = (event) => {
    event.preventDefault();
    return;
  }

  if (mod === "Edit" || mod === "Edit2" || mod === "Edit3") {
    onContextMenu = (event) => {
      event.preventDefault();
      const x = event.clientX;
      const y = event.clientY;

      openContextMenu(x, y);
    }
  }

  return (
    <g>
      <polygon
        onContextMenu={onContextMenu}
        points={strokeOfPoints}
        stroke="black"
        strokeWidth='2'
        fill='red'
        fillOpacity='0.25'
        onMouseEnter={() => {
          onHoverZone(zone);
        }}
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