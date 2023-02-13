import { customize, initialData, customizeData } from '../lib/customize';

describe('customize:', () => {
  test('profile: customizeData should be updated', () => {
    const data = { firstName: 'Ann' };
    customize.profile(data);
    expect(customizeData.profile).toEqual({ ...initialData.profile, ...data });
  });

  test('userInfo: customizeData should be updated', () => {
    const data = { name: 'Ann' };
    customize.userInfo(data);
    expect(customizeData.userInfo).toEqual({ ...initialData.userInfo, ...data });
  });

  test('jwt: customizeData should be updated', () => {
    const data = { expiration: '1h' };
    customize.jwt(data);
    expect(customizeData.jwt).toEqual({ ...initialData.jwt, ...data });
  });

  test('url: customizeData should be updated', () => {
    const data = { login: 'https://test.com' };
    customize.url(data);
    expect(customizeData.url).toEqual({ ...initialData.url, ...data });
  });

  test('reset: customizeData should be reset to initial', () => {
    customize.reset();
    expect(customizeData).toEqual(initialData);
  });
});
