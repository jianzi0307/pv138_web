import { Vue, Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';

import { isMobile, isSmsCode, isPassword } from '@/utils/validator';
@Component({
    methods: {
        ...mapActions(['attempRegister'])
    }
})
class Register extends Vue {
    protected mobileContryCode: string = '+86';
    protected sendSmsCodeLoading: boolean = false;
    protected rememberWeekend: boolean = false;
    protected rememberMobile: boolean = false;

    protected formData: any = {
        mobile: '',
        smsCode: '',
        password: ''
    };

    protected rules: any = {
        mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        smsCode: [
            { required: true, message: '请输入4位短信验证码', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, max: 32, message: '请输入6～32位密码', trigger: 'blur' }
        ]
    };

    get formReady() {
        return (
            isMobile(this.formData.mobile) &&
            isPassword(this.formData.password) &&
            isSmsCode(this.formData.smsCode)
        );
    }

    protected toSendSmsHandler() {
        this.sendSmsCodeLoading = true;
    }
    protected gotoLoginHandler() {
        this.$router.push({ name: 'auth.login' });
    }

    protected registerHandler(ref: string) {
        if (!ref) return;
        const self: any = this;
        self.$refs[ref].validate((valid: boolean) => {
            if (valid) {
                self.attempRegister(self.formData);
            }
        });
    }
}

export default Register;
