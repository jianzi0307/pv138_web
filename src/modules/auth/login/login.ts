import { Vue, Component } from 'vue-property-decorator';
import { validateMobileRule, validateSmsCodeRule, validatePasswordRule } from '@/utils/validator';
import { mapActions } from 'vuex';
import { CdButton } from '@/components';
import { consoleHomeName } from '@/config';

@Component({
  components: {
    [CdButton.name]: CdButton
  },
  methods: {
    ...mapActions(['attemptLogin', 'attemptLoginPhone', 'sendSmsCode'])
  }
})
class Login extends Vue {
  protected mobileContryCode: string = '+86';
  protected rememberWeekend: boolean = false;
  protected rememberMobile: boolean = false;
  protected cdButtonStatus: string = 'idle';

  // 登录按钮loading
  protected loginLoading: boolean = false;
  protected loginPhoneLoading: boolean = false;

  protected loginFormData: any = {
    account: '',
    accountType: 'mobile',
    password: ''
  };
  protected loginFormRules: any = {
    account: [
      { validator: validateMobileRule, trigger: 'blur' }
    ],
    password: [
      { validator: validatePasswordRule, trigger: 'blur' }
    ]
  };

  protected loginPhoneFormData: any = {
    account: '',
    accountType: 'mobile',
    secCode: ''
  };
  protected loginPhoneFormRules: any = {
    account: [
      { validator: validateMobileRule, trigger: 'blur' }
    ],
    secCode: [
      { validator: validateSmsCodeRule, trigger: 'blur' }
    ],
  };

  protected loginHandler() {
    const self: any = this;
    self.loginLoading = true;
    self.$refs['loginForm'].validate((valid: boolean) => {
      if (valid) {
        self.attemptLogin(self.loginFormData)
          .then(() => self.loginSuccess())
          .catch((e: any) => {
            console.log(e.message || '登录失败');
            setTimeout(() => { self.loginLoading = false; }, 500);
          })
      } else {
        self.loginLoading = false;
      }
    });
  }

  protected loginPhoneHandler() {
    const self: any = this;
    self.loginPhoneLoading = true;
    self.$refs['loginPhoneForm'].validate((valid: boolean) => {
      if (valid) {
        self.attemptLoginPhone(self.loginPhoneFormData)
          .then(() => self.loginSuccess())
          .catch((e: any) => {
            console.log(e.message || '登录失败');
            setTimeout(() => { self.loginPhoneLoading = false; }, 500);
          });
      } else {
        self.loginPhoneLoading = false;
      }
    });
  }

  protected cdButtonLoadingProcessHandler(evt: any) {
    const self: any = this;
    self.cdButtonStatus = 'loading';
    setTimeout(() => {
      self.$refs['loginPhoneForm'].validateField('account', async (errmsg: any) => {
        if (errmsg) {
          self.cdButtonStatus = 'idle';
          return;
        }
        try {
          await self.sendSmsCode({ mobile: self.loginPhoneFormData.account, scene: 'login' });
        } catch (e) {
          console.log(e.message || '发送失败');
        }
        self.cdButtonStatus = 'cooldown';
      });
    }, 500);
  }

  protected cdButtonCooldownFinishHandler(evt: any) {
    this.cdButtonStatus = 'idle';
  }

  protected gotoRegisterHandler() {
    this.$router.push({ name: 'auth.register' });
  }

  protected loginSuccess() {
    this.$Message.success('登录成功！');
    this.$router.push({ name: consoleHomeName });
  }
}
export default Login;
