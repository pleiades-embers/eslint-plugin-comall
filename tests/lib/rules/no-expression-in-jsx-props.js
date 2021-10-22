/**
 * @fileoverview no expression pass to jsx props, except literal or member expression 
 * @author yefeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-expression-in-jsx-props"),
  RuleTester = require("eslint").RuleTester

  const parserOptions = {
      ecmaVersion:2015,
      ecmaFeatures: {
        jsx: true
      }
    }
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions});
ruleTester.run("no-expression-in-jsx-props", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {code:'<div foo={foo} />'},
    {code:'<div foo={1} />'},
    {code:'<div foo="bar" />'},
    {code:'<div foo={false} />'},
    {code:'<div foo />'},
    {code:'<div foo={this} />'},
    {code:'<div foo={bar.baz} />'},
    {code:'<div className={prefix} />'},
    {code:'<div className={`${prefix}__abc`} />'},
  ],

  invalid: [
    {
      code:"<div foo={[]} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code: "<div foo={bar === baz} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={{}} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={bar = baz} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={bar && baz} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={new Bar()} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={() => {}} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={function(){}} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={/bar/} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={<div/>} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={<></>} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={bar ? baz: barzz} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={``} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={typeof bar} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={bar()} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={bar.bind(baz)} />",
      errors:[{messageId:'defaultMsg'}],
    },
    {
      code:"<div foo={aa || bb} />",
      errors:[{messageId:'defaultMsg'}]
    }
  ],
});
