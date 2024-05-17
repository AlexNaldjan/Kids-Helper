import { AxiosPromise } from 'axios';
import { axiosInstance } from '../instance';
import { ServicesResponse } from './type';

export const getServices = (id: string): AxiosPromise<ServicesResponse[]> =>
  axiosInstance.get(`http://localhost:3000/api/socialService/${id}`);

