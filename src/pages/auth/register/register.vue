<template>
  <div class="wrapper">
    <div class="box">
      <div class="box-left">
        <div class="box-left-container">
          <h1>新用户注册</h1>
          <div style="margin-top:25px;">
            <Form>
              <FormItem prop="mobile">
                <Input type="text" placeholder="以后可以使用手机登录" size="large">
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
              <FormItem prop="password">
                <Input type="password" placeholder="设置密码" size="large">
                  <span slot="prepend" style="display:block;width: 97px">设置密码：</span>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary" shape="circle" size="large" long>注册</Button>
              </FormItem>
            </Form>
            <span>注册即表示同意《拼微客软件注册协议》</span>
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
        <div class="social-icons"><img src="@/assets/web/wechat.png" /></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./register.ts"></script>
<style lang="scss" scoped>
@import "../auth";
</style>