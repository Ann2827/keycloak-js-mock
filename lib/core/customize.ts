import { ICustomize, ICustomizeData } from '../types';
import { mergeObject } from '../utils';

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

export const customize: ICustomize = {
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
