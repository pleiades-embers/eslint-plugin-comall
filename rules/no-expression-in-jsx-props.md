# no expression pass to jsx props, except literal, this expression or member expression  (no-expression-in-jsx-props)

This rule is in order to keep jsx clean, prevent too long or too complex expression  .

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

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

```

Examples of **correct** code for this rule:

```js

<div foo={foo} />
<div foo={1} />
<div foo="bar" />
<div foo={false} />
<div foo />
<div foo={this} />
<div foo={bar.baz}>

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
