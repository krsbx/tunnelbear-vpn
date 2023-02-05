import z from 'zod';
import { credentialSchema, passwordSchema } from '../utils/schema';

export type VpnConfig = {
  path: string;
  name: string;
};

export type Schema = {
  Password: z.infer<typeof passwordSchema>;
  Credential: z.infer<typeof credentialSchema>;
};

export as namespace Tunnelbear;
