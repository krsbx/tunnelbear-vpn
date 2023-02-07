import z from 'zod';

export const credentialSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(0),
});

export const passwordSchema = z.object({
  password: z.string().min(0),
});
