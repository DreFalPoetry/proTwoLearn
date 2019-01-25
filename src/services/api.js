import { stringify } from 'qs';
import request from '@/utils/request';
import debounceRequest from '@/utils/debounceRequest';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}


//add New api
export async function userLogin(params) {
  return request('http://192.168.31.15:8081' + '/user/login', {
    method: 'POST',
    body: params,
  });
}

export async function userLogout() {
  return request('http://192.168.31.15:8081' + '/user/logout');
}


export async function queryInstances(params) {
  return request(`/api/instances?${stringify(params)}`);
}

export async function newInstance(params) {
  return request('/api/instances',{
    method: 'POST',
    body: params,
  });
}

export async function editInstance(id,params) {
  return request('/api/instances/'+ id,{
    method: 'PUT',
    body: params,
  });
}

export async function changeInstanceStatus(params) {
  return request('/api/instances/changeStatus',{
    method: 'POST',
    body: params,
  });
}


export async function querySupplies(params) {
  return request('http://192.168.31.15:8081'+ `/supply?${stringify(params)}`);
}

export async function newSupply(params) {
  return request('http://192.168.31.15:8081' + '/supply',{
    method: 'POST',
    body: params,
  });
}

export async function editSupply(id,params) {
  return request('http://192.168.31.15:8081' + '/supply/' + id,{
    method: 'PUT',
    body: params,
  });
}

export async function changeSupplyStatus(params) {
  return request('/api/supply/changeStatus',{
    method: 'POST',
    body: params,
  });
}

export async function queryDemands(params) {
  return request('http://192.168.31.15:8081' + `/demand?${stringify(params)}`);
}

export async function changeDemandStatus(params) {
  return request('/api/demand/changeStatus',{
    method: 'POST',
    body: params,
  });
}

export async function newDemand(params) {
  return request('/demand',{
    method: 'POST',
    body: params,
  });
}

export async function editDemand(id,params) {
  return request('/demand/' + id,{
    method: 'PUT',
    body: params,
  });
}

export async function queryCountryList() {
  return request('http://192.168.31.15:8081' + `/common/regions`);
}

export async function queryRelationship() {
  return request('http://192.168.31.15:8081' + `/common/relationship`);
}

export async function queryCurrency() {
  return request('http://192.168.31.15:8081' + `/common/currency`);
}

export async function queryCampanyNumbers(params) {
	return request('http://192.168.31.15:8081' + `/member?${stringify(params)}`);
}

export async function addCampanyNumbers(params) {
	return request('http://192.168.31.15:8081' + `/member`,{
    method: 'POST',
    body: params,
  });
}

export async function editCampanyNumbers(id,params) {
	return request('http://192.168.31.15:8081' + `/member/`+ id,{
    method: 'PUT',
    body: params,
  });
}

export async function deleteCampanyNumbers(id) {
  return request('http://192.168.31.15:8081' + `/member/`+ id, {
    method: 'DELETE',
  });
}


export async function queryCampany(params) {
	return debounceRequest('http://192.168.31.15:8081' + `/common/company?${stringify(params)}`);
}

