module.exports = {
  root: true, ////此项是用来告诉eslint找当前配置文件不能往父级查找
  env: {
    node: true //此项指定环境的全局变量，下面的配置指定为node环境
  },
  extends: [ // 此项是用来配置vue.js风格，就是说写代码的时候要规范的写，如果你使用vscode我觉得应该可以避免出错
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser' //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  },
  rules: { //规则配置写在这里
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    "no-unused-vars": 'off',
    "space-before-function-paren": "off",
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "indent": "off",
    "eol-last": "off",
    "no-multiple-empty-lines": "off"
  }
}
