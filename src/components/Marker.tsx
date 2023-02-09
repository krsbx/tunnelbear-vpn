import L from 'leaflet';
import tunnelIcon from '../assets/tunnel.svg';

export const TunnelIcon = new L.Icon({
  iconUrl: tunnelIcon,
  iconRetinaUrl: tunnelIcon,
  iconSize: new L.Point(25, 60),
});
