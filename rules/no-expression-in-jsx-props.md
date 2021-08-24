# 不允许在jsx的属性中使用绝大多数的表达式，除了变量、基本类型、this和对象成员  (no-expression-in-jsx-props)


## Rule Details

这个规则主要是为了避免jsx过长或者过于复杂，导致嵌套关系难以阅读，后期难以维护  .

这个规则下**错误**的代码范例:

```js
return (
  <>
    <div foo={[]} />
    <div foo={bar === baz} />
    <div foo={{}} />
    <div foo={bar = baz} />
    <div foo={bar && baz} />
    <div foo={new Bar()} />
    <div foo={() => {}} />
    <div foo={function(){}} />
    <div foo={/bar/} />
    <div foo={<div/>} />
    <div foo={<></>} />
    <div foo={bar ? baz: barzz} />
    <div foo={``} />
    <div foo={typeof bar} />
    <div foo={bar()} />
    <div foo={bar.bind(baz)} />
  </>
)

```

这个规则下**正确**的代码范例:

```js
return (
  <>
    <div foo={foo} />
    <div foo={1} />
    <div foo="bar" />
    <div foo={false} />
    <div foo />
    <div foo={this} />
    <div foo={bar.baz}>
  </>
)

```


## 什么时候你可以不使用本规则

项目不复杂，或者通过团队约定，允许一定程度的表达式出现在jsx中，则可以不使用本规则。

