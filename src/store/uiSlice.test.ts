import uiReducer, { setCryptoTableSorting, resetCryptoTableSorting } from './uiSlice';
import type { SortingState } from '@tanstack/react-table';

const initialState = { cryptoTableSorting: [] };

describe('uiSlice', () => {
  it('should return the initial state', () => {
    expect(uiReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setCryptoTableSorting', () => {
    const sorting: SortingState = [{ id: 'name', desc: false }];
    const nextState = uiReducer(initialState, setCryptoTableSorting(sorting));
    expect(nextState.cryptoTableSorting).toEqual(sorting);
  });

  it('should handle resetCryptoTableSorting', () => {
    const stateWithSorting = { cryptoTableSorting: [{ id: 'name', desc: false }] };
    const nextState = uiReducer(stateWithSorting, resetCryptoTableSorting());
    expect(nextState.cryptoTableSorting).toEqual([]);
  });
});
