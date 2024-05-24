/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import api from '../../api';
import { ILoginResponse } from '../../api/auth/type';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  loadProfileFailure,
  loadProfileStart,
  loadProfileSuccess,
} from './authReducer';
import { history } from '../../utils/history';
import { store } from '..';
import { AxiosPromise } from 'axios';
import { isTokenExpired } from '../../utils/jwt';

export const loginUser =
  (data: string) =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    {
      try {
        dispatch(loginStart());
        dispatch(loginSuccess(data));
        dispatch(getProfile());
      } catch (error: any) {
        console.log(error);
        dispatch(loginFailure(error.message));
      }
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await api.auth.logout();
      dispatch(logoutSuccess());
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

export const getProfile =
  () =>
  async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      dispatch(loadProfileStart());

      const res = await api.auth.getProfile();
      dispatch(loadProfileSuccess(JSON.parse(JSON.stringify(res.data))));
    } catch (error: any) {
      console.log(error);
      dispatch(loadProfileFailure(error.message));
    }
  };

let refreshTokenRequest: AxiosPromise<ILoginResponse> | null = null;

export const getAccessToken =
  () =>
  async (dispatch: Dispatch<any>): Promise<string | null> => {
    try {
      const refreshToken = document.cookie;
      const accessToken = store.getState().auth.authData.accessToken;
      if (!accessToken || isTokenExpired(accessToken)) {
        if (refreshTokenRequest === null) {
          refreshTokenRequest = api.auth.refreshToken(refreshToken);
        }
        const res = await refreshTokenRequest;
        refreshTokenRequest = null;
        dispatch(loginSuccess(res.data.accessToken));
        return res.data.accessToken;
      }
      return accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
