import GameSavingLoaderAsync from '../src/GameSavingLoaderAsync';
import read from '../src/reader';
import json from '../src/parser';

// Mock functions to control their behavior during testing
jest.mock('../src/reader');
jest.mock('../src/parser');

describe('GameSavingLoaderAsync', () => {
  beforeEach(() => {
    read.mockClear();
    json.mockClear();
  });

  test('load() should return a GameSaving object (async/await)', async () => {
    const mockData = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
    read.mockResolvedValue(new ArrayBuffer(mockData.length * 2));
    json.mockResolvedValue(mockData);

    const saving = await GameSavingLoaderAsync.load();

    expect(saving).toEqual(JSON.parse(mockData));
    expect(read).toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith(expect.any(ArrayBuffer));
  });

  test('load() should handle errors (async/await)', async () => {
    read.mockRejectedValue(new Error('Read error'));

    await expect(GameSavingLoaderAsync.load()).rejects.toThrow('Read error');
    expect(read).toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
  });
});