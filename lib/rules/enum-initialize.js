/**
 * @fileoverview 检查枚举类型成员的值是否有初始化
 * @author yefeng
 */
 "use strict";

 //------------------------------------------------------------------------------
 // Helpers
 //------------------------------------------------------------------------------

const { isNil } = require("../utils");

const INITIALIZER_KINDS = {
  NUMBER : 8,
  STRING : 10,
}

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 module.exports = {
   meta: {
     type: 'layout', // `problem`, `suggestion`, or `layout`
     docs: {
       description: "检查枚举类型成员的值是否有初始化",
       category: "Stylistic Issues",
       recommended: true,
       url: null, // URL to the documentation page for this rule
     },
     fixable: 'code', // Or `code` or `whitespace`
     schema: [], // Add a schema if the rule has options
     messages:{
       enumEmpty:'枚举 {{enumName}} 为空',
       memberNotIntialized:'枚举 {{enumName}} 属性 {{enumMemberName}} 未完成初始化赋值'
     }
   },
 
   create(context) {
     return {
      TSEnumDeclaration(node){
        const enumMembers = node.members
        const enumName = node.id.name
        if (enumMembers.length === 0) {
          context.report({
            data:{enumName},
            node,
            messageId:'enumEmpty'
          })
          return
        }
        let lastIndex = -1
        enumMembers.forEach((member) => {
          if (isNil(member.initializer)) {
            const enumMemberName = member.id.name
            context.report({
              data:{enumName,enumMemberName},
              node,
              messageId:'memberNotIntialized',
              fix(fixer){
                lastIndex ++ 
                return [
                  fixer.insertTextAfter(member,` = ${lastIndex}`)
                ]
              }
            })
          } else if (Number(member.initializer.value) === member.initializer.value) {
            lastIndex = member.initializer.value
          }
        })
      }
     }
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
 