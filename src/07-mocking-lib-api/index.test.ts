// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((func) => func),
  };
});

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/products';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValue({ data: 'some data' });

    await throttledGetDataFromApi(relativePath);
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValue({ data: 'some data' });

    await throttledGetDataFromApi(relativePath);
    expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValue({ data: 'some data' });

    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toBe('some data');
  });
});
