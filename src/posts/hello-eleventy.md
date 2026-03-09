---
title: はじめての Eleventy ブログ
description: 簡単な Eleventy ベースのブログ機能のテスト記事です。Markdown の装飾が正しく表示されるか確認するためのサンプルです。
date: 2026-03-10
permalink: /blog/hello-eleventy/
layout: layouts/post.njk
tags:
  - posts
---
簡単な Eleventy ベースのブログ機能のテスト記事です。Netlify 上では `/blog/hello-eleventy/` という URL で公開されます。

この記事では、Markdown の一通りの装飾が正しく表示されるか確認するために、さまざまな要素を並べています。

## 見出し（h2）

段落テキストです。**太字**・*斜体*・~~打ち消し線~~が使えます。インラインの `code` も入れられます。

### 見出し（h3）

別の段落。同じ行内で **太字** と *斜体* を混ぜることもできます。

---

## リスト

### 箇条書き（ul）

- いち
- に
- さん
  - ネストした項目
  - もう一つ

### 番号付きリスト（ol）

1. 最初
2. 二番目
3. 三番目

---

## コードブロック

インラインでは `npm run build` のように書けます。

ブロックは次のように書きます。

```js
function hello(name) {
  return `Hello, ${name}!`;
}
console.log(hello("Eleventy"));
```

```bash
npm install
npm run dev
```

---

## 引用（blockquote）

> これは引用ブロックです。
> 複数行にわたって書けます。

> 別の引用。**太字**や `code` も引用内で使えます。

---

## リンクと画像

[トップページへ](/)、[ブログ一覧](/blog/)のような内部リンクや、[Eleventy 公式](https://www.11ty.dev/)のような外部リンクが使えます。

画像は次のように書きます（`alt` は自動で入ります）。

![アイコン](/icon.jpg)

---

## その他

水平線は `---` で描けます（上でも使用済み）。

| 列A | 列B | 列C |
|-----|-----|-----|
| 1   | 2   | 3   |
| a   | b   | c   |

以上、Markdown の一通りの装飾テストでした。
