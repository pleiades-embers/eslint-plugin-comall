/**
 * @fileoverview 检查所有的枚举类型、枚举属性、接口、类型、类是否都使用了Pascal命名
 * @author yefeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/type-pascal"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser:require.resolve('@typescript-eslint/parser')
});
ruleTester.run("type-pascal", rule, {
  valid: [
    `enum Foo {
      Bar
    }`,
    `enum Foo{
      Bar = 0
    }`,
    'interface Foo{}',
    'type Foo = number',
    'class Foo {}'
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `enum foo {
        Bar = 0
      }`,
      output:`enum Foo {
        Bar = 0
      }`,
      errors: [{ messageId:'TSEnumDeclaration'}],
    },
    {
      code: `enum Foo {
        bar = 0
      }`,
      output:`enum Foo {
        Bar = 0
      }`,
      errors: [{ messageId:'TSEnumMember'}],
    },
    {
      code: `enum Foo {
        _bar = 0
      }`,
      output:`enum Foo {
        Bar = 0
      }`,
      errors: [{ messageId:'TSEnumMember'}],
    },
    {
      code: `enum _Foo {
        Bar = 0
      }`,
      output:`enum Foo {
        Bar = 0
      }`,
      errors: [{ messageId:'TSEnumDeclaration'}],
    },
    {
      code: `enum $Foo {
        Bar = 0
      }`,
      output:`enum Foo {
        Bar = 0
      }`,
      errors: [{ messageId:'TSEnumDeclaration'}],
    },
    {
      code: `enum $Foo {
        bar = 0
      }`,
      output:`enum Foo {
        Bar = 0
      }`,
      errors: [{ messageId:'TSEnumDeclaration'},{messageId:'TSEnumMember'}],
    },
    {
      code:`interface fooBar {}`,
      output:'interface FooBar {}',
      errors:[{messageId:'TSInterfaceDeclaration'}]
    },
    {
      code:`interface FOO_BAR {}`,
      output:'interface FooBar {}',
      errors:[{messageId:'TSInterfaceDeclaration'}]
    },
    {
      code:'type fooBar = string',
      output:'type FooBar = string',
      errors:[{messageId:'TSTypeAliasDeclaration'}]
    },
    {
      code:'class fooBar {}',
      output:'class FooBar {}',
      errors:[{messageId:'ClassDeclaration'}] 
    }
  ],
});
