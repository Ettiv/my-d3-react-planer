import React, { useState, memo } from 'react';

const DataPoint = (props) => {

  const {
    setData,
    data,
    index,
    zone,
    point,
    mod,
    sendNewData
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

  if (mod === "Edit" || mod === "Edit2" || mod === "Edit3") {
    onStartDrag = () => {
      setDraggable(true);
    }

    onStopDrag = () => {
      setDraggable(false);
      sendNewData(data);
    }
  }

  if (mod === "Edit" || mod === "Edit3") {

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
  }

  if (draggable && mod === "Edit3") {
    return (
      <g>
        <circle
          cx={point.x}
          cy={point.y}
          r={4}
          style={{
            cursor: 'grabbing'
          }}
          onMouseUp={onStopDrag}
          onClick={onCircleDataClick}
        />
        <circle
          cx={point.x}
          cy={point.y}
          r={50}
          fillOpacity='0'
          stroke='none'
          style={{
            cursor: 'grabbing'
          }}
          onMouseMove={(event) => {
            onDrag(zone.id, index, event);
          }}
          onMouseUp={onStopDrag}
          onClick={onCircleDataClick}
          onMouseOut={onStopDrag}
        />
      </g>
    )
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
        onMouseOut={onStopDrag}
      />
    )
  }

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={4}
      style={{
        cursor: (mod === "Edit" || mod === "Edit2" || mod === "Edit3") ? 'grab' : 'default'
      }}
      onMouseDown={onStartDrag}
      onClick={onCircleDataClick}
    />
  );
}

export default memo(DataPoint);