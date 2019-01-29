import { queryRule, removeRule, addRule, updateRule,queryDemands } from '@/services/api';
import {getCallBackListData} from '../../../utils/commonFunc';

export default {
  namespace: 'campaigns',

  state: {
    dataList:[],
    pageSettings:{
      page:1,
      page_size:20,
    },
    formValues:{},
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
    *submitStepOneForm({ payload }, { call, put }) {
      // const response = yield call(queryDemands, payload);
      // let tempDataList = getCallBackListData(response);
      // yield put({
      //   type: 'asyncDataList',
      //   payload: tempDataList,
      // });
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
    }
  },
};
