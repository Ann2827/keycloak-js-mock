import {generateToken, decodeToken} from '../lib/utils';
import {customizeData} from "../lib/core/customize";

describe('generateToken:', () => {

  test('generateToken fn:', async () => {
    const token = await generateToken({ data: customizeData.profile, ...customizeData.jwt });
    expect(token).toBeDefined();
  });

  test('generate and decode:', async () => {
    const token = await generateToken({ data: customizeData.profile, ...customizeData.jwt });
    const payload = decodeToken(token);
    Object.keys(customizeData.profile).forEach((key) => {
      expect(payload[key]).toBeDefined();
    });
    expect(payload.exp).toBeDefined();
  });
});
