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
  message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {newInstance,editInstance} from '../../services/api';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading,instances,common }) => ({
  instances,
  common,
  submitting: loading.effects['instances/submitInstancesForm'],
}))
@Form.create()
class InstancesForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit:false,
      pageHeaderTitle:'Start Instance',
      pageHeaderContent:'Start a service instance...',
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
        title: formatMessage({ id: 'menu.instances' })
      },{
        title:formatMessage({id:'menu.instances.instances'}),
        href:'/instances/manageInstances' 
      },{
        title:formatMessage({id:'menu.instances.startInstance'}) 
      }]
    };  
  }
  
  componentDidMount(){
    this.props.dispatch({
      type:'common/fetchCountryList'
    })
    if(this.props.location.query.info){
      this.setState({
        isEdit:true,
        pageHeaderTitle:'Edit Instance',
        pageHeaderContent:null,
        formInfo:this.props.location.query.info,
        breadcrumbList:[{
          title: formatMessage({ id: 'menu.instances' })
        },{
          title:formatMessage({id:'menu.instances.instances'}),
          href:'/instances/manageInstances' 
        },{
          title:formatMessage({id:'menu.instances.editInstance'}) 
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
        if(isEdit){
          const response = editInstance(formInfo.id,values)
          response.then(json => {
            if(json.code === 0){
              message.success('Success');
              this.props.history.push('/instances/manageInstances');
            }
          })
        }else{
          const response = newInstance(values)
          response.then(json => {
            if(json.code === 0){
              message.success('Success');
              this.props.history.push('/instances/manageInstances');
            }
          })
        }
      }
    });
  };

  turnBackToInstances = () => {
    this.props.history.push('/instances/manageInstances');
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },submitting,
      // common:{countryList}
    } = this.props;
    const {isEdit,formInfo,breadcrumbList,pageHeaderTitle,pageHeaderContent} = this.state;
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
    return (
      <PageHeaderWrapper
        breadcrumbList={breadcrumbList}
        key={isEdit}
        title={pageHeaderTitle}
        content={pageHeaderContent}
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label={<FormattedMessage id="form.companyName.label" />}>
              {getFieldDecorator('companyName', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.company
              })(<Input autoComplete='off' />)}
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
                  {/* {countryList.map((item,index)=> <Option key={index} value={item.value}>{item.label}</Option> )} */}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Sub-Domain">
              {getFieldDecorator('subDomain', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.sub_domain
              })(<Input autoComplete='off'/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Custom Domain">
              {getFieldDecorator('title',{
                initialValue:formInfo.custom_domain
              })(<Input autoComplete='off'/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Admin Email">
              {getFieldDecorator('adminEmail', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.register_email
              })(<Input autoComplete='off'/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="Admin Name">
              {getFieldDecorator('adminName', {
                rules: [
                  {
                    required: true,
                    message: 'Please Input',
                  },
                ],
                initialValue:formInfo.register_name
              })(<Input autoComplete='off' />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Admin Position">
              {getFieldDecorator('adminPosition',{
                 initialValue:formInfo.register_position
              })(<Input autoComplete='off' />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id={isEdit?"infoForm.update":"infoForm.create"}/>
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.turnBackToInstances}>
                <FormattedMessage id="infoForm.cancel"/>
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default InstancesForm;
