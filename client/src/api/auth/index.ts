import { AxiosPromise } from 'axios';
import { axios } from '../instance';
import { ILoginRequest, ILoginResponse } from './type';
import Endpoints from '../endpoints';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axios.post(Endpoints.AUTH.LOGIN, params);

export const logout = (): AxiosPromise =>
  axiosInstance.get(Endpoints.AUTH.LOGOUT);

export const getProfile = (): AxiosPromise<string> =>
  axiosInstance.get(Endpoints.AUTH.PROFILE);

export const refreshToken = (params: string): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.REFRESH, params);



