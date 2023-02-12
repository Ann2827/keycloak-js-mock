import { createPromise } from '../lib';

describe('createPromise:', () => {
  test('should be resolved', async () => {
    const promise = new Promise<boolean>((resolve) => {
      expect.assertions(2);
      resolve(true);
    });
    expect.assertions(1);
    await createPromise<boolean, boolean>(promise).promise.then((data: boolean) => expect(data).toEqual(true));
  });

  test('should be rejected', async () => {
    const promise = new Promise<boolean>((_resolve, reject) => {
      expect.assertions(2);
      reject(false);
    });
    expect.assertions(1);
    await expect(createPromise<boolean, boolean>(promise).promise).rejects.toBe(false);
  });

  test('should be success', async () => {
    const promise = new Promise<void>((resolve) => {
      expect.assertions(2);
      resolve(void 1);
    });
    expect.assertions(1);
    await createPromise<void, void>(promise).promise.success((data: void) => expect(data).toEqual(void 1));
  });

  // test('should be error', async () => {
  //   const promise = new Promise<void>((_resolve, reject) => {
  //     expect.assertions(2);
  //     reject(false);
  //   });
  //   expect.assertions(1);
  //   await createPromise<void, boolean>(promise).promise.error((data: boolean) => expect(data).toBe(false));
  // });
});
