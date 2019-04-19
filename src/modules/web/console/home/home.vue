<template>
  <div class="wrapper">
    <Breadcrumb class="breadcrumb">
      <BreadcrumbItem>首页</BreadcrumbItem>
    </Breadcrumb>
    <div class="page-content">内容</div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  .breadcrumb {
    font-size: 12px;
    /deep/ .ivu-breadcrumb-item-link {
      color: #999 !important;
    }
  }
  .page-content {
    background-color: white;
    padding: 20px;
    margin-top: 15px;
  }
}
</style>

