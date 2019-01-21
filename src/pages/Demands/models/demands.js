import { queryRule, removeRule, addRule, updateRule,queryDemands } from '@/services/api';
import {getCallBackListData} from '../../../utils/commonFunc';

export default {
  namespace: 'demands',

  state: {
    dataList:[],
    pagination:{},
    searchVals:{},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDemands, payload);
      let tempDataList = getCallBackListData(response);
      yield put({
        type: 'asyncDataList',
        payload: tempDataList,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    asyncDataList(state, action) {
      return {
        ...state,
        dataList: action.payload,
      };
    },
  },
};
