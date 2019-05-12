import CdButton from './cd-button/index.vue';
import CdText from './cd-text/index.vue';
import ConsoleHeader from './console-header/index.vue';
import ConsoleSider from './console-sider/index.vue';
import TagsNav from './tags-nav/index.vue';
import AuthorizePrompt from './authorize-prompt/index.vue';

const version = '0.1.0'
const components = [
  CdButton,
  CdText,
  ConsoleHeader,
  ConsoleSider,
  TagsNav,
  AuthorizePrompt
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
  CdText,
  ConsoleHeader,
  ConsoleSider,
  TagsNav,
  AuthorizePrompt
}
export default {
  install,
  version
}
