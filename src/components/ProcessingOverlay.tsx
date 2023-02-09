import { Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import useAppContext from '../hooks/useAppContext';

const ProcessingOverlay = () => {
  const {
    state: { isConnected, isProcessing },
  } = useAppContext();

  if (!isProcessing) return null;

  return (
    <Flex
      position={'absolute'}
      width={'100vw'}
      height={'100vh'}
      backgroundColor={'blackAlpha.600'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      rowGap={4}
      top={'40px'}
    >
      <Text fontWeight={'bold'} fontSize={'1.25rem'}>
        {isProcessing && isConnected ? 'Disconnecting...' : 'Connecting...'}
      </Text>
      <Spinner size={'xl'} />
    </Flex>
  );
};

export default ProcessingOverlay;
