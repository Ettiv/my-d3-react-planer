import React, { useState } from 'react';

const DataPoint = (props) => {

  const { setData, data, index, zone, point } = props;
  const [draggable, setDraggable] = useState(false);


  const onCircleDataClick = (event) => {
    event.stopPropagation();
  }

  const onStartDrag = () => {
    setDraggable(true);
  }

  const onStopDrag = () => {
    setDraggable(false)
  }

  const onDrag = (zoneId, index, event) => {

    event.stopPropagation();

    const currentZone = data.zones.filter((zone) => {
      return zone.id === zoneId;
    })[0];

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

  // const dataPointOnMouseDown = (zoneId, index, event) => {

  //   event.stopPropagation();

  //   const currentZone = data.zones.filter((zone) => {
  //     return zone.id === zoneId;
  //   })[0];

  //   const onMouseMove = () => {
  //     const dataWithoutOldZone = data.zones.filter(zone => {
  //       return zone.id !== zoneId;
  //     })

  //     const { layerX, layerY } = event.nativeEvent;
  //     const newX = layerX;
  //     const newY = layerY;

  //     currentZone.points[index].x = newX;
  //     currentZone.points[index].y = newY;

  //     const newData = {
  //       ...data,
  //       zones: [
  //         ...dataWithoutOldZone,
  //         currentZone
  //       ]
  //     }

  //     setData(newData);
  //   }

  //   const point = event.target;

  //   point.addEventListener('mousemove', onMouseMove);

  //   point.addEventListener('mouseup', () => {
  //     point.removeEventListener('mousemove', onMouseMove);
  //   })
  // }

  if (draggable) {
    return (
      <circle
        cx={point.x}
        cy={point.y}
        r={4}
        style={{
          cursor: 'pointer'
        }}
        onMouseMove={(event) => {
          onDrag(zone.id, index, event);
        }}
        onMouseUp={onStopDrag}
        onClick={onCircleDataClick}
      />
    )
  }

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={4}
      style={{
        cursor: 'pointer'
      }}
      onMouseDown={onStartDrag}
      onClick={onCircleDataClick}
    />
  );
}

export default DataPoint;