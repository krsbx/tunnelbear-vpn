import { Box } from '@chakra-ui/react';
import { Map } from 'leaflet';
import _ from 'lodash';
import React, { createRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import useAppContext from '../hooks/useAppContext';
import { LAT_LNG } from '../utils/constant';
import Tunnel from './Tunnel';

const MapView = () => {
  const {
    state: { vpns },
  } = useAppContext();

  const mapRef = createRef<Map>();

  return (
    <Box
      id={'map-container'}
      width={'100%'}
      height={'calc(100vh - 40px)'}
      position={'relative'}
    >
      <MapContainer
        center={[-0.789275, 113.921327]}
        zoom={4}
        minZoom={3}
        maxZoom={5}
        scrollWheelZoom={false}
        style={{
          width: '100%',
          height: '100%',
        }}
        attributionControl={false}
        maxBounds={[
          [81.427274, -173.201662],
          [-84.136577, 178.66761],
        ]}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}'
          }
        />
        {_.map(vpns, (config, key) => {
          const countryData = LAT_LNG.find(({ country }) =>
            key.includes(country)
          );

          if (!countryData) return;

          return (
            <Tunnel
              position={countryData.position}
              config={config}
              mapRef={mapRef}
              key={key}
            />
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default MapView;
