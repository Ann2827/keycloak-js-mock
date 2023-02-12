import Keycloak, {
  KeycloakAccountOptions,
  KeycloakError,
  KeycloakInitOptions,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakProfile,
  KeycloakPromise,
  KeycloakRegisterOptions,
} from 'keycloak-js';
import { generateToken, getExpByToken } from './generateToken';
import { createPromise } from './keycloakPromise';
import { customizeData } from './mockCustomize';
import mergeObject from './mergeObject';

let tokenTimeout: null | NodeJS.Timeout = null;
const clearTokenTimeout = (): void => {
  if (tokenTimeout) clearTimeout(tokenTimeout);
};
const setTokenTimeout = (token: string): void => {
  clearTokenTimeout();

  const time = getExpByToken(token);
  tokenTimeout = setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    keycloakInstanceMock.token = undefined;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    keycloakInstanceMock.tokenParsed = undefined;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    keycloakInstanceMock.authenticated = undefined;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    keycloakInstanceMock.onTokenExpired?.();
  }, time * 1000);
};

const keycloakInstanceMock: Keycloak.KeycloakInstance = {
  token: undefined,
  tokenParsed: undefined,
  authenticated: undefined,
  refreshToken: undefined,
  subject: undefined,
  responseMode: undefined,
  responseType: undefined,
  flow: undefined,
  realmAccess: undefined,
  resourceAccess: undefined,
  refreshTokenParsed: undefined,
  idToken: undefined,
  idTokenParsed: undefined,
  timeSkew: undefined,
  loginRequired: undefined,
  authServerUrl: undefined,
  realm: undefined,
  clientId: undefined,
  clientSecret: undefined,
  redirectUri: undefined,
  sessionId: undefined,
  profile: undefined,
  userInfo: undefined,
  onReady(_authenticated?: boolean) {},
  onAuthSuccess() {},
  onAuthError(_errorData: KeycloakError) {},
  onAuthRefreshSuccess() {},
  onAuthRefreshError() {},
  onAuthLogout() {},
  onTokenExpired() {},
  onActionUpdate(_status: 'success' | 'cancelled' | 'error') {},
  /**
   * required methods
   */
  init(initOptions: KeycloakInitOptions): KeycloakPromise<boolean, KeycloakError> {
    const promise = new Promise<boolean>((resolve, reject) => {
      Promise.resolve(generateToken())
        .then((response) => {
          if (customizeData.promises.init?.method !== 'reject') {
            this.token = response;
            this.authenticated = true;
            this.profile = customizeData.profile;
            this.userInfo = customizeData.userInfo;
            this.tokenParsed = mergeObject(customizeData.tokenParsed, {
              ...customizeData.profile,
              exp: getExpByToken(response),
            });
            setTokenTimeout(response);

            // init options
            if ('token' in initOptions) this.token = initOptions.token;
            if ('refreshToken' in initOptions) this.refreshToken = initOptions.refreshToken;
            if ('idToken' in initOptions) this.idToken = initOptions.idToken;
            if ('timeSkew' in initOptions) this.timeSkew = initOptions.timeSkew;
            if ('responseMode' in initOptions) this.responseMode = initOptions.responseMode;
            if ('redirectUri' in initOptions) this.redirectUri = initOptions.redirectUri;
            if ('flow' in initOptions) this.flow = initOptions.flow;

            customizeData.promises.init?.resolveCallback?.(this);
            resolve(true);
          } else {
            customizeData.promises.init?.rejectCallback?.(this);
            reject({ error: 'error', error_description: 'init' });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return createPromise<boolean, KeycloakError>(promise).promise;
  },
  logout(options?: KeycloakLogoutOptions): KeycloakPromise<void, void> {
    const promise = new Promise<void>((resolve, reject) => {
      if (customizeData.promises.logout?.method !== 'reject') {
        this.token = undefined;
        this.tokenParsed = undefined;
        this.authenticated = undefined;
        this.profile = undefined;
        this.userInfo = undefined;
        clearTokenTimeout();

        // logout options
        if (options && 'redirectUri' in options) this.redirectUri = options.redirectUri;

        customizeData.promises.logout?.resolveCallback?.(this);
        this.onAuthLogout?.();
        resolve(void 1);
      } else {
        customizeData.promises.logout?.rejectCallback?.(this);
        reject(void 1);
      }
    });
    return createPromise<void, void>(promise).promise;
  },
  updateToken(_minValidity: number): KeycloakPromise<boolean, boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      Promise.resolve(generateToken())
        .then((response) => {
          if (customizeData.promises.updateToken?.method !== 'reject') {
            this.token = response;
            this.authenticated = true;
            this.profile = customizeData.profile;
            this.userInfo = customizeData.userInfo;
            this.tokenParsed = mergeObject(customizeData.tokenParsed, {
              ...customizeData.profile,
              exp: getExpByToken(response),
            });
            setTokenTimeout(response);

            customizeData.promises.updateToken?.resolveCallback?.(this);
            this.onActionUpdate?.('success');
            resolve(true);
          } else {
            this.onActionUpdate?.('error');
            customizeData.promises.updateToken?.rejectCallback?.(this);
            reject({ error: 'error', error_description: 'updateToken' });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return createPromise<boolean, boolean>(promise).promise;
  },
  login(options?: KeycloakLoginOptions): KeycloakPromise<void, void> {
    const promise = new Promise<void>((resolve, reject) => {
      Promise.resolve(generateToken())
        .then((response) => {
          if (customizeData.promises.login?.method !== 'reject') {
            this.token = response;
            this.authenticated = true;
            this.profile = customizeData.profile;
            this.userInfo = customizeData.userInfo;
            this.tokenParsed = mergeObject(customizeData.tokenParsed, {
              ...customizeData.profile,
              exp: getExpByToken(response),
            });
            setTokenTimeout(response);

            // login options
            if (options && 'redirectUri' in options) this.redirectUri = options.redirectUri;

            customizeData.promises.login?.resolveCallback?.(this);
            resolve(void 1);
          } else {
            customizeData.promises.login?.rejectCallback?.(this);
            reject(void 1);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return createPromise<void, void>(promise).promise;
  },
  register(options?: KeycloakRegisterOptions): KeycloakPromise<void, void> {
    const promise = new Promise<void>((resolve, reject) => {
      Promise.resolve(generateToken())
        .then((response) => {
          if (customizeData.promises.register?.method !== 'reject') {
            this.token = response;
            this.authenticated = true;
            this.profile = customizeData.profile;
            this.userInfo = customizeData.userInfo;
            this.tokenParsed = mergeObject(customizeData.tokenParsed, {
              ...customizeData.profile,
              exp: getExpByToken(response),
            });
            setTokenTimeout(response);

            // register options
            if (options && 'redirectUri' in options) this.redirectUri = options.redirectUri;

            customizeData.promises.register?.resolveCallback?.(this);
            resolve(void 1);
          } else {
            customizeData.promises.register?.rejectCallback?.(this);
            reject(void 1);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return createPromise<void, void>(promise).promise;
  },
  accountManagement(): KeycloakPromise<void, void> {
    const promise = new Promise<void>((resolve, reject) => {
      if (customizeData.promises.accountManagement?.method !== 'reject') {
        customizeData.promises.accountManagement?.resolveCallback?.(this);
        resolve(void 1);
      } else {
        customizeData.promises.accountManagement?.rejectCallback?.(this);
        reject(void 1);
      }
    });
    return createPromise<void, void>(promise).promise;
  },
  loadUserProfile(): KeycloakPromise<KeycloakProfile, void> {
    const promise = new Promise<KeycloakProfile>((resolve, reject) => {
      if (customizeData.promises.loadUserProfile?.method !== 'reject') {
        customizeData.promises.loadUserProfile?.resolveCallback?.(this);
        resolve({ ...this.profile });
      } else {
        customizeData.promises.loadUserProfile?.rejectCallback?.(this);
        reject(void 1);
      }
    });
    return createPromise<KeycloakProfile, void>(promise).promise;
  },
  loadUserInfo(): KeycloakPromise<Record<string, unknown>, void> {
    const promise = new Promise<Record<string, unknown>>((resolve, reject) => {
      if (customizeData.promises.loadUserInfo?.method !== 'reject') {
        customizeData.promises.loadUserInfo?.resolveCallback?.(this);
        resolve({ ...this.userInfo });
      } else {
        customizeData.promises.loadUserInfo?.rejectCallback?.(this);
        reject(void 1);
      }
    });
    return createPromise<Record<string, unknown>, void>(promise).promise;
  },
  createLoginUrl(_options?: KeycloakLoginOptions): string {
    return customizeData.url.login;
  },
  createLogoutUrl(_options?: KeycloakLogoutOptions): string {
    return customizeData.url.logout;
  },
  createRegisterUrl(_options?: KeycloakRegisterOptions): string {
    return customizeData.url.register;
  },
  createAccountUrl(_options?: KeycloakAccountOptions): string {
    return customizeData.url.account;
  },
  isTokenExpired(minValidity?: number): boolean {
    if (!this.token) return true;
    return (minValidity || 0) > getExpByToken(this.token);
  },
  clearToken(): void {
    clearTokenTimeout();
    this.token = undefined;
    this.authenticated = undefined;
    this.profile = undefined;
    this.userInfo = undefined;
  },
  hasRealmRole(role: string): boolean {
    return Boolean(customizeData.tokenParsed.realm_access?.roles.includes(role));
  },
  hasResourceRole(role: string, resource?: string): boolean {
    const currentResource: string = resource || customizeData.tokenParsed.aud!;
    return Boolean(customizeData.tokenParsed.resource_access?.[currentResource].roles.includes(role));
  },
};

export const KeycloakMock = (_config?: Keycloak.KeycloakConfig | string): Keycloak.KeycloakInstance => ({
  ...keycloakInstanceMock,
});
