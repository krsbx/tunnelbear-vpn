import { Flex, Switch, Text } from '@chakra-ui/react';
import React from 'react';
import useAppContext from '../hooks/useAppContext';
import useOpenVpn from '../hooks/useOpenVpn';

const StatusBar = () => {
  const { connectOpenVpnLastConnection, disconnectOpenVpn } = useOpenVpn();
  const {
    state: { isConnected, isProcessing },
  } = useAppContext();

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      gap={3}
      position={'absolute'}
      top={'65px'}
      left={'50px'}
      zIndex={999}
    >
      <Switch
        isChecked={isConnected}
        disabled={isProcessing}
        onChange={(event) => {
          if (!event.target.checked) {
            disconnectOpenVpn();
            return;
          }

          connectOpenVpnLastConnection();
        }}
      />
      <Text fontSize={20} fontWeight={'bold'}>
        {isProcessing
          ? isConnected
            ? 'Disconnecting...'
            : 'Connecting...'
          : !isConnected
          ? 'Disconnected'
          : 'Connected'}
      </Text>
    </Flex>
  );
};

export default StatusBar;
