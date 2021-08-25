/**
 * @fileoverview 除了基本数据类型、对象成员引用、变量，其他表达式不允许传递给jsx中的组件属性上 
 * @author yefeng
 */
"use strict";

const {isNil, splitPascal} = require('../utils')

function checkExpressionInfo(node) {
  if (node.type === 'Literal') {
    if (!isNil(node.regex )) {
      return { type: 'regular expression', node };
    }
    return null
  }
  if (['Identifier','MemberExpression','ThisExpression'].includes(node.type)) {
    return null;
  }
  const type = splitPascal(node.type)
  return {type, node}
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "除了基本数据类型、对象成员引用、变量，其他表达式不允许传递给jsx中的组件属性上 ",
      category: "Best Practice",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      defaultMsg:
        '不要在JSX中把 "{{type}}" 类型表达式传递给属性 "{{name}}"  (at line {{nodeLine}}, column {{nodeColumn}}) .'
    }
  },

  create(context) {
    return {
      JSXAttribute(node) {
        const jsxAttributeName = node.name.name;
        const jsxAttributeValue = node.value;
        const messageId = 'defaultMsg';
        if (jsxAttributeValue === null) {
          return;
        }
        if (jsxAttributeValue.type !== 'JSXExpressionContainer') {
          // 属性是基本数据类型（字符串）
          return;
        }
        const valueExpression = jsxAttributeValue.expression;

        // 获取表达式的类型
        const expressionInfo = checkExpressionInfo(valueExpression);

        if (expressionInfo === null) {
          return;
        }

        // Report found error
        const expressionType = expressionInfo.type;
        const expressionNode = expressionInfo.node;
        const data = {
          type: expressionType,
          nodeLine: expressionNode.loc.start.line,
          nodeColumn: expressionNode.loc.start.column,
          name: jsxAttributeName
        };

        context.report({
          node: expressionNode,
          messageId,
          data
        });
      }
    };
  },
};
