import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCoordinates } from '../map/mapSlice';
import { ServicesResponse } from '../../api/services/type';

export const fetchCoordinates = createAsyncThunk(
  'map/fetchCoordinates',

  async (markersData: ServicesResponse[], { dispatch }) => {
    try {
      const promises = markersData.map(async marker => {
        const response = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=53ab01a5-fcd6-4af6-8795-4f7d5fdf4504&geocode=${encodeURIComponent(
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
      return coordinatesData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);
