# 检查所有的枚举类型、枚举成员、接口、类型映射、类是否都使用了Pascal命名 (type-pascal)

## Rule Details

所有的枚举类型、枚举属性、接口、类型、类都需要使用了Pascal命名

这个规则下**错误**的代码范例:

```typescript
enum foo {
	Bar = 0,
}
enum Foo {
	bar = 0,
}
enum Foo {
	_bar = 0,
}
enum _Foo {
	Bar = 0,
}
enum $Foo {
	Bar = 0,
}
enum $Foo {
	bar = 0,
}
class fooBar {}

```

这个规则下**正确**的代码范例:

```typescript
enum Foo {
	Bar,
}
enum Foo {
	Bar = 0,
}
interface Foo {}
type Foo = number;
class Foo {}
```



## 什么时候你可以不使用本规则

视团队代码风格约定。

