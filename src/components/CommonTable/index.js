import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

class CommonTable extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      title:'1111',
      dataIndex:'aaaaa'
    },{
      title:'2222',
      dataIndex:'bbbbb'
    }]
    this.data = [{
      "aaaaa":111,
      "bbbbb":222,
      uniqueKey:0
    },{
      "aaaaa":111,
      "bbbbb":222,
      uniqueKey:1
    },{
      "aaaaa":111,
      "bbbbb":222,
      uniqueKey:2
    },{
      "aaaaa":111,
      "bbbbb":222,
      uniqueKey:3
    },{
      "aaaaa":111,
      "bbbbb":222,
      uniqueKey:4
    }]
  }

  render() {
    return (
      <div className={styles.commonTableWrapper}>
        <Table
          rowKey='uniqueKey'
          bordered
          size='small'
          dataSource={this.data}
          columns={this.columns}
          pagination={{
            showSizeChanger:true,
            pageSizeOptions:['10', '20', '50', '100'],
          }}
        />
      </div>
    )
  }
}

export default CommonTable;