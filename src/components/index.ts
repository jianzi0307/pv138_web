import CdButton from './cd-button/index.vue';
const version = '0.1.0'
const components = [
  CdButton,
]
const install = (Vue: any) => {
  components.forEach((Component: any) => {
    Vue.use(Component)
  })
}
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}
export {
  install,
  version,
  CdButton,
}
export default {
  install,
  version
}
