import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import numeral from 'numeral';
import {
  Table,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../css/common.less';
import { getInstanceStatusLabel,transFigureToPercent } from '../../utils/commonFunc';
import { changeInstanceStatus } from '../../services/api';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


@Form.create()
@connect(({ instances, loading }) => ({
  instances,
  loading: loading.models.instances,
}))
class TableList extends PureComponent {
  state = {
    recently_statistics:undefined
  };

  columns = [
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Country',
      dataIndex: 'country',
    },
    {
      title: 'Sub-Domain',
      dataIndex: 'sub_domain',
    },
    {
      title: 'Custom Domain',
      dataIndex: 'custom_domain',
    },
    {
      title: 'Register Email',
      dataIndex: 'register_email',
    },
    {
      title: 'Register Name',
      dataIndex: 'register_name',
    },
    {
      title: 'Register Position',
      dataIndex: 'register_position',
      width:300
    },
    {
      title: 'Registed At',
      dataIndex: 'registed_at',
      width:200
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render:(text)=>{
        return getInstanceStatusLabel(text);
      }
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      render: text => numeral(text).format('0,0') 
    },
    {
      title: 'Conversions',
      dataIndex: 'conversions',
      render: text => numeral(text).format('0,0') 
    },
    {
      title: 'Spend',
      dataIndex: 'spend',
      render: text => numeral(text).format('0,0.00') 
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      render: text => numeral(text).format('0,0.00') 
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      render: text => numeral(text).format('0,0.00') 
    },
    {
      title: 'ROI,%',
      dataIndex: 'roi',
      render: text =>  transFigureToPercent(text)
    },
    {
      title: 'Action',
      dataIndex: '',
      render:(text,record) => {
        const setMenu = (
          <Menu onClick={this.changeRowStatus.bind(this,record)}>
            <Menu.Item key="1">
              Approve
            </Menu.Item>
            <Menu.Item key="2">
              Reject
            </Menu.Item>
            <Menu.Item key="3">
              Stop
            </Menu.Item>
            <Menu.Item key="4">
              Start
            </Menu.Item>
            <Menu.Item key="5">
              Terminate
            </Menu.Item>
          </Menu>
        );
        return (
          <div className={styles.tableActsWrapper}>
            <a onClick={this.editRowInfo.bind(this,record)}>Edit</a>
            <Divider type="vertical" />
            <Dropdown overlay={setMenu}>
              <a>Set <Icon type="down" /></a>
            </Dropdown>
          </div>
        )
      }
    },
  ];

  componentDidMount() {
    this.fetchDataList()
  }

  changeRowStatus = (record,{key}) => {
    const { instances:{ dataList },dispatch } = this.props;
    console.log(key);
    let params = {id:record.id,status:Number(key)};
    const response = changeInstanceStatus(params)
    response.then(json => {
      if(json.code === 0){
        message.success('Success');
        let tempDataList = dataList.map((item)=>{
          if(item.id == record.id){
            item.status = Number(key) 
          }
          return item
        })
        dispatch({
          type:'instances/asyncDataList',
          payload:tempDataList
        })
      }
    })
  }

  newInstance = () =>{
    router.push({
      pathname: '/instances/startInstance',
    });
  }

  editRowInfo = (record) => {
    this.props.history.push({
      pathname:'/instances/editInstance',
      query:{info:record},
    })
  }

  searchFormSubmit = e => {
    e.preventDefault();
    const { dispatch, form, instances:{ pageSettings:{ page_size }, formValues} } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // const formVal = fieldsValue;
      const pageSet = { page:1,page_size:page_size};
      this.fetchDataList(fieldsValue,pageSet)
      dispatch({
        type:'instances/asyncFormValues',
        payload:fieldsValue
      })
      dispatch({
        type:'instances/asyncPageSettings',
        payload:pageSet
      })
    });
  };

  searchFormReset = () => {
    const { form, dispatch ,instances:{ pageSettings:{ page_size }}} = this.props;
    form.resetFields();
    const pageSet = { page:1,page_size:page_size};
    this.fetchDataList({},pageSet)
    dispatch({
      type:'instances/asyncFormValues',
      payload:{}
    })
    dispatch({
      type:'instances/asyncPageSettings',
      payload:pageSet
    })
  };

  changeStatistics = (value) => {
    console.log(value);
    this.setState({
      recently_statistics:value
    },()=>{
      this.fetchDataList()
    })
  }

  pageChange = (page, pageSize) => {
    const pageSet = {page:page,page_size:pageSize};
    this.props.dispatch({
      type:'instances/asyncPageSettings',
      payload:pageSet,
    })
    this.fetchDataList(null,pageSet)
  }

  pageSizeChange = (current, size) => {
    const pageSet = {page:1,page_size:size}
    this.props.dispatch({
      type:'instances/asyncPageSettings',
      payload:pageSet,
    })
    this.fetchDataList(null, pageSet)
  }

  fetchDataList = (formVal,pageSet) => {
    const { dispatch, instances:{ formValues,pageSettings } } = this.props;
    const formParams = formVal || formValues;
    const pageParams = pageSet || pageSettings;
    const singleParams = {recently_statistics:this.state.recently_statistics}
    dispatch({
      type: 'instances/fetch',
      payload: {...formParams,...pageParams,...singleParams}
    });
  }

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.searchFormSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Search">
              {getFieldDecorator('keyword')(<Input placeholder="Company or Sub-Domain" autoComplete="off"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Status">
              {getFieldDecorator('status')(
                <Select placeholder="Select" allowClear style={{ width: '100%' }}>
                  <Option value="0">All</Option>
                  <Option value="1">Pending-Audit</Option>
                  <Option value="2">Pending-Deploy</Option>
                  <Option value="3">Running</Option>
                  <Option value="4">Stopped</Option>
                  <Option value="5">Rejected</Option>
                  <Option value="6">Terminated</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <div style={{ float: 'right', marginBottom: 24 ,marginRight:24}}>
            <Button type="primary" htmlType="submit">
              Query
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.searchFormReset}>
              Reset
            </Button>
          </div>
        </Row>
      </Form>
    );
  }

  render() {
    const { instances:{ dataList,pageSettings:{page,page_size} }, loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>
            <div className={`${styles.searchFormWrapper} ${styles.searchInstances}`}>{this.renderSearchForm()}</div>
            <div className={styles.operateWrapper}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <Button icon="plus" onClick={this.newInstance}>Start Instance</Button>
                </Col>
                <Col md={16} sm={24}>
                  <div className={styles.rightOptWrapper}>
                    <label>Statistics By Recently：</label>
                    <Select placeholder="Select" allowClear style={{ width: 230 }} onChange={this.changeStatistics}>
                      <Option value="1">Today</Option>
                      <Option value="2">Last 2 Days</Option>
                      <Option value="3">Last 7 Days</Option>
                    </Select>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={styles.commonTableWrapper}>
              <Table
                bordered
                scroll={{x:1500}}
                size='small'
                rowKey='uniqueKey'
                loading={loading}
                dataSource={dataList}
                columns={this.columns}
                onChange={this.handleTableChange}
                pagination={{
                  showSizeChanger:true,
                  pageSizeOptions:['10', '20', '50', '100'],
                  current:page,
                  pageSize:page_size,
                  onChange:this.pageChange,
                  onShowSizeChange:this.pageSizeChange,
                }}
              />
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
