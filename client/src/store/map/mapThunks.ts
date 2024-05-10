import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCoordinates } from '../map/mapSlice';
import { MarkerDataType } from './markerSlice';

export const fetchCoordinates = createAsyncThunk(
  'map/fetchCoordinates',

  async (markersData: MarkerDataType[], { dispatch }) => {
    try {
      const promises = markersData.map(async marker => {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=92b06eec-d656-4184-8593-80fd58df7fdf&geocode=${encodeURIComponent(
            marker.address,
          )}`,
        );
        const data = await response.json();
        const foundCoordinates =
          data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
            .split(' ')
            .map(parseFloat)
            .reverse();
        return foundCoordinates;
      });
      const coordinatesData = await Promise.all(promises);
      dispatch(setCoordinates(coordinatesData));
    } catch (error) {
      console.log(error);
    }
  },
);
