import {resolvePath} from './path-resolver';

describe('resolvePath', () => {
  it('should resolve the path to package.json', () => {
    expect(resolvePath('/foo/bar')).toBe('/foo/bar/package.json');
  });

  it('should not resolve package.json twice', () => {
    expect(resolvePath('/foo/bar/package.json')).toBe('/foo/bar/package.json');
  });
});
