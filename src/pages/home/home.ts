import { Vue, Component } from 'vue-property-decorator';

@Component
class Home extends Vue {
    protected carouselActiveIdx: number = 0;
    protected carouselAutoplaySpeed: number = 8000;

    public toMasterHandler(evt: any) {
        this.$router.push({ name: 'product.master' });
    }

    public toMassHandler(evt: any) {
        this.$router.push({ name: 'product.mass' });
    }
    public toLoginHandler(evt: any) {
        this.$router.push({ name: 'auth.login' });
    }

    public toRegisterHandler(evt: any) {
        this.$router.push({ name: 'auth.register' });
    }
}

export default Home;
