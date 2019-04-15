import { Vue, Component } from 'vue-property-decorator';

@Component
class Login extends Vue {
    protected mobileContryCode: string = '+86';
    protected sendSmsCodeLoading: boolean = false;
    protected rememberWeekend: boolean = false;
    protected rememberMobile: boolean = false;
    
    protected toSendSmsHandler() {
        this.sendSmsCodeLoading = true;
    }
    protected gotoRegisterHandler() {
        this.$router.push({ name: 'auth.register' });
    }
}
export default Login;
