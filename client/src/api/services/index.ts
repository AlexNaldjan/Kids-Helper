import { AxiosPromise } from 'axios';
import { axiosInstance } from '../instance';
import { ServicesResponse } from './type';

export const getServices = (): AxiosPromise<ServicesResponse[]> =>
  axiosInstance.get('http://31.129.42.58:3000/api/socialService/');
