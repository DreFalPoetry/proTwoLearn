import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
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
@connect(({ demands, loading }) => ({
  demands,
  loading: loading.models.demands,
}))
class TableList extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Demand Type',
      dataIndex: 'demand_type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Partner',
      dataIndex: 'partner',
    },
    {
      title: 'Sales',
      dataIndex: 'sales',
    },
    {
      title: 'PM',
      dataIndex: 'pm',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
    },
    {
      title: 'Conversions',
      dataIndex: 'conversions',
    },
    {
      title: 'CR,%',
      dataIndex: 'cr',
    },
    {
      title: 'EPC',
      dataIndex: 'epc',
    },
    {
      title: 'Spend',
      dataIndex: 'spend',
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
    },
    {
      title: 'ROI,%',
      dataIndex: 'roi',
    },
    {
      title: 'Action',
      dataIndex: '',
      render:(text,record) => {
        const setMenu = (
          <Menu>
            <Menu.Item key="1">
              Ban
            </Menu.Item>
            <Menu.Item key="2">
              reOpen
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
    const { dispatch } = this.props;
    dispatch({
      type: 'demands/fetch',
    });
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'demands/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'demands/fetch',
      payload: {},
    });
  };

  searchFormSubmit = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'demands/fetch',
        payload: values,
      });
    });
  };

  renderSearchForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.searchFormSubmit} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          {/* <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col> */}
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

  newDemand = () =>{
    router.push({
      pathname: '/demands/newDemand',
    });
  }

  editRowInfo = (record) => {
    this.props.history.push({
      pathname:'/demands/editDemand',
      query:{info:record},
    })
  }

  render() {
    const { demands:{dataList}, loading } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div>
            <div className={styles.searchFormWrapper}>{this.renderSearchForm()}</div>
            <div className={styles.operateWrapper}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                  <Button icon="plus" onClick={this.newDemand}>New Demand</Button>
                </Col>
                <Col md={16} sm={24}>
                  <div className={styles.rightOptWrapper}>
                    <label>Statistics By Recently：</label>
                    <Select defaultValue="1" allowClear style={{ width: 230 }}>
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
                size='small'
                rowKey='uniqueKey'
                loading={loading}
                dataSource={dataList}
                columns={this.columns}
                pagination={{
                  showSizeChanger:true,
                  pageSizeOptions:['10', '20', '50', '100'],

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
