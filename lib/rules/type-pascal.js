/**
 * @fileoverview 检查所有的枚举类型、枚举属性、接口、类型、类是否都使用了Pascal命名
 * @author yefeng
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const {isPascal, toPascal} = require('../utils')

module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "检查所有的枚举类型、枚举属性、接口、类型、类是否都使用了Pascal命名",
      category: "Stylistic Issues",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages:{
      TSEnumDeclaration:'枚举类型 "{{name}}" 未使用Pascal命名法',
      TSEnumMember:' 枚举属性 "{{name}}" 未使用Pascal命名法',
      TSInterfaceDeclaration:' interface 接口 "{{name}}" 未使用Pascal命名法',
      TSTypeAliasDeclaration:' type 类型 "{{name}}" 未使用Pascal命名法',
      ClassDeclaration:' class 类 "{{name}}" 未使用Pascal命名法',
    }
  },

  create(context) {
    const nodeReaders = [
      'TSEnumDeclaration',
      'TSEnumMember',
      'TSInterfaceDeclaration',
      'TSTypeAliasDeclaration',
      'ClassDeclaration',
    ]
    const reporters = {}
    nodeReaders.forEach(reader => {
      reporters[reader] = function(node){
        const name = node.id.name
        if (!isPascal(name)) {
          const pascalName = toPascal(name)
          context.report({
            data:{name},
            node,
            messageId:reader,
            fix(fixer){
              return [
                fixer.replaceTextRange(node.id.range, pascalName)
              ]
            }
          })
        }
      }
    })
    return reporters
  },
};
