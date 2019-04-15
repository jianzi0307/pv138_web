<template>
  <div class="wrapper">
    <div class="box">
      <div class="box-left">
        <div class="box-left-container">
          <h1>新用户注册</h1>
          <div style="margin-top:25px;">
            <Form ref="registerForm" :model="formData" :rules="formRules" :show-message="true">
              <FormItem prop="account">
                <i-input
                  type="text"
                  v-model="formData.account"
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
                  v-model="formData.secCode"
                  autocomplete="off"
                  placeholder="输入4位动态码"
                  size="large"
                >
                  <span slot="prepend" style="display:block;width: 97px">短信验证：</span>
                  <pv138-cd-button
                    label="获取动态码"
                    :payload="formData.account"
                    :status="cdButtonStatus"
                    @cdButtonLoadingProcess="cdButtonLoadingProcessHandler"
                    @cdButtonCooldownFinish="cdButtonCooldownFinishHandler"
                    slot="append"
                  ></pv138-cd-button>
                </i-input>
              </FormItem>
              <FormItem prop="password">
                <i-input
                  type="password"
                  v-model="formData.password"
                  placeholder="输入6～32位密码"
                  autocomplete="off"
                  size="large"
                >
                  <span slot="prepend" style="display:block;width: 97px">设置密码：</span>
                </i-input>
              </FormItem>
              <FormItem>
                <Button type="primary" shape="circle" size="large" long @click="registerHandler">注册</Button>
              </FormItem>
            </Form>
            <router-link class="agreement" :to="{ name: 'auth.agreement' }">注册即表示同意《拼微客软件注册协议》</router-link>
          </div>
        </div>
        <Divider type="vertical" style="height:300px;"/>
      </div>

      <div class="box-right">
        <span>已有账号？</span>
        <a href="javascript:void();" @click="gotoLoginHandler">立即登录</a>
        <Divider>
          <p>快速登录</p>
        </Divider>
        <div class="social-icons">
          <img src="@/assets/web/wechat.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./register.ts"></script>
<style lang="scss" scoped>
@import "../auth";
</style>