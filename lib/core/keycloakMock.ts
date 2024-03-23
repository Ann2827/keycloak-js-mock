import Keycloak, {
  KeycloakAccountOptions,
  KeycloakError,
  KeycloakInitOptions,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakProfile,
  KeycloakRegisterOptions,
  KeycloakConfig,
} from 'keycloak-js';

import { mergeObject, getExpByToken, generateToken } from '../utils';
import { customizeData } from './customize';
import { IGenerateToken } from '../types';

class KeycloakMock implements Keycloak {
  public token: Keycloak['token'] = undefined;
  public tokenParsed: Keycloak['tokenParsed'];
  public authenticated: Keycloak['authenticated'];
  public refreshToken: Keycloak['refreshToken'];
  public subject: Keycloak['subject'];
  public responseMode: Keycloak['responseMode'];
  public responseType: Keycloak['responseType'];
  public flow: Keycloak['flow'];
  public realmAccess: Keycloak['realmAccess'];
  public resourceAccess: Keycloak['resourceAccess'];
  public refreshTokenParsed: Keycloak['refreshTokenParsed'];
  public idToken: Keycloak['idToken'];
  public idTokenParsed: Keycloak['idTokenParsed'];
  public timeSkew: Keycloak['timeSkew'];
  public loginRequired: Keycloak['loginRequired'];
  public authServerUrl: Keycloak['authServerUrl'];
  public realm: Keycloak['realm'];
  public clientId: Keycloak['clientId'];
  public redirectUri: Keycloak['redirectUri'];
  public sessionId: Keycloak['sessionId'];
  public profile: Keycloak['profile'];
  public userInfo: Keycloak['userInfo'];

  constructor(config?: KeycloakConfig | string) {
    if (typeof config === 'object' && config?.realm) this.realm = config.realm;
    if (typeof config === 'object' && config?.clientId) this.clientId = config.clientId;
  }

  protected tokenTimeout: null | NodeJS.Timeout = null;
  protected clearTokenTimeout() {
    if (this.tokenTimeout) {
      clearTimeout(this.tokenTimeout);
      this.tokenTimeout = null;
    }
  };
  protected setTokenTimeout(token: string): void {
    this.clearTokenTimeout();

    const time = getExpByToken(token);
    this.tokenTimeout = setTimeout(() => {
      this.token = undefined;
      this.tokenParsed = undefined;
      this.authenticated = undefined;
      this.onTokenExpired?.();
    }, time * 1000);
  };

  public init(initOptions: KeycloakInitOptions): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Promise.resolve(generateToken({ data: customizeData.profile as IGenerateToken['data'], ...customizeData.jwt }))
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
            this.setTokenTimeout(response);

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
  };
  public logout(options?: KeycloakLogoutOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (customizeData.promises.logout?.method !== 'reject') {
        this.token = undefined;
        this.tokenParsed = undefined;
        this.authenticated = undefined;
        this.profile = undefined;
        this.userInfo = undefined;
        this.clearTokenTimeout();

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
  };
  public updateToken(_minValidity: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Promise.resolve(generateToken({ data: customizeData.profile as IGenerateToken['data'], ...customizeData.jwt }))
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
            this.setTokenTimeout(response);

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
  };
  public login(options?: KeycloakLoginOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Promise.resolve(generateToken({ data: customizeData.profile as IGenerateToken['data'], ...customizeData.jwt }))
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
            this.setTokenTimeout(response);

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
  };
  public register(options?: KeycloakRegisterOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Promise.resolve(generateToken({ data: customizeData.profile as IGenerateToken['data'], ...customizeData.jwt }))
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
            this.setTokenTimeout(response);

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
  };
  public accountManagement(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (customizeData.promises.accountManagement?.method !== 'reject') {
        customizeData.promises.accountManagement?.resolveCallback?.(this);
        resolve(void 1);
      } else {
        customizeData.promises.accountManagement?.rejectCallback?.(this);
        reject(void 1);
      }
    });
  };
  public loadUserProfile(): Promise<KeycloakProfile> {
    return new Promise<KeycloakProfile>((resolve, reject) => {
      if (customizeData.promises.loadUserProfile?.method !== 'reject') {
        customizeData.promises.loadUserProfile?.resolveCallback?.(this);
        resolve({ ...this.profile });
      } else {
        customizeData.promises.loadUserProfile?.rejectCallback?.(this);
        reject(void 1);
      }
    });
  };
  public loadUserInfo(): Promise<Record<string, unknown>> {
    return new Promise<Record<string, unknown>>((resolve, reject) => {
      if (customizeData.promises.loadUserInfo?.method !== 'reject') {
        customizeData.promises.loadUserInfo?.resolveCallback?.(this);
        resolve({ ...this.userInfo });
      } else {
        customizeData.promises.loadUserInfo?.rejectCallback?.(this);
        reject(void 1);
      }
    });
  };
  public createLoginUrl(_options?: KeycloakLoginOptions): string {
    return customizeData.url.login;
  };
  public createLogoutUrl(_options?: KeycloakLogoutOptions): string {
    return customizeData.url.logout;
  };
  public createRegisterUrl(_options?: KeycloakRegisterOptions): string {
    return customizeData.url.register;
  };
  public createAccountUrl(_options?: KeycloakAccountOptions): string {
    return customizeData.url.account;
  };
  public isTokenExpired(minValidity?: number): boolean {
    if (!this.token) return true;
    return (minValidity || 0) > getExpByToken(this.token);
  };
  public clearToken(): void {
    this.clearTokenTimeout();
    this.token = undefined;
    this.authenticated = undefined;
    this.profile = undefined;
    this.userInfo = undefined;
    this.onAuthLogout?.();
    if (this.loginRequired) {
      this.login();
    }
  };
  public hasRealmRole(role: string): boolean {
    return Boolean(customizeData.tokenParsed.realm_access?.roles.includes(role));
  };
  public hasResourceRole(role: string, resource?: string): boolean {
    const currentResource: string = resource || customizeData.tokenParsed.aud!;
    return Boolean(customizeData.tokenParsed.resource_access?.[currentResource].roles.includes(role));
  };

  public onReady(_authenticated?: boolean) {};
  public onAuthSuccess() {};
  public onAuthError(_errorData: KeycloakError) {};
  public onAuthRefreshSuccess() {};
  public onAuthRefreshError() {};
  public onAuthLogout() {};
  public onTokenExpired() {};
  public onActionUpdate(_status: 'success' | 'cancelled' | 'error') {};
}

export default KeycloakMock;
