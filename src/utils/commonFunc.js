import {Message,Tag} from 'antd';
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

export function getStatusLabel(status){
  switch (status) {
    case 1:
      return  <Tag color="#ff9900">Pending-Audit</Tag>;
    case 2:
      return  <Tag color="#009900">Pending-Deploy</Tag>
    case 3:
      return  <Tag color="#009900">Running</Tag>
    case 4:
      return  <Tag color="#cc0000">Stopped</Tag>
    case 5:
      return  <Tag color="#666666">Rejected</Tag>
    case 6:
      return  <Tag color="#666666">Terminated</Tag>
    default:
      break;
  }
}

export function transFigureToPercent(figure){
  return (figure*100).toFixed(2) + '%';
}