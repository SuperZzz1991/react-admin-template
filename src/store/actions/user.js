import * as types from '../action-types';
import { reqUserInfo } from '@/api/user';

export const getUserInfo = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo({token})
      .then((response) => {
        const { data } = response;
        if (data.state === '0000') {
          const userInfo = data.data.user;
          dispatch(setUserInfo(userInfo));
          resolve(userInfo);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserToken = (token) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo,
  };
};

export const resetUser = () => {
  return {
    type: types.USER_RESET_USER,
  };
};
