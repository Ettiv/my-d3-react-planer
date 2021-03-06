import React, { memo } from 'react';
import DataZone from './DataZone/DataZone';

const DataZones = (props) => {

  const { 
    data, 
    setData, 
    mod, 
    setCurrentHoveredZone,
    openContextMenu,
    sendNewData
  } = props;

  const onHoverZone = (zone) => {
    setCurrentHoveredZone(zone);
  }

  return (
    <g>
      {data.zones.map((zone) => {
        return (
          <DataZone
            sendNewData={sendNewData}
            key={zone.id}
            data={data}
            setData={setData}
            mod={mod}
            zone={zone}
            onHoverZone={onHoverZone}
            openContextMenu={openContextMenu}
          />
        )
      })}
    </g>
  );
}

export default memo(DataZones);