import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './utils/theme';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
