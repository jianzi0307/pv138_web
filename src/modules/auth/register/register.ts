import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import _ from 'lodash';

import { validateMobileRule, validateSmsCodeRule, validatePasswordRule } from '@/utils/validator';
import { CdButton } from '@/components';
import { consoleHomeName } from '@/config';

@Component({
  components: {
    [CdButton.name]: CdButton
  },
  methods: {
    ...mapActions(['attemptRegister', 'sendSmsCode'])
  }
})
class Register extends Vue {
  protected mobileContryCode: string = '+86';
  protected cdButtonStatus: string = 'idle';

  protected formData: any = {
    account: '',
    accountType: 'mobile',
    secCode: '',
    password: ''
  };

  protected formRules: any = {
    account: [
      { validator: validateMobileRule, trigger: 'blur' }
    ],
    secCode: [
      { validator: validateSmsCodeRule, trigger: 'blur' }
    ],
    password: [
      { validator: validatePasswordRule, trigger: 'blur' }
    ]
  };

  protected cdButtonLoadingProcessHandler(evt: any) {
    const self: any = this;
    self.cdButtonStatus = 'loading';
    setTimeout(() => {
      self.$refs['registerForm'].validateField('account', async (errmsg: any) => {
        if (errmsg) {
          self.cdButtonStatus = 'idle';
          return;
        }
        try {
          await self.sendSmsCode({ mobile: self.formData.account, scene: 'register' });
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

  protected gotoLoginHandler() {
    this.$router.push({ name: 'auth.login' });
  }

  protected registerHandler() {
    const self: any = this;
    self.$refs['registerForm'].validate(async (valid: boolean) => {
      if (valid) {
        try {
          await self.attemptRegister(self.formData);
          this.$Message.success('注册成功！');
          this.$router.push({ name: consoleHomeName });
        } catch (e) {
          console.log(e.message || '注册失败');
        }
      }
    });
  }
}

export default Register;
