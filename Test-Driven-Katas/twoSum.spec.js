const { expect } = require('chai');
const twoSum = require('./twoSum');

describe('twoSum', () => {
  it('returns an array', () => {
    expect(twoSum([1, 2, 3], 5)).to.be.deep.equal([1, 2]);
  });
  it('is a function', () => {
    expect(twoSum).to.be.a('function');
  });
});
