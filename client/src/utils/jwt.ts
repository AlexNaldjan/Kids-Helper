import { getUnixTime } from './date';

export interface IAuthTokenInfo {
  exp: number;
  iat: number;
  login: string;
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  try {
    const tokenInfo = token.split('.')[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const { exp, iat }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded);

    const tokenLeftTime = exp - getUnixTime() / 1000;

    const minLifeTimeForUpdate = exp - iat + LIFE_TIME_TO_UPDATE_MULTIPLIER;

    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (error) {
    console.error(error);
    return true;
  }
};
