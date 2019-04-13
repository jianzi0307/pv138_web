import { Vue, Component } from 'vue-property-decorator';

@Component
class Register extends Vue {
    protected mobileContryCode: string = '+86';
    protected sendSmsCodeLoading: boolean = false;
    protected rememberWeekend: boolean = false;
    protected rememberMobile: boolean = false;

    protected toSendSmsHandler() {
        this.sendSmsCodeLoading = true;
    }
    protected gotoLoginHandler() {
        this.$router.push({ name: 'auth.login' });
    }
}

export default Register;
