import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row, 
  Col,
  Divider,
  Checkbox,
  AutoComplete,
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../css/common.less';
import TableForm from './TableForm';
import {newSupply,editSupply} from '../../services/api';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading,supplies}) => ({
  supplies,
  submitting: loading.effects['instances/submitInstancesForm'],
}))
@Form.create()
class SuppliesForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit:false,
      formInfo:{
        company:'',
        country:'',
        sub_domain:'',
        custom_domain:'',
        register_email:'',
        register_name:'',
        register_position:'',
      },
      breadcrumbList:[{
        title: formatMessage({ id: 'menu.supplies' })
      },{
        title:formatMessage({id:'menu.supplies.supplies'}),
        href:'/supplies/manageSupplies' 
      },{
        title:formatMessage({id:'menu.supplies.newSupply'}) 
      }]
    };  
  }
  
  componentDidMount(){
    if(this.props.location.query.info){
      this.setState({
        isEdit:true,
        formInfo:this.props.location.query.info,
        breadcrumbList:[{
          title: formatMessage({ id: 'menu.supplies' })
        },{
          title:formatMessage({id:'menu.supplies.supplies'}),
          href:'/supplies/manageSupplies' 
        },{
          title:formatMessage({id:'menu.supplies.editSupply'}) 
        }]
      })
    }
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    const {isEdit,formInfo} = this.state;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        if(isEdit){
          const response = editSupply(formInfo.id,values)
          response.then(json => {
            if(json.code === 0){
              message.success('Success');
              this.props.history.push('/supplies/manageSupplies');
            }
          })
        }else{
          const response = newSupply(values)
          response.then(json => {
            if(json.code === 0){
              message.success('Success');
              this.props.history.push('/supplies/manageSupplies');
            }
          })
        }
      }
    });
  };

  turnBackToSupplies = () => {
    this.props.history.push('/supplies/manageSupplies');
  }

  searchCompany = (value) => {
    if (value && value.length > 2) {
      this.props.dispatch({
        type: 'supplies/fetchCompany',
        payload: {keyword:value},
      });
    }
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },submitting,supplies:{companyDataList}
    } = this.props;
    const {isEdit,formInfo,breadcrumbList} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    let headerSettings = {
      breadcrumbList,
      key:isEdit,
      title:isEdit?'Edit Supply':'New Supply',
    }

    return (
      <PageHeaderWrapper
        {...headerSettings}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <Row><Col xs={24} sm={7}><h2 className={styles.infoFormStepHeader}>Basic Info</h2></Col></Row>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.name
              })(<Input autoComplete="off"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Company">
              {getFieldDecorator('company', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.company
              })(
                <AutoComplete
                  dataSource={companyDataList}
                  onSearch={this.searchCompany}
                  placeholder="Search"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Country">
              {getFieldDecorator('country', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.country
              })(
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="get">GET</Option>
                  {/* {countryList.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option> )} */}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="State">
              {getFieldDecorator('state', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.state
              })(
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="get">GET</Option>
                  {/* {countryList.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option> )} */}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="City">
              {getFieldDecorator('city', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.city
              })(
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="get">GET</Option>
                  {/* {countryList.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option> )} */}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Address">
              {getFieldDecorator('address',{
                initialValue:formInfo.address
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Website">
              {getFieldDecorator('website', {
                initialValue:formInfo.website
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Remark">
              {getFieldDecorator('remark', {
                initialValue:formInfo.remark
              })(<TextArea rows={4}/>)}
            </FormItem>
            <Divider />
            <Row><Col xs={24} sm={7}><h2 className={styles.infoFormStepHeader}>Advenced Settings</h2></Col></Row>
            <FormItem {...formItemLayout} label="Tracking Template">
              {getFieldDecorator('tracking_template', {
                initialValue:formInfo.tracking_template
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Postback Method">
              {getFieldDecorator('postback_method', {
                initialValue:formInfo.postback_method,
                rules: [
                  {
                    required: true,
                    message: 'Please Select',
                  },
                ],
              })(
                <Select allowClear>
                  <Option value="get">GET</Option>
                  <Option value="post">POST</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Postback URL">
              {getFieldDecorator('postback_url', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.postback_url
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Open Market through S2s API">
              {getFieldDecorator('open_market', {
                initialValue:formInfo.open_market,
                rules: [
                  {
                    required: true,
                    message: 'Please Select',
                  },
                ],
              })(
                <Select allowClear>
                  <Option value="1">Limited</Option>
                  <Option value="2">Less than 2 redirections</Option>
                  <Option value="3">Less than 3 redirections</Option>
                  <Option value="4">Less than 4 redirections</Option>
                  <Option value="5">All avaliable offers</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Demand Blacklists">
              {getFieldDecorator('demand_blacklists', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.demand_blacklists
              })(
                <Input />
              )}
            </FormItem>
            <div className={styles.infoFormCheckBoxWrapper}>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <Checkbox>Is Incentive Traffic?</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <Checkbox>Support API</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <Checkbox>Allow Optimization</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <Checkbox>Send Recommend Emails</Checkbox>
                </Col>
              </Row>
            </div>
            <Divider />
            <Row><Col xs={24} sm={7}><h2 className={styles.infoFormStepHeader}>Payment</h2></Col></Row>
            <FormItem {...formItemLayout} label="Currency">
              {getFieldDecorator('currency', {
                initialValue:formInfo.currency,
                rules: [
                  {
                    required: true,
                    message: 'Please Select',
                  },
                ],
              })(
                <Select allowClear>
                  <Option value="USD">$</Option>
                  <Option value="ruby">ruby</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Billing Term">
              {getFieldDecorator('billing_term', {
                initialValue:formInfo.billing_term,
                rules: [
                  {
                    required: true,
                    message: 'Please Select',
                  },
                ],
              })(
                <Select allowClear>
                  <Option value="30">30 Days</Option>
                  <Option value="40">40 Days</Option>
                </Select>
              )}
            </FormItem>
            <Divider />
            <Row><Col xs={24} sm={7}><h2 className={styles.infoFormStepHeader}>Relationship</h2></Col></Row>
            <FormItem {...formItemLayout} label="BD">
              {getFieldDecorator('bd', {
                initialValue:formInfo.bd
              })(
                <Select allowClear>
                  <Option value="1">Tom</Option>
                  <Option value="2">Jeny</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="AM">
              {getFieldDecorator('am', {
                initialValue:formInfo.am
              })(
                <Select allowClear>
                  <Option value="1">Tom</Option>
                  <Option value="2">Jeny</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id={isEdit?"infoForm.update":"infoForm.create"}/>
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.turnBackToSupplies}>
                <FormattedMessage id="infoForm.cancel"/>
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="Manage Members" bordered={false}>
          <TableForm />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SuppliesForm;
