import { AxiosPromise } from 'axios';
import { axios } from '../instance';
import { ILoginRequest, ILoginResponse } from './type';
import Endpoints from '../endpoints';

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axios.post(Endpoints.AUTH.LOGIN, params);

export const logout = (): AxiosPromise => {
  return axios.get(Endpoints.AUTH.LOGOUT);
};

export const getProfile = (params: ILoginRequest): AxiosPromise<string> =>
  axios.post(Endpoints.AUTH.PROFILE, params);

export const refreshToken = (): AxiosPromise<ILoginResponse> =>
  axios.get(Endpoints.AUTH.REFRESH);
