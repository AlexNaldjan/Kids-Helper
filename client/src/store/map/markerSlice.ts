import { createSlice } from '@reduxjs/toolkit';
import { ServicesResponse } from '../../api/services/type';

interface MarkerState {
  markers: ServicesResponse[];
}

const initialState: MarkerState = {
  markers: [],
};

const markersSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    setMarkers(state, action) {
      state.markers = action.payload;
    },
  },
});

export const { setMarkers } = markersSlice.actions;
export default markersSlice.reducer;
