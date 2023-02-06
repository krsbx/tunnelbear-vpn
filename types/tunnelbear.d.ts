import { Tray } from 'electron';
import z from 'zod';
import { credentialSchema, passwordSchema } from '../src/utils/schema';

export type VpnConfig = {
  path: string;
  name: string;
};

export type Schema = {
  Password: z.infer<typeof passwordSchema>;
  Credential: z.infer<typeof credentialSchema>;
};

export type ModifyConfigResponse = {
  contents: string[];
  results: {
    credentials: Tunnelbear.Schema['Credential'];
    caCertificate: boolean;
    userCertificate: boolean;
  };
};

export type AppState = {
  tray: Tray | null;
  isFirstRender: boolean;
};

export as namespace Tunnelbear;
