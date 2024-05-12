import { AxiosPromise } from 'axios';
import { axiosInstance } from '../instance';
import Endpoints from '../endpoints';
import { ProfileResponse } from './type';

export const updateProfile = (): AxiosPromise<ProfileResponse> =>
  axiosInstance.put(Endpoints.PROFILE.PROFILE);
