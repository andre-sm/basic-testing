// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const accout = getBankAccount(100);
    expect(accout.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const accout = getBankAccount(100);
    expect(() => accout.withdraw(110)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const firstAccout = getBankAccount(100);
    const secondAccount = getBankAccount(200);
    expect(() => firstAccout.transfer(110, secondAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const accout = getBankAccount(100);
    expect(() => accout.transfer(100, accout)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const accout = getBankAccount(100);
    accout.deposit(100);
    expect(accout.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const accout = getBankAccount(100);
    accout.withdraw(70);
    expect(accout.getBalance()).toBe(30);
  });

  test('should transfer money', () => {
    const firstAccout = getBankAccount(100);
    const secondAccount = getBankAccount(200);
    firstAccout.transfer(50, secondAccount);
    expect(firstAccout.getBalance()).toBe(50);
    expect(secondAccount.getBalance()).toBe(250);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const accout = getBankAccount(100);

    const randomMock = lodash.random as jest.Mock;
    randomMock.mockResolvedValueOnce(70);
    randomMock.mockResolvedValueOnce(1);

    const balance = await accout.fetchBalance();
    expect(balance).toBe(70);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const accout = getBankAccount(100);
    const fetchBalanceSpy = jest.spyOn(accout, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValueOnce(70);

    await accout.synchronizeBalance();
    const balance = accout.getBalance();
    expect(balance).toBe(70);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const accout = getBankAccount(100);
    const fetchBalanceSpy = jest.spyOn(accout, 'fetchBalance');
    fetchBalanceSpy.mockResolvedValueOnce(null);

    await expect(accout.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
