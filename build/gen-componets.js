const fs = require('fs-extra')
const path = require('path')
const uppercamelize = require('uppercamelcase')
const version = process.env.VERSION || require('../package.json').version
const tips = '// This file is auto gererated by build/gen-components.js' +
  '// use `npm run gen` command to gererate the file.'

function getComponents() {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../src/components'))
  const excludes = ['index.js', 'vant-css', 'mixins', 'utils', '.DS_Store']
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}
const Components = getComponents()

function buildVantEntry() {
  const uninstallComponents = [
    'Lazyload',
    'Waterfall'
  ]

  const importList = Components.map(name => `import ${uppercamelize(name)} from './${name}'`)
  const exportList = Components.map(name => `${uppercamelize(name)}`)
  const intallList = exportList.filter(name => !~uninstallComponents.indexOf(uppercamelize(name)))
  const content = `${tips}
${importList.join('\n')}
const version = '${version}'
const components = [
  ${intallList.join(',\n  ')}
]
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  install,
  version,
  ${exportList.join(',\n  ')}
}
export default {
  install,
  version
}
`
  fs.writeFileSync(path.join(__dirname, '../src/components/index.js'), content)
}

buildVantEntry();
