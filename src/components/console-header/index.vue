<template>
  <Header class="layout-header">
    <Menu mode="horizontal" class="layout-menu" theme="light" active-name="1">
      <div class="layout-left">
        <div class="layout-logo">
          <img :src="logo">
        </div>
        <sider-trigger
          class="sider-trigger"
          :collapsed="collapsed"
          icon="md-menu"
          @on-change="collpasedChangeHandler"
        ></sider-trigger>
      </div>
      <div class="layout-right">
        <Menu class="layout-nav" mode="horizontal" @on-select="onMenuSelectedHandler">
          <MenuItem
            v-for="menuItem in menuItems"
            :key="menuItem.route"
            name="menuItem.route"
          >{{menuItem.label}}</MenuItem>
        </Menu>
        <fullscreen v-model="isFullscreen"></fullscreen>
        <Dropdown class="layout-setting" placement="bottom" @on-click="dropdownClickHandler">
          <a href="javascript:void(0)">
            <Avatar icon="ios-person"/>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
          </a>
          <DropdownMenu slot="list">
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
import SiderTrigger from "@/components/sider-trigger/index.vue";
import Fullscreen from "@/components/fullscreen/index.vue";
export default create({
  name: "console-header",
  components: {
    SiderTrigger,
    Fullscreen
  },
  props: ["logo", "dropdowns", "menus"],
  data: function() {
    return {
      dropdownItems: [],
      menuItems: [],
      isFullscreen: false,
      collapsed: false
    };
  },
  methods: {
    dropdownClickHandler(name) {
      this.$emit("dropdownClickEvent", name);
    },
    onMenuSelectedHandler(name) {
      this.$router.push({ name: name });
    },
    collpasedChangeHandler(state) {
      this.$emit("on-coll-change", state);
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
  /deep/ .ivu-menu {
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
      margin-right: 40px;
      .layout-nav {
        margin-right: 20px;
      }
      .layout-setting {
        margin-left: 20px;
        a {
          color: #808695;
        }
      }
    }

    .sider-trigger {
      margin-left: 40px;
    }
  }
}

.dropdown-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style>