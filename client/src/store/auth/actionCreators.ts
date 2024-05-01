import { Dispatch } from 'redux';
import api from '../../api';
import { ILoginRequest } from '../../api/auth/type';
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

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    {
      try {
        dispatch(loginStart());

        const res = await api.auth.login(data);
        dispatch(loginSuccess(res.data.accessToken));
        dispatch(getProfile(data));
      } catch (error: any) {
        console.log(error);
        dispatch(loginFailure(error.message));
      }
    }
  };

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    {
      try {
        await api.auth.logout();
        dispatch(logoutSuccess());
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };
export const getProfile =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loadProfileStart());

      const res = await api.auth.getProfile(data);

      dispatch(loadProfileSuccess(res.data));
    } catch (error: any) {
      console.log(error);
      dispatch(loadProfileFailure(error.message));
    }
  };

export const getAccessToken = () => (): string | null => {
  try {
    const accessToken = store.getState().auth.authData.accessToken;
    return accessToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
