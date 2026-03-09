---
title: ブログをVibe Codingで作ってみた
description: 自分のポートフォリオサイト内に、簡単なブログ機能を作ってみました。これは記念すべき最初の記事です！
date: 2026-03-10
permalink: /blog/hello-my-blog/
layout: layouts/post.njk
tags:
  - posts
---

自分のポートフォリオサイト内に、簡単なブログ機能を作ってみました。
流行ってるVibe Codingをしてみたくなったのですが、あんまり生活の中に解決したい課題がないのですよね。

ということで無難なお題ということで、ブログを作らせてみました。

Cursor Proにお金を払ってAutoってやつにいい感じにやってもらっています。そもそも僕はほぼコード書けません。完全雰囲気コーディング。

感想ここまで。以下、このサイトの技術スタックを**Cursorくんが**解説します。

---

## 全体像

このブログは **Eleventy（11ty）** という静的サイトジェネレータでビルドし、**Netlify** の無料プランでホストしています。データベースやサーバーサイドの処理はなく、ビルド時に Markdown から HTML を生成して配信するだけの構成です。

## 技術スタック

- **ビルド**: [Eleventy](https://www.11ty.dev/) v3
- **テンプレート**: [Nunjucks](https://mozilla.github.io/nunjucks/)
- **ホスティング**: Netlify（`npm run build` で `_site` を公開）
- **スタイル**: 単一の CSS ファイル（`style.css`）、既存のポートフォリオ用デザインを流用

## ディレクトリ構成

- **`src/`** … ビルドの入力。ここだけ編集する想定です。
  - **`index.njk`** … トップページ（ヒーロー・About〜Support・フッター）
  - **`blog.njk`** … ブログ一覧ページ（20件/ページ、ページネーション付き）
  - **`posts/*.md`** … 記事。front matter でタイトル・日付・permalink・レイアウトを指定
  - **`_includes/`** … 共通パーツ
    - **`site-header.njk`** … 全ページ共通の「yukiya.me / blog」ヘッダー
    - **`layouts/post.njk`** … 記事ページ用レイアウト（パンくず・アイコン・日時・本文）
- **`_site/`** … ビルド出力。Netlify はこの中身をそのまま配信します。
- **ルート** … `style.css`・`icon.jpg`・`favicon.ico` などはルートに置き、Eleventy の **passthrough copy** で `_site` にコピーされます。

## 記事の書き方

1. `src/posts/` に `YYYY-MM-DD-slug.md` のようなファイルを追加する
2. 先頭で **front matter** を書く：
   - `title` … 記事タイトル
   - `description` … 一覧用の抜粋（省略時は本文の先頭 120 文字から自動生成）
   - `date` … 投稿日時（JST で表示）
   - `permalink` … 例: `/blog/hello-my-blog/`
   - `layout: layouts/post.njk`
   - `tags: [posts]` … 一覧に載せるために必要
3. その下から Markdown で本文を書く

## 日付と抜粋

- **日付**: Luxon で JST に変換して表示しています。
  - 一覧: `jpDateShort` → `2026-03-10 (Tue)` 形式
  - 記事ページ: `jpDate` → `2026-03-10 (Tue) 09:00` 形式
- **抜粋**: front matter の `description` があればそれを使い、なければ本文 HTML をタグ除去して先頭 120 文字＋「…」を表示します。

## ページネーション

- 一覧は **20件/ページ**。21件目以降は 2 ページ目（`/blog/2/`）、3 ページ目（`/blog/3/`）… に分かれます。
- 1 ページ目だけ `/blog/`、2 ページ目以降は `/blog/2/` のように URL を振っています（`.eleventy.js` ではなく `blog.njk` の front matter で `permalink` を条件分岐）。
- 一覧の下に「○ / ○ ページ」と「前へ」「1」「2」…「次へ」を表示。現在ページの数字はリンクにせず濃い色で表示しています。

## 画像の配置

画像を使うときは次のようにします。

1. **画像ファイルを置く**  
   プロジェクトルートの **`img/`** フォルダに画像を入れてください。`img/` は Eleventy の passthrough copy でそのまま `_site/img/` にコピーされるので、ビルド後に `/img/ファイル名` で参照できます。

2. **記事から参照する**  
   Markdown の画像記法で、サイトルートからのパスを書きます。

   ```markdown
   ![画像の説明（代替テキスト）](/img/ファイル名.jpg)
   ```

参考として、`img/lycoris.jpg` をこの記事に表示してみます。

![リコリスの参考画像](/img/lycoris.jpg)

## ビルドとデプロイ

- **ローカル**: `npm run dev` で `http://localhost:8080` にプレビュー
- **本番**: `npm run build` で `_site` を生成。Netlify は `netlify.toml` のとおり `npm run build` を実行し、`_site` を公開します。

以上が、このブログを支えている技術の概要です。
