import {Message} from 'antd';
export function getCallBackListData(res) {
  if(res){
    if(res.code === 0){
      let tempDataList = res.info || [];
      tempDataList.map((item,index)=>{
        item.uniqueKey = index
      })
      return tempDataList;
    }else{
      if(res.code === 1){
        Message.warn(res.info)
        return []
      }
      return []
    }
  }
  Message.error('Service Error');
  return [];
}