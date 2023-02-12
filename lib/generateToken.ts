import { SignJWT, decodeJwt } from 'jose';
import { customizeData } from './mockCustomize';

const secret = new TextEncoder().encode(customizeData.jwt.secret);
export const generateToken = () =>
  new SignJWT({ ...customizeData.profile })
    .setProtectedHeader({ alg: customizeData.jwt.alg })
    .setExpirationTime(customizeData.jwt.expiration)
    .sign(secret);

export const getExpByToken = (token: string): number => {
  const exp = decodeJwt(token).exp;
  if (!exp) return 0;
  const time = exp - Math.floor(Date.now() / 1000);
  if (time <= 0) return 0;
  return time;
};
