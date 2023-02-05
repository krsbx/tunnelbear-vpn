import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootEl = document.getElementById('root')! as HTMLElement;

ReactDOM.createRoot(rootEl).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
