import { Button, Flex, Stack } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import VPNConfigCard from './components/card/VPNConfigCard';
import FilePicker from './components/FilePicker';
import GridLayout from './components/layout/GridLayout';
import useRenderRefresher from './hooks/useRenderRefresher';
import Storage from './utils/storage';

const App = () => {
  const refreshRender = useRenderRefresher();

  const onChange = (files: FileList | null) => {
    if (!files || _.isEmpty(files)) return;

    _.forEach(files, (file) => {
      Storage.instance.set(file.name, {
        name: file.name,
        path: file.path,
      });
    });

    refreshRender();
  };

  return (
    <Flex
      width={'100vw'}
      height={'100vh'}
      overflow={'auto'}
      rowGap={4}
      p={2}
      flexDirection={'column'}
    >
      <Stack direction={'row'} spacing={3}>
        <FilePicker variant={'solid'} p={3} onChange={onChange} accept={'.ovpn'} multiple>
          Import Configs
        </FilePicker>
        <Button variant={'solid'} p={3}>
          Configure Auth
        </Button>
      </Stack>
      <GridLayout>
        {_.map(Storage.instance.storage, (value, key) => (
          <VPNConfigCard config={value} key={key} />
        ))}
      </GridLayout>
    </Flex>
  );
};

export default App;
