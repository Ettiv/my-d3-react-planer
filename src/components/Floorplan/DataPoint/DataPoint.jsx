import React, { useState,memo } from 'react';

const DataPoint = (props) => {

  const {
    setData,
    data,
    index,
    zone,
    point,
    mod
  } = props;
  const [draggable, setDraggable] = useState(false);


  const onCircleDataClick = (event) => {
    event.stopPropagation();
  }

  let onStartDrag = () => {
    return;
  }

  let onStopDrag = () => {
    return;
  }

  let onDrag = () => {
    return;
  }

  if (mod === "Edit" || mod === "Edit2") {
    onStartDrag = () => {
      setDraggable(true);
    }
  }

  if (mod === "Edit") {

    onDrag = (zoneId, index, event) => {

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

    onStopDrag = () => {
      setDraggable(false);
    }
  }

  if (mod === 'Edit2') {

    //don't work like whant

    onDrag = (zoneId, index, event) => {

      event.stopPropagation();

      const { layerX, layerY } = event.nativeEvent;
      const newX = layerX;
      const newY = layerY;
      const element = event.target;

      element.setAttributeNS(null, 'cx', newX);
      element.setAttributeNS(null, 'cy', newY);
    }

    onStopDrag = () => {
      setDraggable(false);
    }
  }

  if (draggable) {
    return (
      <circle
        cx={point.x}
        cy={point.y}
        r={4}
        style={{
          cursor: 'grabbing'
        }}
        onMouseMove={(event) => {
          onDrag(zone.id, index, event);
        }}
        onMouseUp={onStopDrag}
        onClick={onCircleDataClick}
        onMouseOver={onStopDrag}
      />
    )
  }

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={4}
      style={{
        cursor: (mod === "Edit" || mod === "Edit2") ? 'grab' : 'default'
      }}
      onMouseDown={onStartDrag}
      onClick={onCircleDataClick}
    />
  );
}

export default memo(DataPoint);