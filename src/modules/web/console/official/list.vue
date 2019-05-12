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
    <Table class="table" size="small" ref="selection" :columns="columns" :data="tableData"></Table>
  </div>
  <div
    v-else
    class="wrapper"
    style="display:flex;flex-direction:row;justify-content: center;
  align-items: flex-start;"
  >
    <pv138-authorize-prompt></pv138-authorize-prompt>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AuthorizePrompt } from '@/components/';

@Component({
  components: {
    [AuthorizePrompt.name]: AuthorizePrompt
  }
})
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
      key: 'type',
      width: 90
    },
    {
      title: '认证状态',
      key: 'status',
      width: 90
    },
    {
      title: '粉丝数',
      key: 'fans',
      width: 90
    },
    {
      title: '互动粉丝数',
      key: 'actfans',
      width: 100
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
    /*{
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
    }*/
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

.tips {
  div {
    border: solid 1px #eef9ff;
    border-radius: 10px;
    background-color: #eef9ff;
    padding: 10px;
    margin: 10px;
    .icon {
      font-size: 35px;
      margin-right: 15px;
      color: #2781ee;
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

