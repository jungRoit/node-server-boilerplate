import { sum } from './sum';
import { expect } from 'chai';

describe('sum function', () => {
  it('sums up two number', () => {
    expect(sum(1, 2)).to.eql(3);
  });
});
