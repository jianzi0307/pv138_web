import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component({
  methods: {
    ...mapActions(['logout'])
  }
})
class Dashboard extends Vue {
  protected async logoutHandler() {
    const self: any = this;
    await self.logout();
    self.$Message.success('成功退出');
    self.$router.push({ name: 'auth.login' });
  }
}

export default Dashboard;
