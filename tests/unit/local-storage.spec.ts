import globalSetup from '../_global-setup';
import localStorage from '../../src/access/localStorage';

beforeAll(() => {
  globalSetup.setUp();
});

describe('localStorage.ts', () => {
  it('set', () => {
    const data = {
      key: 'key-1',
      content: 'content-1',
    };

    const success = localStorage.set(data.key, data.content);
    expect(success).toBe(true);
  });

  it('get', () => {
    const success = localStorage.get('key-1');
    expect(success).toBe('content-1');
  });

  it('remove', () => {
    localStorage.remove('key-1');
    const success = localStorage.get('key-1');
    expect(success).toBe(null);
  });
});
