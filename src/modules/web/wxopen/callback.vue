<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { bindOfficialToUser } from '@/utils/services';

@Component
class AuthCallback extends Vue {
  public async created() {
    console.log(this.$route.query, this.$route.params, '<<<call back');
    const rs = await bindOfficialToUser({
      authCode: this.$route.query.auth_code,
      expiresIn: this.$route.query.expires_in
    });

    // window.location.href = `${this.$route.query.redirect_uri}`;
  }
}
export default AuthCallback;
</script>
