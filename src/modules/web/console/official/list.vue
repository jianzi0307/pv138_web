<template>
  <div class="wrapper" v-if="tableData.length > 0">
    <div class="form-area">
      <Form ref="formValidate" inline>
        <FormItem prop="name">
          <Select class="sel" size="small">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name">
          <Select class="sel" size="small">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name">
          <Select class="sel" size="small">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name">
          <Input class="sel" suffix="ios-search" size="small" placeholder="搜索公众号"/>
        </FormItem>
      </Form>
      <Button type="primary" size="small">
        <Icon type="md-add"/>添加公众号
      </Button>
    </div>
    <div class="table">
      <Table size="small" ref="selection" :columns="columns" :data="tableData"></Table>
    </div>
  </div>
  <div v-else class="wrapper">
    <div class="tip-title">授权后管理更高效</div>
    <div class="tips">
      <div>
        <Icon class="icon" type="ios-apps-outline"/>多公众号同时管理，一键切换，轻松运营。
      </div>
      <div>
        <Icon class="icon" type="ios-bookmark-outline"/>粉丝数据实时更新，图文详情及时分析
      </div>
      <div>
        <Icon class="icon" type="ios-bonfire-outline"/>素材定时定向推送&客服消息，服务号可以发送模版消
      </div>
      <div>
        <Icon class="icon" type="ios-bug-outline"/>一键抓取图文、添加模版、精选样式排版
      </div>
    </div>
    <div class="agreement">
      <Checkbox>
        授权即表示阅读并同意
        <a href="http://www.baidu.com">《授权相关事项和风险》</a>
      </Checkbox>
      <Button type="primary">立即授权</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class OfficialList extends Vue {
  protected list = [];
  protected columns = [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: '公众号',
      key: 'name',
      width: 200,
      render: (h: any, params: any) => {
        return h('div', { style: { display: 'flex', alignItems: 'center' } }, [
          h('div', [
            h('Avatar', {
              props: {
                shape: 'square',
                src: 'https://open.weixin.qq.com/qr/code?username=pv138com'
              }
            })
          ]),
          h(
            'div',
            {
              style: {
                marginLeft: '5px',
                display: 'flex',
                flexDirection: 'column'
              }
            },
            [
              h(
                'span',
                {
                  style: {
                    width: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },
                params.row.name
              ),
              h('span', { style: { color: '#c5c8ce' } }, 'pv138com')
            ]
          )
        ]);
      }
    },
    {
      title: '账号类型',
      key: 'type'
    },
    {
      title: '认证状态',
      key: 'status'
    },
    {
      title: '粉丝数',
      key: 'fans'
    },
    {
      title: '互动粉丝数',
      key: 'actfans'
    },
    {
      title: '分组',
      key: 'group'
    },
    {
      title: '操作',
      key: 'ops',
      fixed: 'right',
      width: 220,
      render: (h: any, params: any) => {
        return h('div', [
          h(
            'Button',
            {
              props: {
                type: 'text',
                size: 'small'
              }
            },
            '新建素材'
          ),
          h(
            'Button',
            {
              props: {
                type: 'text',
                size: 'small'
              }
            },
            '自定义菜单'
          ),
          h(
            'Button',
            {
              props: {
                type: 'text',
                size: 'small'
              }
            },
            '删除'
          )
        ]);
      }
    }
  ];
  protected tableData = [
    {
      name: '拼微客',
      type: '服务号',
      status: '已认证',
      fans: 100,
      actfans: 10,
      group: '未分组'
    },
    {
      name: '老爸营养餐',
      type: '服务号',
      status: '已认证',
      fans: 100,
      actfans: 10,
      group: '未分组'
    },
    {
      name: '领跑智能运动',
      type: '服务号',
      status: '已认证',
      fans: 100,
      actfans: 10,
      group: '未分组'
    }
  ];
}
</script>


<style lang="scss" scoped>
.form-area {
  /deep/ .ivu-form-item {
    margin-bottom: 0;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.table {
  margin-top: 20px;
}

.tip-title {
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}
.tips {
  div {
    border: solid 1px #f0f0f0;
    border-radius: 10px;
    background-color: #f0f0f0;
    padding: 10px;
    margin: 10px;
    float: left;
    .icon {
      font-size: 30px;
      margin-right: 15px;
    }
  }
  overflow: hidden;
}
.agreement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>

