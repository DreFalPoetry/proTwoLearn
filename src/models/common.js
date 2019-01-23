import { queryCountryList ,queryCampany} from '@/services/api';

export default {
  namespace: 'common',

  state: {
    countryList:[],
    companyDataList:[],
  },

  effects: {
    *fetchCountryList(_, { call, put }) {
      const response = yield call(queryCountryList);
      if(response && response.code == 0){
        yield put({
          type: 'asyncCountryList',
          payload: response.info,
        });
      }
    },
    fetchCompany: [
			function*({ payload }, { call, put }) {
        const response = yield call(queryCampany, payload);
        console.log(response);
        if(response && response.code === 0 ){
          const companyTempList = response.info || [];
					let companyList = companyTempList.map((item, index) => {
						let listItem = {};
						listItem.text = `${item.label}`;
						listItem.value = item.value;
						listItem.key = index + 1;
						return listItem;
					});
					yield put({
						type: 'asyncCompanyDataList',
						payload: companyList,
					});
        }
			},
			{ type: 'takeLatest' },
		],
  },
  reducers: {
    asyncCountryList(state,{payload}) {
      return {
        ...state,
        countryList:payload
      }
    },
    asyncCompanyDataList(state,{payload}) {
      return {
        ...state,
        companyDataList:payload
      }
    }
  },
};
