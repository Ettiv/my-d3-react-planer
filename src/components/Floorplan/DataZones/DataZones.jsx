import React, { memo } from 'react';
import DataZone from './DataZone/DataZone';

const DataZones = (props) => {

  const { data, setData, mod } = props;

  return (
    <g>
      {data.zones.map((zone) => {
        return (
          <DataZone
            key={zone.id}
            data={data}
            setData={setData}
            mod={mod}
            zone={zone}
          />
        )
      })}
    </g>
  );
}

export default memo(DataZones);