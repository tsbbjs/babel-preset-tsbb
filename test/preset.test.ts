import preset from '../';

it('preset test case', () => {
  const conf = preset({}, {});
  expect(Object.keys(conf)).toEqual(['presets', 'plugins']);
  expect(conf.presets.length).toBe(2);
});