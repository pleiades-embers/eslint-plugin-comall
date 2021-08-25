# eslint-plugin-comall
[![Build Status](https://app.travis-ci.com/comall-inc/eslint-plugin-comall.svg?branch=main)](https://app.travis-ci.com/comall-inc/eslint-plugin-comall)

eslint plugin with comall private rules .

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-comall`:

```sh
npm install eslint-plugin-comall --save-dev
```

## Usage

Add `comall` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "comall"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "comall/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


