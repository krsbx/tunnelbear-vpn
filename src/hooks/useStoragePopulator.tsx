import { useEffect } from 'react';
import useStorage from './useStorage';

const useStoragePopulator = () => {
  const { populateContext } = useStorage();

  useEffect(() => {
    populateContext();
  }, []);
};

export default useStoragePopulator;
