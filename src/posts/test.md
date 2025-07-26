---
title: "Markdown 样式测试"
date: 2025-05-05
tags: ["测试", "样式"]
description: "用于测试 Markdown 渲染样式的文章"
image: "/assets/test.jpg"
---

# 一级标题

这是一段普通的文本，用于测试段落样式。这里包含了一些**粗体**和*斜体*的文本，以及一些`行内代码`。

## 二级标题

### 代码块测试

```js
// JavaScript 代码示例
const greeting = 'Hello World';
console.log(greeting);

function add(a, b) {
  return a + b;
}
```

```html
<!-- HTML 代码示例 -->
<div class="container">
  <h1>标题</h1>
  <p>段落内容</p>
</div>
```

```css
/* CSS 代码示例 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
```

### 列表测试

#### 无序列表
- 列表项 1
- 列表项 2
  - 子列表项 1
  - 子列表项 2
- 列表项 3

#### 有序列表
1. 第一项
2. 第二项
   1. 子项 1
   2. 子项 2
3. 第三项

### 引用测试

> 这是一段引用文本。引用通常用于突出显示重要的内容或引用他人的话。
>
> 可以包含多行。

### 表格测试

| 表头 1 | 表头 2 | 表头 3 |
|------|------|------|
| 内容 1 | 内容 2 | 内容 3 |
| 内容 4 | 内容 5 | 内容 6 |

### 链接和图片测试

这是一个[链接示例](https://example.com)。

![图片示例](https://picsum.photos/800/400)

### 分隔线测试

---

### 更多代码示例

```python
# Python 代码示例
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

```typescript
// TypeScript 代码示例
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};
```

### 复杂文本测试

这是一个包含**粗体**、*斜体*、***粗斜体***、`代码`、[链接](https://example.com)的复杂文本段落。

> 这是一个包含 `代码` 的引用块。

1. 这是一个包含**粗体**的有序列表项
2. 这是一个包含*斜体*的有序列表项
3. 这是一个包含`代码`的有序列表项

- 这是一个包含**粗体**的无序列表项
- 这是一个包含*斜体*的无序列表项
- 这是一个包含`代码`的无序列表项 