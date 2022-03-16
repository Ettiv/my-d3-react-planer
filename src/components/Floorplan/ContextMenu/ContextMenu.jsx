import React, { memo } from 'react';
import "./ContextMenu.css";

const ContextMenu = (props) => {

  const {
    show,
    setData,
    data,
    zoneName,
    currentHoveredZone,
    x,
    y,
    closeContextMenu,
    sendNewData
  } = props;

  const onDeleteClick = () => {
    const newDataZones = data.zones.filter((zone) => {
      return zone.id !== currentHoveredZone.id;
    })
    const newData = {
      ...data,
      zones: [
        ...newDataZones
      ]
    }
    setData(newData);
    sendNewData(newData);
    closeContextMenu();
  }

  return (
    <div
      onMouseLeave={closeContextMenu}
      className={`context-menu-wraper ${show ? "active" : ''}`}
      style={{
        top: y,
        left: x
      }}
    >
      <div className='context-menu-zone-name'>
        {zoneName}
      </div>
      <div className='context-menu-delete-button-wraper'>
        <button
          className='context-menu-delete-button'
          onClick={onDeleteClick}
        >
          Delete zone
        </button>
      </div>
    </div>
  );
}

const shouldComponentUpdate = (prevProps, newProps) => {
  if (newProps.show !== prevProps.show) {
    return false;
  } else {
    return true;
  }
} // ?????????????????????????????????

export default memo(ContextMenu, shouldComponentUpdate);