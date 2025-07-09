import GameSavingLoaderAsync from './GameSavingLoaderAsync';

(async () => {
  try {
    const saving = await GameSavingLoaderAsync.load();
    console.log('Game saving (async):', saving);
  } catch (error) {
    console.error('Error loading game saving (async):', error);
  }
})();