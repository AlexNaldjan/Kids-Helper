import { AxiosPromise } from 'axios';
import { axiosInstance } from '../instance';
import Endpoints from '../endpoints';
import { ServicesResponse } from './type';

export const getServices = (): AxiosPromise<ServicesResponse[]> =>
  axiosInstance.get(Endpoints.SOCIAL_SERVICES.SERVICES);
