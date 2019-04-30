<template>
  <div class="wrapper">
    <div class="box">
      <div class="box-left">
        <div class="box-left-container">
          <Tabs :animated="false" class="tabs">
            <TabPane label="登录">
              <div style="margin-top:25px;">
                <Form
                  ref="loginForm"
                  :model="loginFormData"
                  :rules="loginFormRules"
                  :show-message="true"
                >
                  <FormItem prop="account">
                    <i-input
                      type="text"
                      v-model="loginFormData.account"
                      placeholder="请输入手机号"
                      size="large"
                    >
                      <Select slot="prepend" v-model="mobileContryCode" style="width: 110px">
                        <Option value="+86">中国大陆 +86</Option>
                      </Select>
                    </i-input>
                  </FormItem>
                  <FormItem prop="password">
                    <i-input
                      type="password"
                      v-model="loginFormData.password"
                      placeholder="输入6～32位密码"
                      size="large"
                    >
                      <span slot="prepend" style="display:block;width: 97px">登录密码：</span>
                    </i-input>
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      :loading="loginLoading"
                      shape="circle"
                      size="large"
                      long
                      @click="loginHandler"
                    >
                      <span v-if="!loginLoading">登录</span>
                      <span v-else>登录中...</span>
                    </Button>
                  </FormItem>
                </Form>
                <div class="under-button-links">
                  <span>
                    <Checkbox v-model="rememberWeekend">七天内免登录</Checkbox>
                  </span>
                  <router-link class="agreement" :to="{ name: 'auth.password.forget' }">忘记密码?</router-link>
                </div>
              </div>
            </TabPane>
            <TabPane label="手机动态码登录">
              <div style="margin-top:25px;">
                <Form
                  ref="loginPhoneForm"
                  :model="loginPhoneFormData"
                  :rules="loginPhoneFormRules"
                  :show-message="true"
                >
                  <FormItem prop="account">
                    <i-input
                      type="text"
                      v-model="loginPhoneFormData.account"
                      placeholder="请输入手机号"
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
                      v-model="loginPhoneFormData.secCode"
                      placeholder="输入4位动态码"
                      size="large"
                    >
                      <span slot="prepend" style="display:block;width: 97px">短信验证：</span>
                      <pv138-cd-button
                        label="获取动态码"
                        :payload="loginPhoneFormData.account"
                        :status="cdButtonStatus"
                        @cdButtonLoadingProcess="cdButtonLoadingProcessHandler"
                        @cdButtonCooldownFinish="cdButtonCooldownFinishHandler"
                        slot="append"
                      ></pv138-cd-button>
                    </i-input>
                  </FormItem>

                  <FormItem>
                    <Button
                      :loading="loginPhoneLoading"
                      type="primary"
                      shape="circle"
                      size="large"
                      long
                      @click="loginPhoneHandler"
                    >
                      <span v-if="!loginLoading">登录</span>
                      <span v-else>登录中...</span>
                    </Button>
                  </FormItem>
                </Form>
                <span>
                  <Checkbox v-model="rememberMobile">记住手机号</Checkbox>
                </span>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Divider type="vertical" style="height:300px;"/>
      </div>

      <div class="box-right">
        <span>没有账号？</span>
        <a href="javascript:void();" @click="gotoRegisterHandler">免费注册</a>
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

<script lang="ts" src="./login.ts"></script>
<style lang="scss" scoped>
@import "../auth";
</style>

