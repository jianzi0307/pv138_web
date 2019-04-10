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
    <div class="content">
      <div class="container">
        <Carousel class="carousel" v-model="value1" loop>
          <CarouselItem class="carousel-item">
            <div class="demo-carousel">1</div>
          </CarouselItem>
          <CarouselItem class="carousel-item">
            <div class="demo-carousel">2</div>
          </CarouselItem>
          <CarouselItem class="carousel-item">
            <div class="demo-carousel">3</div>
          </CarouselItem>
          <CarouselItem class="carousel-item">
            <div class="demo-carousel">4</div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
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

$carouselHeight: 400px;
.content {
  height: $carouselHeight;
  background-image: linear-gradient(167deg, #808695, #17233d);
  display: flex;
  flex-direction: row;
  justify-content: center;
  .carousel {
    height: 100%;
    position: relative;
    overflow: hidden;
    .carousel-item {
      text-align: center;
      line-height: 400px;
      color: white;
    }
  }
}
</style>
