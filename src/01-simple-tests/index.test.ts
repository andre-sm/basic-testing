// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 7, action: Action.Add })).toBe(12);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 12, b: 5, action: Action.Subtract })).toBe(7);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 7, action: Action.Multiply })).toBe(49);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 14, b: 2, action: Action.Divide })).toBe(7);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 3, action: Action.Exponentiate })).toBe(
      343,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 14, b: 2, action: 'Action' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 14, b: '2', action: Action.Multiply })).toBe(
      null,
    );
    expect(simpleCalculator({ a: null, b: 2, action: Action.Multiply })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 'null', b: null, action: Action.Multiply }),
    ).toBe(null);
  });
});
