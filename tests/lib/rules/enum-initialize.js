/**
 * @fileoverview 检查枚举类型成员的值是否有初始化
 * @author yefeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/enum-initialize"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser')
});
ruleTester.run("enum-initialize", rule, {
  valid: [
    `enum Foo {
       Bar = 0,
       Baz = 1,
     }`,
    `enum Foo{
       Bar = 0,
       Baz = 'BAZ'
     }`,
  ],

  invalid: [
    {
      code: `enum Foo {
         Bar
       }`,
      output: `enum Foo {
         Bar = 0
       }`,
      errors: [{ messageId: 'memberNotIntialized' }],
    },
    {
      code: `enum Foo {
        Bar = 0,
        Baz,
      }`,
      output: `enum Foo {
        Bar = 0,
        Baz = 1,
      }`,
      errors: [{ messageId: 'memberNotIntialized' }],
    },
    {
      code: `enum Foo {
        Bar = 1,
        Baz,
      }`,
      output: `enum Foo {
        Bar = 1,
        Baz = 2,
      }`,
      errors: [{ messageId: 'memberNotIntialized' }],
    },
    {
      code: `enum Foo {
        Baz,
        Bazz,
        Bar = 'Bar',
      }`,
      output: `enum Foo {
        Baz = 0,
        Bazz = 1,
        Bar = 'Bar',
      }`,
      errors: [{ messageId: 'memberNotIntialized' }, { messageId: 'memberNotIntialized' },],
    },
    {
      code: `enum Foo {
        Baz,
        Bazz,
        Bar = 'Bar',
        Barr = 3,
        Barz
      }`,
      output: `enum Foo {
        Baz = 0,
        Bazz = 1,
        Bar = 'Bar',
        Barr = 3,
        Barz = 4
      }`,
      errors: [{ messageId: 'memberNotIntialized' }, { messageId: 'memberNotIntialized' }, { messageId: 'memberNotIntialized' },],
    },
    {
      code: `enum Foo {}`,
      errors: [{ messageId: 'enumEmpty' }],
    },
  ],
});
