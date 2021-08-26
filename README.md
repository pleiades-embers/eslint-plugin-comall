# eslint-plugin-comall
[![Build Status](https://app.travis-ci.com/comall-inc/eslint-plugin-comall.svg?branch=main)](https://app.travis-ci.com/comall-inc/eslint-plugin-comall)

comall使用的内部eslint规则 .

## 安装

首先，你需要安装 [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

然后，安装 `@comall/eslint-plugin-comall`:

```sh
npm install @comall/eslint-plugin-comall --save-dev
```

## 使用

把 `@comall/comall` 添加到你的 `.eslintrc` 配置文件的插件列表中. 你可以省略 `eslint-plugin-` 前缀:

```json
{
    "plugins": [
        "@comall/comall"
    ]
}
```


然后，配置你想要启用的规则.

```json
{
    "rules": {
        "@comall/comall/rule-name": 2
    }
}
```

或者，使用我们的推荐规则
```json
{
    "extends":[
        "plugin:@comall/comall/recommended"
    ]
}
```

## 支持的规则

* no-expression-in-jsx-props
* type-pascal
