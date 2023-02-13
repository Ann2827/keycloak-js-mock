import { KeycloakPromise, KeycloakPromiseCallback } from 'keycloak-js';

function createPromise<TSuccess, TError>(fn: Promise<TSuccess>): { promise: KeycloakPromise<TSuccess, TError> } {
  // @ts-ignore
  const promise: KeycloakPromise<TSuccess, TError> = new Promise<TSuccess>(function (resolve, reject) {
    Promise.resolve(fn)
      .then((response: TSuccess) => {
        resolve(response);
      })
      .catch((error: TError) => {
        reject(error);
      });
  });
  // deprecated promise.success
  promise.success = function (callback: KeycloakPromiseCallback<TSuccess>): KeycloakPromise<TSuccess, TError> {
    this.then(function handleSuccess(value: TSuccess) {
      callback(value);
    });
    return this;
  };
  // deprecated promise.error
  promise.error = function (callback: KeycloakPromiseCallback<TError>): KeycloakPromise<TSuccess, TError> {
    this.catch(function handleError(error: TError) {
      callback(error);
    });
    return this;
  };
  return { promise };
}

export default createPromise;
