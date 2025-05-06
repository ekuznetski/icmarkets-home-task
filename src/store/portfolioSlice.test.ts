import portfolioReducer, { addCoin, removeCoin } from './portfolioSlice';

const initialState = { coins: {} };

const testCoin = { id: 'btc', name: 'Bitcoin', symbol: 'btc' };

describe('portfolioSlice', () => {
  it('should return the initial state', () => {
    expect(portfolioReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle addCoin', () => {
    const nextState = portfolioReducer(initialState, addCoin(testCoin));
    expect(nextState.coins).toHaveProperty('btc');
    expect(nextState.coins['btc']).toEqual(testCoin);
  });

  it('should handle removeCoin', () => {
    const stateWithCoin = { coins: { btc: testCoin } };
    const nextState = portfolioReducer(stateWithCoin, removeCoin('btc'));
    expect(nextState.coins).not.toHaveProperty('btc');
  });
});
