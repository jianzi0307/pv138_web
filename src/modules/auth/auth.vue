<template>
  <div class="auth-wrapper">
    <div class="header">
      <div class="logo">
          <a href="/"><img src="@/assets/logo.svg"></a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
}
body {
  background: url("../../assets/web/login_bg.gif");
}
.auth-wrapper {
  height: 100%;
  .header {
    padding: 10px 50px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .logo {
      img {
        width: 130px;
      }
    }
  }
}
</style>

