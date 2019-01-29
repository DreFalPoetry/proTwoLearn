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
  Checkbox,
  AutoComplete,
  message,
  Tag,
  Switch
} from 'antd';
import styles from '@/css/common.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const InputGroup = Input.Group;

@Form.create()
@connect(({ loading ,common}) => ({
  common,
  submitting: loading.effects['campaigns/submitStepOneForm'],
}))
class StepOneForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      type:1,
      formInfo:{},
    }
  }

  changeType = (e) => {
    this.setState({
      type:e.target.value
    })
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
  }

  render(){
    const {
      form: { getFieldDecorator, getFieldValue },submitting,
      common,isEdit
    } = this.props;
    const {formInfo,type} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
        // md: { span: 13 },
      },
    };

    const trackingLinkExtra = (
      <div className={styles.extraExplain}>
        <p>Please change below macro in the tracking link.</p>
        <p><code>{`{clickid}/{Ref}/{TransactionID}/{aff_sub}`}</code> is replaced by <code>{'{click_id}'}</code></p>
        <code>{`{PublisherID}`}</code> is replaced by <code>{'{aff_id}'}</code>
      </div>
    );

    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '40px',
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Type">
          {getFieldDecorator('type', {
            initialValue:formInfo.type?formInfo.type:1
          })(
            <Radio.Group  buttonStyle="solid" onChange={this.changeType}>
              <Radio.Button value={1}>Google Playstore</Radio.Button>
              <Radio.Button value={2}>Apple APP Store</Radio.Button>
              <Radio.Button value={3}>Other</Radio.Button>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Campaign Name">
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
        {type === 3 ? (
          <Fragment>
            <FormItem {...formItemLayout} label="Category">
              {getFieldDecorator('category', {
                initialValue:formInfo.category,
                rules: [
                  {
                    required: true,
                    message: 'Please Select',
                  },
                ],
              })(
                <Select allowClear  placeholder="Select">
                  <Option value={1}>Category One</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Description">
              {getFieldDecorator('description', {
                initialValue:formInfo.description
              })(<TextArea rows={4} autoComplete="off"/>)}
            </FormItem>
          </Fragment>
        ):null}
        <FormItem {...formItemLayout} 
          label="Preview Link"
          extra="System will fetch app information from online store through preview link."
        >
          {getFieldDecorator('preview_link', {
            rules: [
              {
                required: true,
                message: 'Please Input',
              },
            ],
            initialValue:formInfo.preview_link
          })(<Input autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} 
          label="Tracking Link"
          extra={trackingLinkExtra}
        >
          {getFieldDecorator('preview_link', {
            rules: [
              {
                required: true,
                message: 'Please Input',
              },
            ],
            initialValue:formInfo.preview_link
          })(<Input autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Pay For">
          {getFieldDecorator('pay_for', {
            initialValue:formInfo.pay_for,
            rules: [
              {
                required: true,
                message: 'Please Select',
              },
            ],
          })(
            <Select allowClear  placeholder="Select">
              <Option value={1}>Category One</Option>
              <Option value={2}>Category One</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Pay for Dup">
          {getFieldDecorator('pay_for_dup', {
            valuePropName:'checked',
            initialValue:formInfo.pay_for_dup?true:false
          })(
            <Checkbox>Pls only tick "Pay for Dup" option if one click have more than one available Conversions.</Checkbox>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Time zone for Cap">
          {getFieldDecorator('time_zone_forCap', {
            initialValue:formInfo.time_zone_forCap,
            rules: [
              {
                required: true,
                message: 'Please Select',
              },
            ],
          })(
            <Select allowClear  placeholder="Select">
              <Option value={1}>Category One</Option>
              <Option value={2}>Category One</Option>
            </Select>
          )}
        </FormItem>
        <Divider />
        {
          isEdit?(
            <FormItem {...formItemLayout} label="Phase">
              {getFieldDecorator('phase', {
                initialValue:formInfo.phase,
                rules: [
                  {
                    required: true,
                    message: 'Please Select',
                  },
                ],
              })(
                <Select allowClear  placeholder="Select">
                  <Option value={1}>Category One</Option>
                  <Option value={2}>Category One</Option>
                </Select>
              )}
            </FormItem>
          ):null
        }
        <FormItem {...formItemLayout} label="Lifetime Cycle">
          {getFieldDecorator('lifetime_cycle', {
            initialValue:[
              formInfo.startTime?formInfo.startTime.format('YYYY-MM-DD HH:mm'):null,
              formInfo.endTime?formInfo.endTime.format('YYYY-MM-DD HH:mm'):null
            ],
            rules: [
              {
                required: true,
                message: 'Please Select',
              },
            ],
          })(
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['Start Time', 'End Time']}
            />
          )}
        </FormItem>
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
            <Select allowClear  placeholder="Select">
              <Option value={1}>Category One</Option>
              <Option value={2}>Category One</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} 
          label="Net Payout"
        >
          {getFieldDecorator('net_payout', {
            rules: [
              {
                required: true,
                message: 'Please Input',
              },
            ],
            initialValue:formInfo.net_payout
          })(<Input autoComplete="off"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="Slab Price" style={{marginBottom:0}}>
          {getFieldDecorator('slab_price', {
            valuePropName:'checked',
            initialValue:formInfo.slab_price?true:false
          })(
            <Checkbox>Pls only tick slab price option if the price is not fixed.</Checkbox>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label=" " colon={false}>
          {getFieldDecorator('slab_price_remark', {
            initialValue:formInfo.slab_price_remark?true:false
          })(
            <TextArea rows={4} autoComplete="off"/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Lifetime Cap">
          <InputGroup compact>
            <Select style={{width:'20%'}} defaultValue="Zhejiang">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
            <Input style={{width:'80%'}}/>
          </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="Daily Cap">
          <InputGroup compact>
            <Select style={{width:'20%'}} defaultValue="Zhejiang">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
            <Input style={{width:'80%'}}/>
          </InputGroup>
        </FormItem>
        <FormItem {...formItemLayout} label="Cap Follows">
          {getFieldDecorator('cap_follows', {
            initialValue:formInfo.cap_follows?formInfo.cap_follows:1
          })(
            <Radio.Group>
              <Radio value={1}>Total Cap</Radio>
              <Radio value={2}>Daily Cap</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Cap Controlled By">
          {getFieldDecorator('cap_follows_by', {
            initialValue:formInfo.cap_follows_by?formInfo.cap_follows_by:1
          })(
            <Radio.Group>
              <Radio value={1}>Total Conversion</Radio>
              <Radio value={2}>Valid Conversion</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Payable conversion as per">
          {getFieldDecorator('payable_conversion_as_per', {
            initialValue:formInfo.payable_conversion_as_per?formInfo.payable_conversion_as_per:1
          })(
            <Radio.Group>
              <Radio style={radioStyle} value={1}>Total conversion deducting total fraud</Radio>
              <Radio style={radioStyle} value={2}>Daily conversion deducting total fraud</Radio>
              <Radio style={radioStyle} value={3}>Daily conversion deducting daily fraud</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <Divider />
        <FormItem {...formItemLayout} label="KPI Metrics">
          {getFieldDecorator('kpi_metrics', {
            valuePropName:'checked',
            initialValue:formInfo.kpi_metrics?true:false
          })(
            <Switch/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Fraud Metrics">
          {getFieldDecorator('fraud_metrics', {
            valuePropName:'checked',
            initialValue:formInfo.fraud_metrics?true:false
          })(
            <Switch/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Conversion report sent by">
          {getFieldDecorator('conversion_report_sent_by', {
            initialValue:formInfo.conversion_report_sent_by?formInfo.conversion_report_sent_by:1
          })(
            <Radio.Group>
              <Radio value={1}>Online</Radio>
              <Radio value={2}>Offline</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Quality report sent by">
          {getFieldDecorator('quality_report_sent_by', {
            initialValue:formInfo.quality_report_sent_by?formInfo.quality_report_sent_by:1
          })(
            <Radio.Group>
              <Radio value={1}>Online</Radio>
              <Radio value={2}>Offline</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Conversion postback fired per">
          {getFieldDecorator('conversion_postback_fired_per', {
            initialValue:formInfo.conversion_postback_fired_per,
            rules: [
              {
                required: true,
                message: 'Please Select',
              },
            ],
          })(
            <Select allowClear  placeholder="Select">
              <Option value={1}>Category One</Option>
              <Option value={2}>Category One</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Activated event postback">
          {getFieldDecorator('activated_event_postback', {
            initialValue:formInfo.activated_event_postback,
          })(
            <Select allowClear  placeholder="Select">
              <Option value={1}>Category One</Option>
              <Option value={2}>Category One</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}

export default StepOneForm;