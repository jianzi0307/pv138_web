import { customComponentPrefix } from '@/config';

/**
 * 创建基础对象
 * @param sfc 组件对象
 */
function create(sfc: any) {
  sfc.name = `${customComponentPrefix}${sfc.name}`;
  sfc.install = (Vue: any) => {
    Vue.component(sfc.name, sfc)
  }
  sfc.mixins = sfc.mixins || []
  sfc.methods = sfc.methods || {}
  return sfc
}

export {
  create
}
