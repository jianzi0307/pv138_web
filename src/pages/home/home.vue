<template>
  <div class="wrapper">
    <div class="header">
      <div class="container">
        <Menu class="nav" mode="horizontal" active-name="1">
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
                公众号管家
              </MenuItem>
              <MenuItem name="3">
                <!-- <Icon type="md-radio-button-on" />微信小程序 -->
                微信小程序
              </MenuItem>
              <Submenu name="4">
                <template slot="title">
                  <!-- <Icon type="ios-analytics" />解决方案 -->
                  解决方案
                </template>
                <MenuItem name="4-1">智能单车房Saas系统</MenuItem>
                <MenuItem name="4-2">智能单车硬件</MenuItem>
              </Submenu>
              <MenuItem name="5">经典案例</MenuItem>
              <MenuItem name="6">联系我们</MenuItem>
            </div>
          </div>
          <div class="nav-opts">
            <Button
              class="btn"
              type="default"
              shape="circle"
              size="large"
              @click="toLoginHandler"
            >登录管理平台</Button>
            <Button
              class="btn"
              type="primary"
              shape="circle"
              size="large"
              @click="toRegisterHandler"
            >注册</Button>
          </div>
        </Menu>
      </div>
    </div>
    <Row class="banner-content">
      <div class="container banner">
        <Carousel
          class="carousel"
          v-model="carouselActiveIdx"
          autoplay
          :autoplay-speed="carouselAutoplaySpeed"
          trigger="hover"
          arrow="never"
        >
          <CarouselItem class="carousel-item">
            <div class="carousel-body">
              <div class="carousel-body-l">
                <div class="carousel-body-txt">
                  <p>微信云推宝</p>
                  <p class="sub-txt">公众号消息定时群发工具</p>
                </div>
                <div class="carousel-body-txt-sub">
                  <p>模板消息群发 / 图文消息群发 / 文本消息群发</p>
                  <p>不限定时任务 / 任意链接跳转 / 定向发送极速触达</p>
                </div>
                <div class="carousel-body-btn">
                  <Button type="error" shape="circle" size="large" @click="toMassHandler">
                    查看详情
                    <Icon type="md-arrow-forward"/>
                  </Button>
                </div>
              </div>
              <div class="carousel-body-r">
                <img src="@/assets/web/ban_canting.png" width="650px">
              </div>
            </div>
          </CarouselItem>
          <CarouselItem class="carousel-item">
            <div class="carousel-body">
              <div class="carousel-body-l">
                <div class="carousel-body-txt">
                  <p>微信公众号管家</p>
                  <p class="sub-txt">管理多公众号从未如此简单</p>
                </div>
                <div class="carousel-body-txt-sub">
                  <p>多公众号管理 / 及时粉丝互动 / 公众号数据分析</p>
                  <p>公众号排行 / 文章排行榜 / 多维度分析 / 竞品监控</p>
                </div>
                <div class="carousel-body-btn">
                  <Button type="error" shape="circle" size="large" @click="toMasterHandler">
                    查看详情
                    <Icon type="md-arrow-forward"/>
                  </Button>
                </div>
              </div>
              <div class="carousel-body-r">
                <img src="@/assets/web/ban_zhan.png" width="650px">
              </div>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </Row>

    <Row class="notices-content">
      <div class="container notices">
        <div class="notices-title">信息公告:</div>
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

    <Row class="master-content">
      <div class="container screen-1">
        <div class="screen-title">多账号管理 轻松运营</div>
        <div class="screen-sub-title">12w+公众号的选择</div>
        <div class="screen-cards">
          <Card class="card">
            <div class="card-content">
              <Icon class="icon" type="ios-chatbubbles-outline"/>
              <h3>多个账号稳定登录切换，24小时二次登录免扫码</h3>
            </div>
          </Card>
          <Card class="card">
            <div class="card-content">
              <Icon class="icon" type="ios-color-filter-outline"/>
              <h3>基于后台而超越后台的数据分析和报表生成</h3>
            </div>
          </Card>
          <Card class="card">
            <div class="card-content">
              <Icon class="icon" type="ios-color-palette-outline"/>
              <h3>内置几百种样式，华丽图文轻松排版</h3>
            </div>
          </Card>
          <Card class="card">
            <div class="card-content">
              <Icon class="icon" type="ios-cloud-done-outline"/>
              <h3>小时级更新的海量文章素材库，监控特定公众号的发文</h3>
            </div>
          </Card>
        </div>
        <div class="screen-link">
          <Button type="text" size="large">
            帮您解决更多问题
            <Icon type="md-arrow-forward"/>
          </Button>
        </div>
      </div>
    </Row>

    <Row class="cases-content">
      <div class="container screen-2">
        <img src="@/assets/web/case1.png">
        <img src="@/assets/web/case2.png">
        <img src="@/assets/web/case3.png">
        <img src="@/assets/web/case4.png">
        <img src="@/assets/web/case5.png">
      </div>
    </Row>

    <Row class="mass-content">
      <div class="container screen-4">
        <div class="screen-title">多账号管理 轻松运营</div>
        <div class="screen-sub-title">12w+公众号的选择</div>
        <div class="mass-screen-cards">
          <div class="col">
            <Card class="bgcard card1">
              <div class="card-bg"></div>
              <div class="card-content">
                <Icon class="icon" type="ios-chatbubbles-outline"/>
                <h3>多个账号稳定登录切换，24小时二次登录免扫码</h3>
              </div>
            </Card>
            <Card class="bgcard card2">
              <div class="card-bg"></div>
              <div class="card-content">
                <Icon class="icon" type="ios-color-filter-outline"/>
                <h3>基于后台而超越后台的数据分析和报表生成</h3>
              </div>
            </Card>
          </div>
          <div class="col">
            <Card class="bgcard card3">
              <div class="card-bg"></div>
              <div class="card-content">
                <Icon class="icon" type="ios-color-palette-outline"/>
                <h3>内置几百种样式，华丽图文轻松排版</h3>
              </div>
            </Card>
            <Card class="bgcard card4">
              <div class="card-bg"></div>
              <div class="card-content">
                <Icon class="icon" type="ios-cloud-done-outline"/>
                <h3>小时级更新的海量文章素材库，监控特定公众号的发文</h3>
              </div>
            </Card>
          </div>
        </div>
        <div class="screen-link">
          <Button type="text" size="large">
            帮您解决更多问题
            <Icon type="md-arrow-forward"/>
          </Button>
        </div>
      </div>
    </Row>
    <Row class="footer-content">
      <div class="container screen-3">
        <div class="link-list">小程序代理 | 商务合作 | 用户协议 | 联系我们 | 加入我们 | 关于我们</div>
        <div class="copyright">Copyright © 2018-2019 拼微客 www.pv138.com 山东万橡科技有限公司旗下 京ICP备1401925</div>
      </div>
    </Row>
    <BackTop :height="100" :bottom="200"></BackTop>
  </div>
</template>
<script lang="ts" src="./home.ts"></script>
<style lang="scss" scoped>
@import "./home";
</style>
