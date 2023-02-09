import aesjs from 'aes-js';
import { DEFAULT_IV, DEFAULT_KEY } from './constant';

export const encrypt = (
  text: string,
  key: number[] = DEFAULT_KEY,
  iv: number[] = DEFAULT_IV
) => {
  const textBytes = aesjs.utils.utf8.toBytes(text);

  const aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);
  const encryptedBytes = aesOfb.encrypt(textBytes);

  return aesjs.utils.hex.fromBytes(encryptedBytes);
};
