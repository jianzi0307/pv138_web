import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import store from '../store';
import _ from 'lodash';

import { isMobile, isPassword } from '@/utils/validator';
@Component({
  methods: {
    ...mapActions(['attemptRegister', 'sendSmsCode'])
  }
})
class Register extends Vue {
  protected mobileContryCode: string = '+86';
  protected sendSmsCodeLoading: boolean = false;

  protected formData: any = {
    mobile: '',
    smsCode: '',
    password: ''
  };

  protected validateMobileRule = (rule: any, value: any, callback: CallableFunction) => {
    if (_.isEmpty(value) || !isMobile(value)) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
  };

  protected validatePasswordRule = (rule: any, value: string, callback: CallableFunction) => {
    if (_.isEmpty(value) || !isPassword(value)) {
      callback(new Error('请输入6～32位密码'));
    } else {
      callback();
    }
  };

  protected formRules: any = {
    mobile: [
      { validator: this.validateMobileRule, trigger: 'blur' }
    ],
    smsCode: [
      { required: true, message: '请输入4位动态码', trigger: 'blur' },
      { type: 'string', min: 4, max: 4, message: '请输入4位动态码', trigger: 'blur' }
    ],
    password: [
      { validator: this.validatePasswordRule, trigger: 'blur' }
    ]
  };

  protected sendSmsHandler() {
    const self: any = this;
    self.$refs['registerForm'].validateField('mobile', async (errmsg: any) => {
      if (!errmsg) {
        self.sendSmsCodeLoading = true;
        try {
          debugger;
          await self.sendSmsCode(store, { mobile: self.formData.mobile, scene: 'register' });
          // await self.sendSmsCode({ mobile: self.formData.mobile, scene: 'register' });

          self.$Message.success('发送成功');
          self.sendSmsCodeLoading = false;
        } catch (e) {
          console.log(e);
          // if (e.status !== 422) {
          self.$Message.error('账号密码错误！');
          self.sendSmsCodeLoading = false;
          // }
        }
      }
    });
  }

  protected gotoLoginHandler() {
    this.$router.push({ name: 'auth.login' });
  }

  protected registerHandler() {
    const self: any = this;
    self.$refs['registerForm'].validate((valid: boolean) => {
      if (valid) {
        self.attemptRegister(self.formData);
      }
    });
  }
}

export default Register;
