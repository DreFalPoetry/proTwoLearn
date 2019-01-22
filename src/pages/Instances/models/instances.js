import { queryRule, removeRule, addRule, updateRule,queryInstances, queryCountryList } from '@/services/api';
import {getCallBackListData} from '../../../utils/commonFunc';

export default {
  namespace: 'instances',

  state: {
    dataList:[],
    pageSettings:{
      page:1,
      page_size:20,
    },
    formValues:{},
    countryList:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryInstances, payload);
      let tempDataList = getCallBackListData(response);
      yield put({
        type: 'asyncDataList',
        payload: tempDataList,
      });
    },
    *fetchCountryList(_, { call, put }) {
      const response = yield call(queryCountryList);
      if(response && response.code == 0){
        yield put({
          type: 'asyncCountryList',
          payload: response.info,
        });
      }
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
    asyncFormValues(state,{payload}) {
      return {
        ...state,
        formValues:payload
      }
    },
    asyncPageSettings(state,{payload}) {
      return {
        ...state,
        pageSettings:payload
      }
    },
    asyncCountryList(state,{payload}) {
      return {
        ...state,
        countryList:payload
      }
    }
  },
};
