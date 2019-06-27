const { expect } = require('chai');
const wrap = require('./wrap');

describe('wrap', () => {
  it('Returns a string', () => {
    expect(wrap('', 10)).to.equal('');
  });
  it('If the column length is less or equal to than the first argument, it returns the arugument', () => {
    expect(wrap('Lorem ipsum dolor', 17)).to.equal('Lorem ipsum dolor');
  });
  it('Line.length should be equal to the second argument', () => {
    expect(
      wrap(
        'Lorem ipsum dolor sit eu amet, elit na magna sem amet nulla vel purus ac ligula.',
        20
      )
    ).to.equal(
      'Lorem ipsum dolor\nsit eu amet, elit na\nmagna sem amet nulla\nvel purus ac ligula.'
    );
  });
});
