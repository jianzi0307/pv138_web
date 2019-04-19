<template>
  <div class="wrapper">
    <div class="box">
      <h1>找回密码</h1>
      <Steps class="steps" :current="currStep">
        <Step title="账号验证"></Step>
        <Step title="重置密码"></Step>
        <Step title="完成"></Step>
      </Steps>

      <div class="content_0" v-if="currStep === 0">
        <Form ref="step0Form" :model="step0FormData" :rules="step0FormRules" :show-message="true">
          <FormItem prop="account">
            <i-input
              type="text"
              v-model="step0FormData.account"
              placeholder="以后可以使用手机登录"
              size="large"
            >
              <Select slot="prepend" v-model="mobileContryCode" style="width: 110px">
                <Option value="+86">中国大陆 +86</Option>
              </Select>
            </i-input>
          </FormItem>
          <FormItem prop="secCode">
            <i-input
              type="text"
              v-model="step0FormData.secCode"
              autocomplete="off"
              placeholder="输入4位动态码"
              size="large"
            >
              <span slot="prepend" style="display:block;width: 97px">短信验证：</span>
              <pv138-cd-button
                label="获取动态码"
                :payload="step0FormData.account"
                :status="cdButtonStatus"
                @cdButtonLoadingProcess="cdButtonLoadingProcessHandler"
                @cdButtonCooldownFinish="cdButtonCooldownFinishHandler"
                slot="append"
              ></pv138-cd-button>
            </i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" shape="circle" size="large" long @click="nextStepHandler(1)">下一步</Button>
          </FormItem>
        </Form>
      </div>

      <div class="content_1" v-if="currStep === 1">
        <Form ref="step1Form" :model="step1FormData" :rules="step1FormRules" :show-message="true">
          <FormItem prop="password">
            <i-input
              type="password"
              v-model="step1FormData.password"
              placeholder="输入6～32位密码"
              autocomplete="off"
              size="large"
            >
              <span slot="prepend" style="display:block;width: 97px">设置密码：</span>
            </i-input>
          </FormItem>
          <FormItem prop="passwordCheck">
            <i-input
              type="password"
              v-model="step1FormData.passwordCheck"
              placeholder="再次输入以确认密码"
              autocomplete="off"
              size="large"
            >
              <span slot="prepend" style="display:block;width: 97px">确认密码：</span>
            </i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" shape="circle" size="large" long @click="nextStepHandler(2)">下一步</Button>
          </FormItem>
        </Form>
      </div>
      
      <div class="content_2" v-if="currStep === 2">
        <div class="success">
          <Icon class="icon" type="md-checkmark-circle-outline"/>
          <span>
            找回密码成功，
            <pv138-cd-text
              :cd="3"
              @cdTextCooldownFinish="cdTextCooldownFinishHandler"
            ></pv138-cd-text>后跳转
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./forget.ts"></script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .box {
    margin-top: -50px;
    width: 550px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 50px #dcdee2;
    padding: 40px 80px;

    .steps {
      margin-top: 25px;
    }
    .content_0,
    .content_1,
    .content_2 {
      margin-top: 40px;
    }
    .content_2 {
      .success {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0 60px 0;
        .icon {
          font-size: 60px;
          color: #19be6b;
          margin-bottom: 20px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>

