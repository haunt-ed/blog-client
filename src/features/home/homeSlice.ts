import { Order, SortBy } from '@/types/posts/PostsQueryTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  sortBy: SortBy;
  order: Order;
}

const initialState: HomeState = {
  sortBy: SortBy.createdAt,
  order: Order.desc,
};

export const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    changeOrder: (state) => {
      state.order = state.order === Order.asc ? Order.desc : Order.asc;
    },
  },
});

export const { changeOrder, setSortBy } = HomeSlice.actions;
export default HomeSlice.reducer;
