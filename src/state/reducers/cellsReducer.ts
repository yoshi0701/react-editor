import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  // after immer refactoring no need return type annotation
  // (state: CellsState = initialState, action: Action): CellsState => {
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        // before immer refactoring
        // return {
        //   ...state,
        //   data: {
        //     ...state.data,
        //     [id]: {
        //       ...state.data[id],
        //       content: content
        //     }
        //   }
        // };

        // after immer refactoring
        state.data[id].content = content;
        // just syntax error revision
        return;
      case ActionType.DELETE_CELL:
        return state;
      case ActionType.MOVE_CELL:
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
