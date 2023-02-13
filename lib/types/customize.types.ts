import Keycloak, {KeycloakProfile, KeycloakTokenParsed} from "keycloak-js";
import {CompactJWSHeaderParameters} from "jose/dist/types/types";
import {RecursivePartial} from "./index";

type TPromiseCallback = (instance: Keycloak.KeycloakInstance) => void;
type TPromiseMethod = 'resolve' | 'reject';
interface ICustomizePromise {
  method: TPromiseMethod;
  resolveCallback?: TPromiseCallback;
  rejectCallback?: TPromiseCallback;
}
export interface ICustomizeDataPromises {
  init: ICustomizePromise;
  logout: ICustomizePromise;
  updateToken: ICustomizePromise;
  login: ICustomizePromise;
  register: ICustomizePromise;
  accountManagement: ICustomizePromise;
  loadUserProfile: ICustomizePromise;
  loadUserInfo: ICustomizePromise;
}

export interface ICustomizeDataJwt {
  alg: CompactJWSHeaderParameters['alg'];
  expiration: number | string;
  secret: string;
}

type TCustomizeUrls = 'login' | 'logout' | 'register' | 'account';
export type TCustomizeDataUrl = {
  [K in TCustomizeUrls]: string;
};

export interface ICustomizeData {
  profile: KeycloakProfile;
  jwt: ICustomizeDataJwt;
  promises: Partial<ICustomizeDataPromises>;
  userInfo: Record<string, unknown>;
  url: TCustomizeDataUrl;
  tokenParsed: KeycloakTokenParsed;
}

export interface ICustomize {
  profile(data: KeycloakProfile): void;
  userInfo(data: Record<string, unknown>): void;
  jwt(data: Partial<ICustomizeDataJwt>): void;
  url(data: Partial<TCustomizeDataUrl>): void;
  tokenParsed(data: RecursivePartial<KeycloakTokenParsed>): void;
  promises(data: RecursivePartial<ICustomizeDataPromises>): void;
  reset(): void;
}
