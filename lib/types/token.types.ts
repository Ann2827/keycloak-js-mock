import {JWTPayload} from "jose";

export interface IGenerateToken {
  data: JWTPayload;
  alg: string;
  expiration: number | string;
  secret: string;
}
