import { ChakraProvider } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppProvider from './provider/AppProvider';
import './styles/app.css';
import theme from './utils/theme';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootEl = document.getElementById('root')! as HTMLElement;

ReactDOM.createRoot(rootEl).render(
  <ChakraProvider theme={theme}>
    <AppProvider>
      <App />
    </AppProvider>
  </ChakraProvider>
);
