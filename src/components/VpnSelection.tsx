import _ from 'lodash';
import React from 'react';
import useAppContext from '../hooks/useAppContext';
import CardLayout from './CardLayout';
import VpnCard from './VpnCard';

const VpnSelection = () => {
  const {
    state: { isProcessing, vpns },
  } = useAppContext();

  return (
    <CardLayout
      overflow={isProcessing ? 'hidden' : 'auto'}
      backgroundColor={'gray.800'}
      position={'relative'}
    >
      {_(vpns)
        .sortBy(['name'])
        .map((value, key) => <VpnCard config={value} key={key} />)
        .value()}
    </CardLayout>
  );
};

export default VpnSelection;
