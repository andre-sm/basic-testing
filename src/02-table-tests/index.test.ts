// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 12, b: 7, action: Action.Subtract, expected: 5 },
  { a: 21, b: 15, action: Action.Subtract, expected: 6 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 3, b: 7, action: Action.Multiply, expected: 21 },
  { a: 4, b: 15, action: Action.Multiply, expected: 60 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 40, b: 10, action: Action.Divide, expected: 4 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 12, b: 3, action: Action.Exponentiate, expected: 1728 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
];

describe('simpleCalculator', () => {
  describe.each(testCases)(
    'simpleCalculator($a, $b, $action) should return $expected',
    ({ a, b, action, expected }) => {
      test(`returns ${expected}`, () => {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      });
    },
  );
});
