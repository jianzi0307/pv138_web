import { Vue, Component } from 'vue-property-decorator';
import { CdButton, CdText } from '@/components';
import { validateMobileRule, validatePasswordRule, validateSmsCodeRule } from '@/utils/validator';
import { mapActions } from 'vuex';
import _ from 'lodash';

@Component({
  components: {
    [CdButton.name]: CdButton,
    [CdText.name]: CdText
  },
  methods: {
    ...mapActions(['sendSmsCode', 'smsVerify', 'findPassword'])
  }
})
class ForgetPassword extends Vue {
  protected mobileContryCode: string = '+86';
  protected cdButtonStatus: string = 'idle';
  protected currStep: number = 0;
  protected cdTextIsActived: boolean = false;

  protected step0FormData: any = {
    account: '',
    accountType: 'mobile',
    secCode: ''
  };
  protected step0FormRules: any = {
    account: [
      { validator: validateMobileRule, trigger: 'blur' }
    ],
    secCode: [
      { validator: validateSmsCodeRule, trigger: 'blur' }
    ],
  };

  protected step1FormData: any = {
    password: '',
    passwordCheck: ''
  };

  // 确认密码验证
  protected validatePasswordCheckRule = (rule: any, value: string, callback: CallableFunction) => {
    if (this.step1FormData.password !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  };

  protected step1FormRules: any = {
    password: [
      { validator: validatePasswordRule, trigger: 'blur' }
    ],
    passwordCheck: [
      { validator: this.validatePasswordCheckRule, trigger: 'blur' }
    ]
  };

  protected cdButtonLoadingProcessHandler(evt: any) {
    const self: any = this;
    self.cdButtonStatus = 'loading';
    setTimeout(() => {
      self.$refs['step0Form'].validateField('account', async (errmsg: any) => {
        if (errmsg) {
          self.cdButtonStatus = 'idle';
          return;
        }
        try {
          await self.sendSmsCode({ mobile: self.step0FormData.account, scene: 'findpwd' });
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

  // 下一步
  protected nextStepHandler(step: number) {
    const self: any = this;
    if (step === 1) {
      self.$refs['step0Form'].validate(async (valid: boolean) => {
        if (valid) {
          try {
            const rs = await self.smsVerify({
              mobile: self.step0FormData.account,
              smsCode: self.step0FormData.secCode,
              scene: 'findpwd',
            });
            console.log(rs);
            if (!rs || _.isEmpty(rs.data) || rs.data !== 'success') {
              self.$Message.error('验证码错误');
              return;
            }
            self.showStep(step);
          } catch (e) {
            console.log(e.message || '验证码错误');
          }
        }
      });
    }
    if (step === 2) {
      self.$refs['step1Form'].validate(async (valid: boolean) => {
        if (valid) {
          try {
            const rs = await self.findPassword({
              account: self.step0FormData.account,
              accountType: 'mobile',
              smsCode: self.step0FormData.secCode,
              scene: 'findpwd',
              password: self.step1FormData.password
            });
            if (!rs) {
              self.$Message.error('重置密码失败');
              return;
            }
            self.showStep(step);
            self.cdTextIsActived = true;
          } catch (e) {
            console.log(e.message || '重置密码失败');
          }
        }
      });
    }
  }

  protected cdTextCooldownFinishHandler(evt: any) {
    this.$router.push({ name: 'auth.login' });
  }

  protected showStep(step: number) {
    this.currStep = step;
  }
}

export default ForgetPassword;
