<template>
  <div class="wrapper">
    <div class="header">
      <Menu class="nav" mode="horizontal" theme="none" active-name="1">
        <div class="nav-menu">
          <div class="layout-logo">
            <img src="@/assets/logo.svg">
          </div>
          <div class="layout-nav">
            <Submenu name="1">
              <template slot="title">
                <!-- <Icon type="md-send" />云推宝 -->
                微信云推宝
              </template>
              <MenuGroup title="无限群发">
                <MenuItem name="3-1">客服消息</MenuItem>
                <MenuItem name="3-2">模板消息</MenuItem>
                <MenuItem name="3-3">定时发送</MenuItem>
              </MenuGroup>
              <MenuGroup title="帮助">
                <MenuItem name="3-4">使用帮助</MenuItem>
                <MenuItem name="3-5">操作手册</MenuItem>
              </MenuGroup>
            </Submenu>
            <MenuItem name="2">
              <!-- <Icon type="md-radio-button-on" />微信小程序 -->
              微信小程序
            </MenuItem>
            <Submenu name="3">
              <template slot="title">
                <!-- <Icon type="ios-analytics" />解决方案 -->
                智能健身解决方案
              </template>
              <MenuItem name="3-1">智能单车房Saas系统</MenuItem>
              <MenuItem name="3-2">智能单车硬件</MenuItem>
            </Submenu>
            <MenuItem name="4">经典案例</MenuItem>
            <MenuItem name="5">联系我们</MenuItem>
          </div>
        </div>
        <div class="nav-opts">
          <Button class="btn" type="default" shape="circle" size="large">登录管理平台</Button>
          <Button class="btn" type="primary" shape="circle" size="large">注册</Button>
        </div>
      </Menu>
    </div>
    <Row class="banner-content">
      <div class="container banner">
        <Carousel
          class="carousel"
          v-model="value1"
          autoplay
          autoplay-speed="8000"
          trigger="hover"
          arrow="never"
        >
          <CarouselItem class="carousel-item">
            <div class="carousel-body">
              <div class="carousel-body-l">
                <div class="carousel-body-txt">
                  <p>腾讯广告 多重推广能力</p>
                  <p>高效实现您的营销目标</p>
                </div>
                <div class="carousel-body-txt-sub">
                  <p>推广品牌活动 / 推广我的公众号 / 推广我的门店 / 推广我的应用</p>
                  <p>推广我的商品 / 推广我的小游戏 / 收集销售线索 / 派发优惠券</p>
                </div>
                <div class="carousel-body-btn">
                  <Button type="primary" shape="circle" size="large">极速注册</Button>
                </div>
              </div>
              <div class="carousel-body-r"></div>
            </div>
          </CarouselItem>
          <CarouselItem class="carousel-item">
            <div class="carousel-body">
              <div class="carousel-body-l">
                <div class="carousel-body-txt">
                  <p>腾讯广告 多重推广能力</p>
                  <p>高效实现您的营销目标</p>
                </div>
                <div class="carousel-body-txt-sub">
                  <p>推广品牌活动 / 推广我的公众号 / 推广我的门店 / 推广我的应用</p>
                  <p>推广我的商品 / 推广我的小游戏 / 收集销售线索 / 派发优惠券</p>
                </div>
                <div class="carousel-body-btn">
                  <Button type="primary" shape="circle" size="large">极速注册</Button>
                </div>
              </div>
              <div class="carousel-body-r">
                <img src="@/assets/web/ban_canting.png" width="650px">
              </div>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </Row>

    <Row class="notices-content">
      <div class="container notices">
        <div class="notices-title">公告:</div>
        <div class="notice">
          <Icon type="md-notifications-outline"/>
          <a href>万橡集团组织架构全新升级。</a>
        </div>
        <div class="notice">
          <Icon type="md-notifications-outline"/>
          <a href>万橡集团今日上市！</a>
        </div>
        <div class="notice">
          <Icon type="md-notifications-outline"/>
          <a href>万橡智慧零售「收银台」正式上线。</a>
        </div>
        <div class="notice">
          <Icon type="md-notifications-outline"/>
          <a href>万橡智慧零售「收银台」正式上线。</a>
        </div>
      </div>
    </Row>

    <Row>
      <div class="container blockB" >B
          
      </div>
    </Row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  protected value1: number = 0;
}
</script>

<style lang="scss" scoped>
$containerWidth: 1200px;
.container {
  width: $containerWidth;
}
.header {
  position: fixed;
  z-index: 1000;
  background-color: white;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .nav {
    width: $containerWidth;
    padding: 40px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .nav-menu {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .layout-logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 120px;
        }
      }
      .layout-nav {
        margin-left: 30px;
      }
    }
    .nav-opts {
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .btn {
        margin-left: 15px;
      }
    }
  }
}

$carouselHeight: 420px;
.banner-content {
  margin-top: 80px;
  height: $carouselHeight;
  background-image: linear-gradient(167deg, #808695, #17233d);
  //   background-image: linear-gradient(45deg, blue, red);
  display: flex;
  flex-direction: column;
  align-items: center;
  // banner
  .banner {
    .carousel {
    //   height: 100%;
      position: relative;
      overflow: hidden;
      .carousel-item {
        text-align: center;
        color: white;
        .carousel-body {
          height: $carouselHeight;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          &-l {
            display: flex !important;
            flex-direction: column !important;
            border: soild 1px green;
            display: flex;
            flex-direction: column;
            text-align: left;
            .carousel-body-txt {
              font-size: 35px;
            }
            .carousel-body-txt-sub {
              margin-top: 15px;
              font-size: 16px;
            }
            .carousel-body-btn {
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
}

.notices-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f9;
  // notices
  .notices {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    &-title {
      font-size: 14px;
      font-style: bold;
      margin-right: 20px;
    }
    .notice {
      flex: 1;
      a {
        color: #657180;
        margin-left: 2px;
      }
      a:hover {
        color: #5cadff !important;
      }
    }
  }

  //blockB
  .blockB {
    background-color: green;
    height: 500px !important;
  }
}
</style>
