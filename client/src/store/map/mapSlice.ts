import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  coordinates: [number, number][];
  selectedMarker: number | null;
}

const initialState: MapState = {
  coordinates: [],
  selectedMarker: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCoordinates(state, action: PayloadAction<[number, number][]>) {
      state.coordinates = action.payload;
    },
    setSelectedMarker(state, action: PayloadAction<number | null>) {
      state.selectedMarker = action.payload;
    },
  },
});

export const { setCoordinates, setSelectedMarker } = mapSlice.actions;
export default mapSlice.reducer;
