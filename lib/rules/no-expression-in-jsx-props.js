/**
 * @fileoverview no expression pass to jsx props, except literal or member expression 
 * @author yefeng
 */
"use strict";

function splitPascal(name){
  return name.replace(/[A-Z][a-z]+/g, (match) => ' ' + match.toLowerCase() ).trim()
}

function isNil(target){
  return target === null || target === undefined
}

// Recursively checks if an element is a construction.
function isConstruction(node) {
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
      description: "no expression pass to jsx props, except literal or member expression ",
      category: "Fill me in",
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      defaultMsg:
        'do not pass "{{type}}" to prop "{{name}}" in JSX (at line {{nodeLine}}, column {{nodeColumn}}) .'
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
          // value could be a literal
          return;
        }
        const valueExpression = jsxAttributeValue.expression;

        // Check if the prop is a construction
        const constructInfo = isConstruction(valueExpression);

        if (constructInfo === null) {
          return;
        }

        // Report found error
        const constructType = constructInfo.type;
        const constructNode = constructInfo.node;
        const data = {
          type: constructType,
          nodeLine: constructNode.loc.start.line,
          nodeColumn: constructNode.loc.start.column,
          name: jsxAttributeName
        };

        context.report({
          node: constructNode,
          messageId,
          data
        });
      }
    };
  },
};
