import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider,Checkbox,Select } from 'antd';
import isEqual from 'lodash/isEqual';
import styles from '../../css/common.less';
import {queryCampanyNumbers,addCampanyNumbers,editCampanyNumbers,deleteCampanyNumbers} from '../../services/api';
import { submitCallback } from '../../utils/commonFunc';

const Option = Select.Option;

class TableForm extends PureComponent {
  departmentOpts=[{label:'OP',value:1},{label:'BD',value:2},{label:'Finance',value:3}]

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.data || [],
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  componentDidMount(){
    if(this.props.company_id){
      const response = queryCampanyNumbers({company_id:this.props.company_id});
      response.then((json)=>{
        if(json.code == 0){
          let tempData = json.entries;
          tempData.map((item,index)=>{
            item.uniqueKey = index
          })
          this.setState({
            data:tempData
          })
        }
      })
    }
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter(item => item.uniqueKey === key)[0];
  }

  toggleEditable = (e, key) => {
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target };
        target.editable = !target.editable;
        this.setState({ data: newData });
      }else{
        if(target.isNew){
          delete target.isNew
          const params = {...target,company_id:this.props.company_id};
          const response = addCampanyNumbers(params)
          response.then((json)=>{
            if(submitCallback(json)){
              target.editable = !target.editable;
              this.setState({ data: newData ,loading:false});
            } 
          })
        }else{
          console.log('editToSave')
          const params = {...target,company_id:this.props.company_id,};
          const response = editCampanyNumbers(target.id,params)
          response.then((json)=>{
            if(submitCallback(json)){
              target.editable = !target.editable;
              this.setState({ data: newData ,loading:false});
            } 
          })
        }
      }
    }
  };

  newMember = () => {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    newData.push({
      uniqueKey: data.length,
      name: '',
      email: '',
      department: '',
      as_user: 0,
      editable: true,
      isNew: true,
    });
    console.log(newData);
    this.setState({ data: newData });
  };

  remove(key) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    let reNewData = data.filter(item => item.uniqueKey !== key);
    if(target.isNew){
      this.setState({ data: reNewData });
    }else{
      this.setState({
        loading:true
      })
      const response = deleteCampanyNumbers(target.id);
      response.then((json)=>{
        if(json && json.code === 0){
          reNewData.map((item,index)=>{
            item.uniqueKey = index
          });
          this.setState({ data: reNewData});
        }
        this.setState({
          loading:false
        })
      }) 
    }
  }

  handleFieldChange(type, fieldName, key,event) {
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (target) {
      if(type == 1){
        target[fieldName] = event.target.value ;
      }else if(type == 2){
        target[fieldName] = event;
      }else if(type == 3){
        target[fieldName] = Number(event.target.checked);
      }
      this.setState({ data: newData });
    }
  }

  saveRow(e, key) {
    e.persist();
    this.setState({
      loading: true,
    });
   
    if (this.clickedCancel) {
      this.clickedCancel = false;
      return;
    }
    const target = this.getRowByKey(key) || {};
    if (!target.name || !target.email || !target.department) {
      message.error('please fully complete');
      e.target.focus();
      this.setState({
        loading: false,
      });
      return;
    }
    // delete target.isNew;
    this.toggleEditable(e, key);
  }

  cancel(e, key) {
    this.clickedCancel = true;
    e.preventDefault();
    const { data } = this.state;
    const newData = data.map(item => ({ ...item }));
    const target = this.getRowByKey(key, newData);
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key]);
      delete this.cacheOriginData[key];
    }
    target.editable = false;
    this.setState({ data: newData });
    this.clickedCancel = false;
  }

  getPartmentText = (val) => {
    let optLabel = '';
    this.departmentOpts.map((item)=>{
      if(item.value === val){
        optLabel = item.label
      }
    })
    return optLabel;
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={this.handleFieldChange.bind(this, 1, 'name', record.uniqueKey)}
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        render: (text, record) => {
          if (record.editable && record.isNew) {
            return (
              <Input
                value={text}
                onChange={this.handleFieldChange.bind(this, 1, 'email', record.uniqueKey)}
              />
            );
          }
          return text;
        },
      },
      {
        title: 'Partment',
        dataIndex: 'department',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select value={text} style={{ width: 120 }}  onChange={this.handleFieldChange.bind(this, 2, 'department', record.uniqueKey)}>
                {
                  this.departmentOpts.map((item,index)=>(
                    <Option value={item.value} key={index}>{item.label}</Option>
                  ))
                }
              </Select>
            );
          }
          return this.getPartmentText(text);
        },
      },
      {
        title: 'as Loggin Account',
        dataIndex: 'as_user',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Checkbox checked={text}  onChange={this.handleFieldChange.bind(this, 3, 'as_user', record.uniqueKey)}/>
            );
          }
          return text?'True':'False';
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.uniqueKey)}>Add</a>
                  <Divider type="vertical" />
                  <Popconfirm title="Sure to delete the Row？" onConfirm={() => this.remove(record.uniqueKey)}>
                    <a>Delete</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.uniqueKey)}>Save</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.uniqueKey)}>Cancel</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.uniqueKey)}>Edit</a>
              <Divider type="vertical" />
              <Popconfirm title="Sure to delete the row？" onConfirm={() => this.remove(record.uniqueKey)}>
                <a>Delete</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];

    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          rowKey="uniqueKey"
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          New Member
        </Button>
      </Fragment>
    );
  }
}

export default TableForm;
