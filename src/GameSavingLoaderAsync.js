import read from './reader';
import json from './parser';

export default class GameSavingLoaderAsync {
  static async load() {
    try {
      const buffer = await read();
      const data = await json(buffer);
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}