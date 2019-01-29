import React, { Component } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '@/css/common.less';
import StepOneForm from './stepOne';

const Step = Steps.Step;

class CampaignForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit:false,
      pageHeaderTitle:'New Campaign',
      breadcrumbList:[{
        title: formatMessage({ id: 'menu.campaigns' })
      },{
        title:formatMessage({id:'menu.campaigns.campaigns'}),
        href:'/campaigns/manageCampaigns' 
      },{
        title:formatMessage({id:'menu.campaigns.newCampaign'}) 
      }],
      currentStep:0
    };  
  }

  render() {
    const {isEdit,breadcrumbList,pageHeaderTitle,currentStep} = this.state;
    return (
      <PageHeaderWrapper
        breadcrumbList={breadcrumbList}
        key={isEdit}
        title={pageHeaderTitle}
      >
        <Card bordered={false}>
          <div className={styles.campaignFormWrapper}>
            <Steps size="small" current={currentStep}>
              <Step title="Basis Info" />
              <Step title="Targeting" />
              <Step title="Creative" />
              <Step title="Payment" />
            </Steps>
            <div className={styles.stepFormWrapper}>
              {
                currentStep === 0 ? <StepOneForm isEdit={isEdit}/> :null
              }
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default CampaignForm;