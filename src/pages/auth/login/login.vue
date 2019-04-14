<template>
  <div class="wrapper">
    <div class="box">
      <div class="box-left">
        <div class="box-left-container">
          <Tabs :animated="false" class="tabs">
            <TabPane label="登录">
              <div style="margin-top:25px;">
                <Form>
                  <FormItem prop="mobile">
                    <Input type="text" placeholder="请输入手机号" size="large">
                      <Select slot="prepend" v-model="mobileContryCode" style="width: 110px">
                        <Option value="+86">中国大陆 +86</Option>
                      </Select>
                    </Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input type="password" placeholder="输入6～32位密码" size="large">
                      <span slot="prepend" style="display:block;width: 97px">登录密码：</span>
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" shape="circle" size="large" long>登录</Button>
                  </FormItem>
                </Form>
                <div class="under-button-links">
                  <span>
                    <Checkbox v-model="rememberWeekend">七天内免登录</Checkbox>
                  </span>
                  <span>忘记密码？</span>
                </div>
              </div>
            </TabPane>
            <TabPane label="手机动态码登录">
              <div style="margin-top:25px;">
                <Form>
                  <FormItem prop="mobile">
                    <Input type="text" placeholder="请输入手机号" size="large">
                      <Select slot="prepend" v-model="mobileContryCode" style="width: 110px">
                        <Option value="+86">中国大陆 +86</Option>
                      </Select>
                    </Input>
                  </FormItem>
                  <FormItem prop="smsCode">
                    <Input type="text" placeholder="输入4位动态码" size="large">
                      <span slot="prepend" style="display:block;width: 97px">短信验证：</span>
                      <Button
                        type="primary"
                        :loading="sendSmsCodeLoading"
                        @click="toSendSmsHandler"
                        slot="append"
                      >
                        <span v-if="!sendSmsCodeLoading">获取动态码</span>
                        <span v-else>发送中...</span>
                      </Button>
                    </Input>
                  </FormItem>

                  <FormItem>
                    <Button type="primary" shape="circle" size="large" long>登录</Button>
                  </FormItem>
                </Form>
                <span><Checkbox v-model="rememberMobile">记住手机号</Checkbox></span>
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

