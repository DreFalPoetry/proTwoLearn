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
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['instances/submitInstancesForm'],
}))
@Form.create()
class InstancesForm extends Component {
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
    if(this.props.location.query.info){
      this.setState({
        isEdit:true,
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

  turnBackToInstances = () => {
    this.props.history.push('/instances/manageInstances');
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

    return (
      <PageHeaderWrapper
        breadcrumbList={breadcrumbList}
        key={isEdit}
        title={<FormattedMessage id="instances.infoForm.title" />}
        content={<FormattedMessage id="instances.infoForm.description" />}
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
              })(<Input />)}
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
                // <RangePicker
                //   style={{ width: '100%' }}
                //   placeholder={[
                //     formatMessage({ id: 'form.date.placeholder.start' }),
                //     formatMessage({ id: 'form.date.placeholder.end' }),
                //   ]}
                // />
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
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Custom Domain">
              {getFieldDecorator('title',{
                initialValue:formInfo.custom_domain
              })(<Input />)}
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
              })(<Input />)}
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
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Admin Position">
              {getFieldDecorator('adminPosition',{
                 initialValue:formInfo.register_position
              })(<Input />)}
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
