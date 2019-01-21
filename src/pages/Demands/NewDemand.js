import React, { Component ,Fragment } from 'react';
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
  Checkbox
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../css/common.less';
import TableForm from './TableForm';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
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
        title: formatMessage({ id: 'menu.demands' })
      },{
        title:formatMessage({id:'menu.demands.demands'}),
        href:'/demands/manageDemands' 
      },{
        title:formatMessage({id:'menu.demands.newDemand'}) 
      }]
    };  
  }
  
  componentDidMount(){
    if(this.props.location.query.info){
      this.setState({
        isEdit:true,
        formInfo:this.props.location.query.info,
        breadcrumbList:[{
          title: formatMessage({ id: 'menu.demands' })
        },{
          title:formatMessage({id:'menu.demands.demands'}),
          href:'/demands/manageDemands' 
        },{
          title:formatMessage({id:'menu.demands.editDemand'}) 
        }]
      })
    }
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  turnBackToDemands = () => {
    this.props.history.push('/demands/manageDemands');
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },submitting
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
            <FormItem {...formItemLayout} label="Demand Type">
              {getFieldDecorator('demand_type', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.demand_type
              })(
                <Radio.Group  buttonStyle="solid">
                  <Radio.Button value="a">Client</Radio.Button>
                  <Radio.Button value="b">Partner</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Client Type">
              {getFieldDecorator('client_type', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.client_type
              })(
                <Radio.Group  buttonStyle="solid">
                  <Radio.Button value="a">Direct</Radio.Button>
                  <Radio.Button value="b">Agency</Radio.Button>
                  <Radio.Button value="c">Affiliate Network</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Name">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.name
              })(<Input />)}
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
                <Input />
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
                <Input />
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
                <Input />
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
              })(<Input />)}
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
            <FormItem {...formItemLayout} label="Commission">
              {getFieldDecorator('commission', {
                initialValue:formInfo.commission
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Invoice Less Commission">
              {getFieldDecorator('invoice_less_commission', {
                initialValue:formInfo.invoice_less_commission
              })(
                <Checkbox>Invoice LC</Checkbox>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Kickback">
              {getFieldDecorator('kickback', {
                initialValue:formInfo.kickback
              })(
                <Input />
              )}
            </FormItem>
            {formInfo.demand_type !== 1 ? (
                <Fragment>
                  <Divider />
                  <Row><Col xs={24} sm={7}><h2 className={styles.infoFormStepHeader}>Relationship</h2></Col></Row>
                  <FormItem {...formItemLayout} label="Partner">
                    {getFieldDecorator('partner', {
                      initialValue:formInfo.partner
                    })(
                      <Select allowClear>
                        <Option value="1">Tom</Option>
                        <Option value="2">Jeny</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="Sales">
                    {getFieldDecorator('sales', {
                      initialValue:formInfo.sales
                    })(
                      <Select allowClear>
                        <Option value="1">Tom</Option>
                        <Option value="2">Jeny</Option>
                      </Select>
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="PM">
                    {getFieldDecorator('pm', {
                      initialValue:formInfo.pm
                    })(
                      <Select allowClear>
                        <Option value="1">Tom</Option>
                        <Option value="2">Jeny</Option>
                      </Select>
                    )}
                  </FormItem>
                </Fragment>
              ):null
            }
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id={isEdit?"infoForm.update":"infoForm.create"}/>
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.turnBackToDemands}>
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
