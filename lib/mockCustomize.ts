import Keycloak, { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { CompactJWSHeaderParameters } from 'jose/dist/types/types';
import { RecursivePartial } from './types';
import mergeObject from './mergeObject';

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
interface ICustomizeDataJwt {
  alg: CompactJWSHeaderParameters['alg'];
  expiration: number | string;
  secret: string;
}
type TCustomizeUrls = 'login' | 'logout' | 'register' | 'account';
type TCustomizeDataUrl = {
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

export const initialData: Readonly<ICustomizeData> = {
  profile: {
    id: '51d4f6c0-40a0-49ce-b91b-516c4a4bff8a',
    username: 'jsnow',
    email: 'j.snow@google.com',
    firstName: 'John',
    lastName: 'Snow',
    enabled: true,
    emailVerified: true,
    totp: false,
    createdTimestamp: 631_141_200,
  },
  userInfo: {},
  jwt: {
    alg: 'HS256', // S256
    expiration: '5m',
    secret: 'cc7e0d44f',
  },
  promises: {
    init: {
      method: 'resolve',
      // example
      resolveCallback(instance): void {
        instance.subject = initialData.profile.id;
      },
    },
  },
  url: {
    login: '',
    logout: '',
    register: '',
    account: '',
  },
  tokenParsed: {
    aud: 'account',
    azp: 'my-frontend-app', // clientID
    realm_access: {
      roles: ['offline_access', 'uma_authorization', 'default-roles'],
    },
    resource_access: {
      account: {
        roles: ['manage-account', 'manage-account-links', 'view-profile'],
      },
    },
  },
};

export const customizeData: ICustomizeData = { ...initialData };

export interface ICustomize {
  profile(data: KeycloakProfile): void;
  userInfo(data: Record<string, unknown>): void;
  jwt(data: Partial<ICustomizeDataJwt>): void;
  url(data: Partial<TCustomizeDataUrl>): void;
  tokenParsed(data: RecursivePartial<KeycloakTokenParsed>): void;
  promises(data: RecursivePartial<ICustomizeDataPromises>): void;
  reset(): void;
}
const customize: ICustomize = {
  profile(data) {
    customizeData.profile = { ...customizeData.profile, ...data };
  },
  userInfo(data) {
    customizeData.userInfo = { ...customizeData.userInfo, ...data };
  },
  jwt(data) {
    customizeData.jwt = { ...customizeData.jwt, ...data };
  },
  url(data) {
    customizeData.url = { ...customizeData.url, ...data };
  },
  tokenParsed(data) {
    customizeData.tokenParsed = mergeObject(customizeData.tokenParsed, data);
  },
  promises(data) {
    customizeData.promises = mergeObject(customizeData.promises, data);
  },
  reset() {
    (Object.keys(customizeData) as Array<keyof ICustomizeData>).forEach((key) => {
      // @ts-ignore
      customizeData[key] = { ...initialData[key] } as ICustomizeData[typeof key];
    });
  },
};

export default customize;
