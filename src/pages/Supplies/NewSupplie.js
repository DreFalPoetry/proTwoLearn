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

@connect(({ loading,supplies,common}) => ({
  supplies,
  common,
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
    this.props.dispatch({
      type:'common/fetchCountryList'
    })
    this.props.dispatch({
      type:'common/fetchCurrencyList'
    })
    if(this.props.location.query.info){
      this.props.dispatch({
        type:'common/fetchRelationshipList',
        payload:{page_type:'supply',company_id:this.props.location.query.info.company_id}
      })
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
        type: 'common/fetchCompany',
        payload: {name:value},
      });
    }
  }

  selectCampany = (value,option) => {
    const { companyDataList } = this.props.common;
    companyDataList.map((item)=>{
      if(item.value === value){
        if(item.id){
          this.props.dispatch({
            type:'common/fetchRelationshipList',
            payload:{page_type:'supply',company_id:item.id}
          })
        }
      }
    })
  }

  changeRegion = (value,option) => {
    console.log(option);
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },submitting,
      common:{companyDataList,countryList,stateList,cityList,currencyList,amsList,bdsList}
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
                  onSelect={this.selectCampany}
                  placeholder="Search"
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Country">
              {getFieldDecorator('country_code', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.country_code
              })(
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  onChange={this.changeRegion}
                >
                  {countryList.map((item,index)=> <Option childdata={"sdsd"} key={index} value={item.value}>{item.label}</Option> )}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="State">
              {getFieldDecorator('province_geoname_id', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.province_geoname_id
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
              {getFieldDecorator('city_geoname_id', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.city_geoname_id
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
              })(<Input autoComplete="off" />)}
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
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
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
                <Input autoComplete="off"/>
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
                <Select allowClear placeholder="Select">
                  <Option value="1">Limited</Option>
                  <Option value="2">Less than 2 redirections</Option>
                  <Option value="3">Less than 3 redirections</Option>
                  <Option value="4">Less than 4 redirections</Option>
                  <Option value="0">All avaliable offers</Option>
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
                <Input autoComplete="off"/>
              )}
            </FormItem>
            <div className={styles.infoFormCheckBoxWrapper}>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <FormItem>
                    {getFieldDecorator('is_incentive')(
                      <Checkbox>Is Incentive Traffic?</Checkbox>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <FormItem>
                    {getFieldDecorator('support_api')(
                      <Checkbox>Support API</Checkbox>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <FormItem>
                    {getFieldDecorator('allow_optimization')(
                      <Checkbox>Allow Optimization</Checkbox>
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col xs = { 24 } sm = {7}></Col>
                <Col xs = { 24 } sm ={12} md = {10}>
                  <FormItem>
                  {getFieldDecorator('accept_recommendation')(
                    <Checkbox>Send Recommend Emails</Checkbox>
                  )}
                  </FormItem>
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
                <Select placeholder="Select" allowClear>
                {
                  currencyList.map((item,index)=><Option key={index} value={item}>{item}</Option>)
                }
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
                <Select allowClear placeholder="Select">
                  <Option value={30}>30 Days</Option>
                  <Option value={60}>60 Days</Option>
                  <Option value={90}>90 Days</Option>
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
                 {bdsList.map((item,index)=>(
                  <Option value={item.id} key={index}>{item.name}</Option>
                ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="AM">
              {getFieldDecorator('am', {
                initialValue:formInfo.am
              })(
                <Select allowClear>
                {amsList.map((item,index)=>(
                  <Option value={item.id} key={index}>{item.name}</Option>
                ))}
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
