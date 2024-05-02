import { AxiosPromise } from 'axios';
import { axiosInstance } from '../instance';
import { ILoginRequest, ILoginResponse } from './type';
import Endpoints from '../endpoints';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);

export const logout = (): AxiosPromise => {
  return axiosInstance.get(Endpoints.AUTH.LOGOUT);
};

export const getProfile = (params: ILoginRequest): AxiosPromise<string> =>
  axiosInstance.post(Endpoints.AUTH.PROFILE, params);

export const refreshToken = (): AxiosPromise<ILoginResponse> =>
  axiosInstance.get(Endpoints.AUTH.REFRESH);