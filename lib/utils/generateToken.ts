import { SignJWT, decodeJwt } from 'jose';
import {IGenerateToken} from "../types";

export const generateToken = ({ data, alg, expiration, secret }: IGenerateToken) =>
  new SignJWT({ ...data })
    .setProtectedHeader({ alg })
    .setExpirationTime(expiration)
    .sign(new TextEncoder().encode(secret));

export const getExpByToken = (token: string): number => {
  const exp = decodeJwt(token).exp;
  if (!exp) return 0;
  const time = exp - Math.floor(Date.now() / 1000);
  if (time <= 0) return 0;
  return time;
};
