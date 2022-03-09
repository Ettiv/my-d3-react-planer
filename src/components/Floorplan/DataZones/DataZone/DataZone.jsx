import React, { useState, memo } from 'react';
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

  const [draggable, setDraggable] = useState(false);
  const [startPoint, setStartPoint] = useState({
    x: 0,
    y: 0
  });


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

    onStartDrag = (event) => {
      setDraggable(true);
      const { layerX, layerY } = event.nativeEvent;
      const startX = layerX;
      const startY = layerY;
      setStartPoint({
        x: startX,
        y: startY
      })
    }

    onStopDrag = () => {
      setDraggable(false);
    }

    onDrag = (zoneId, event) => {

      event.stopPropagation();

      const currentZone = data.zones.filter((zone) => {
        return zone.id === zoneId;
      })[0];

      const dataWithoutOldZone = data.zones.filter(zone => {
        return zone.id !== zoneId;
      })

      const { layerX, layerY } = event.nativeEvent;
      const currentMouseX = layerX;
      const currentMouseY = layerY;

      const shiftX = startPoint.x - currentMouseX;
      const shiftY = startPoint.y - currentMouseY;

      const newCurrentZonePoints = currentZone.points.map((point) => {
        point.x -= shiftX;
        point.y -= shiftY;
        return point;
      });

      const newCurrentZone = {
        ...currentZone,
        points: [
          ...newCurrentZonePoints
        ]
      }

      const newData = {
        ...data,
        zones: [
          ...dataWithoutOldZone,
          newCurrentZone
        ]
      }

      setStartPoint({
        x: currentMouseX,
        y: currentMouseY
      })

      setData(newData);
    }
  }

  if (draggable) {
    return (
      <g>
        <polygon
          style={{
            cursor: 'grabbing'
          }}
          onContextMenu={onContextMenu}
          points={strokeOfPoints}
          stroke="black"
          strokeWidth='2'
          fill='red'
          fillOpacity='0.25'
          onMouseEnter={() => {
            onHoverZone(zone);
          }}
          onMouseMove={(event) => {
            onDrag(zone.id, event);
          }}
          onMouseUp={onStopDrag}
          onMouseOut={onStopDrag}
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
        onMouseDown={onStartDrag}
        style={{
          cursor: (mod === "Edit" || mod === "Edit2" || mod === "Edit3") ? 'grab' : 'default'
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

export default memo(DataZone);