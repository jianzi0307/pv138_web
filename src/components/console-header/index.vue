<template>
  <Header class="layout-header">
    <Menu mode="horizontal" class="layout-menu" theme="light" active-name="1">
      <div class="layout-left">
        <div class="layout-logo">
          <img :src="logo">
        </div>
      </div>
      <div class="layout-right">
        <Menu class="layout-nav" mode="horizontal" @on-select="onMenuSelectedHandler">
          <MenuItem
            v-for="menuItem in menuItems"
            :key="menuItem.route"
            name="menuItem.route"
          >{{menuItem.label}}</MenuItem>
        </Menu>
        <Dropdown placement="bottom-end" @on-click="dropdownClickHandler">
          <a href="javascript:void(0)">
            <Icon type="md-menu" style="font-size: 25px;"/>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="fullscreen">
              <Icon type="md-expand" class="dropdown-icon"/>全屏
            </DropdownItem>
            <DropdownItem
              v-for="item in dropdownItems"
              :key="item.name"
              :divided="item.divided"
              :name="item.name"
            >
              <Icon :type="item.icon" class="dropdown-icon"/>
              {{item.label}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Menu>
  </Header>
</template>
<script>
import { create } from "@/utils/comp-creater";
export default create({
  name: "console-header",
  props: ["logo", "dropdowns", "menus"],
  data: function() {
    return {
      dropdownItems: [],
      menuItems: []
    };
  },
  methods: {
    dropdownClickHandler(name) {
      this.$emit("dropdownClickEvent", name);
    },
    onMenuSelectedHandler(name) {
      this.$router.push({ name: name });
    }
  },
  mounted() {
    this.dropdownItems = this.dropdowns;
    this.menuItems = this.menus;
  }
});
</script>
<style lang="scss">
.layout-header {
  background-color: white;
  height: 62px;
  line-height: 62px;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.1);
  padding: 0;
  z-index: 1000;
  >>> .ivu-menu {
    position: inherit;
  }
  .layout-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .layout-left {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .layout-logo {
        width: 100px;
        height: 30px;
        float: left;
        position: relative;
        top: 10px;
        left: 30px;
      }
    }

    .layout-right {
      display: flex;
      flex-direction: row;
      margin-right: 30px;
      .layout-nav {
        margin: 0 20px 0 0;
      }
    }
  }
}

.dropdown-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>