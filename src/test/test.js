import { sum } from './sum';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

/**
 * Test to Test sum function
 */
describe('sum function', () => {
  it('sums up two number', () => {
    expect(sum(1, 2)).to.eql(3);
  });
});
