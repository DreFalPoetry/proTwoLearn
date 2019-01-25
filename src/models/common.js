import { queryCountryList ,queryCampany,queryCurrency,queryRelationship} from '@/services/api';

export default {
  namespace: 'common',

  state: {
    countryList:[],
    stateList:[],
    cityList:[],
    companyDataList:[],
    currencyList:[],
    amsList:[],
    bdsList:[],
    salesList:[],
    pmsList:[],
    partnersList:[],
  },

  effects: {
    *fetchCountryList({payload}, { call, put }) {
      const response = yield call(queryCountryList);
      if(response && response.code == 0){
        const countryList = response.entries
        yield put({
          type: 'asyncCountryList',
          payload: countryList,
        });
        if(payload){
          const {country_code,province_geoname_id} = payload;
          let provinceList = [] ;
          let cityList = [];
          countryList.map((item)=>{
            if(item.value == country_code){
              provinceList = item.children || [];
              provinceList.map((item2)=>{
                if(item2.value == province_geoname_id){
                  cityList = item2.children || [];
                }
              })
            }
          })
          yield put({
            type: 'asyncStateList',
            payload: provinceList,
          });
          yield put({
            type: 'asyncCityList',
            payload: cityList,
          });
        }
      }
    },
    *fetchCurrencyList(_, { call, put }) {
      const response = yield call(queryCurrency);
      if(response && response.code == 0){
        yield put({
          type: 'asyncCurrencyList',
          payload: response.entries,
        });
      }
    },
    *fetchRelationshipList({payload}, { call, put }) {
      const response = yield call(queryRelationship);
      if(response && response.code == 0){
        if(payload.page_type === 'supply'){
          yield put({
            type: 'asyncAMBDList',
            payload: response,
          });
        }else if(payload.page_type === 'demand'){
          yield put({
            type: 'asyncSalePMList',
            payload: response,
          });
        }
      }
    },
    fetchCompany: [
			function*({ payload }, { call, put }) {
        const response = yield call(queryCampany, payload);
        if(response && response.code === 0 ){
          const companyTempList = response.entries || [];
					let companyList = companyTempList.map((item, index) => {
						let listItem = {};
						listItem.text = `${item.name}`;
            listItem.value = item.name;
            listItem.id = item.id;
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
    asyncStateList(state,{payload}) {
      return {
        ...state,
        stateList:payload
      }
    },
    asyncCityList(state,{payload}) {
      return {
        ...state,
        cityList:payload
      }
    },
    asyncCurrencyList(state,{payload}) {
      return {
        ...state,
        currencyList:payload
      }
    },
    asyncAMBDList(state,{payload}) {
      return {
        ...state,
        amsList:payload.ams || [],
        bdsList:payload.bds || []
      }
    },
    asyncSalePMList(state,{payload}) {
      return {
        ...state,
        salesList:payload.sales || [],
        pmsList:payload.pms || [],
        partnersList:payload.partners||[]
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
