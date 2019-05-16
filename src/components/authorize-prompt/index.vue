<template>
  <Card dis-hover :bordered="false" shadow style="width:650px;margin-top:30px;">
    <p slot="title">尚未授权已认证的公众号</p>
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
      <Button type="primary" @click="openplatformLoginPageHandler">立即授权</Button>
    </div>
  </Card>
</template>

<script>
import { create } from "@/utils/comp-creater";
import { consoleHomeName } from "@/config";
export default create({
  name: "authorize-prompt",
  methods: {
    openplatformLoginPageHandler() {
      const redirectUri = window.location.href;
      const targetUrl = `${
        process.env.VUE_APP_API_BASE_URL
      }wxopen/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.open(targetUrl, "_blank");
    }
  }
});
</script>

<style lang="scss" scoped>
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

