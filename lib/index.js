/**
 * @fileoverview enforce no expression pass to jsx props , except literal and member expression .
 * @author yefeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");
module.exports.configs = {
  recommended: {
    rules: {
        '@comall/comall/no-expression-in-jsx-props': 2, 
        '@comall/comall/type-pascal':2,
        '@comall/comall/enum-initialize':2,
    },
},
}



