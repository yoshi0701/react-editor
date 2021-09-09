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
        // return state;
        // replace using immer
        delete state.data[action.payload];
        // state.order to check order is not equal to payload, then assign result to state.order
        state.order = state.order.filter((id) => id !== action.payload);

        return;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        // targetIndex is the compared target of index which direction is up ro down from index
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // check when targetIndex does not exist
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return;
      case ActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: randomId(),
        };

        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
