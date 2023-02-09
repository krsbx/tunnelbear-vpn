import { LatLngTuple, Map } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';
import useConfigData from '../hooks/useConfigData';
import useOpenVpn from '../hooks/useOpenVpn';
import useReadWriteIpcEvent from '../hooks/useReadWriteIpcEvent';
import { TunnelIcon } from './Marker';

const Tunnel: React.FC<Props> = ({ config, mapRef, position }) => {
  const { dirPath } = useConfigData(config);
  const { readFile } = useReadWriteIpcEvent();
  const { connectOpenVpn } = useOpenVpn();

  const onClick = async () => {
    if (!mapRef.current) return;

    mapRef.current.panTo(position, {
      animate: true,
      duration: 500,
    });

    const contents = (await readFile(config.path)).split('\n');

    return connectOpenVpn(dirPath, contents);
  };

  return (
    <Marker
      position={position}
      icon={TunnelIcon}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
};

type Props = {
  config: Tunnelbear.VpnConfig;
  mapRef: React.RefObject<Map> | React.MutableRefObject<Map>;
  position: LatLngTuple;
};

export default Tunnel;
