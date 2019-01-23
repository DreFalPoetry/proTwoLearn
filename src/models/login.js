import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { userLogin, userLogout, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status:null
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      if(response && response.code === 0){
        response.currentAuthority = 'admin';
        response.status = 'ok';
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        // Login successfully
        reloadAuthorized();
        localStorage.setItem('newUserinfo',JSON.stringify(response.userinfo));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }else if(response && response.code === 1){
        response.status = 'error';
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, {call, put }) {
      const response = yield call(userLogout);
      if(response && response.code === 0){
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status:payload.status,
        userinfo: payload.userinfo,
      };
    },
  },
};
