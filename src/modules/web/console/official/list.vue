<template>
  <div>
    <div class="form-area">
      <Form ref="formValidate" inline="true" :model="formValidate" :rules="ruleValidate">
        <FormItem prop="name">
          <Select class="sel" v-model="model2" size="small">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name">
          <Select class="sel" v-model="model2" size="small">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name">
          <Select class="sel" v-model="model2" size="small">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name">
          <Input class="sel" suffix="ios-search" size="small" placeholder="搜索公众号"/>
        </FormItem>
      </Form>
      <Button type="primary" size="small">
        <Icon type="md-add" />添加公众号</Button>
    </div>
    <div class="table">
      <Table size="small" ref="selection" :columns="columns4" :data="data1"></Table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class OfficialList extends Vue {
  protected columns4 = [
    {
      type: 'selection',
      width: 60,
      align: 'center'
    },
    {
      title: '公众号',
      key: 'name'
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
      key: 'ops'
    }
  ];
  protected data1 = [
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
</style>

