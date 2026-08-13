# DIGITAL HANABI

ブラウザで楽しめる、参加型のデジタル花火大会です。

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/live--demo-digital--hanabi.vercel.app-6b7cff.svg)](https://digital-hanabi.vercel.app)

## 公開配布について

このプロジェクトはMIT Licenseで公開しています。

個人利用・教育利用・改変・再配布・商用利用が可能です。利用時は、配布物に [LICENSE](LICENSE) の著作権表示とライセンス文を含めてください。

## デモ

https://digital-hanabi.vercel.app

## 主な機能

- Canvasによるリアルタイム花火パーティクル
- 常時打ち上がる通常花火
- 連射花火
- 色違いの特大玉3発同時打ち上げ
- ハート、星、螺旋、ナイアガラなどの花火表現
- タップ・長押しによる打ち上げ
- Web Audio APIによる打ち上げ音・爆発音
- ART MODE（展示・配信用のUIレス表示）
- スマートフォン対応

## 使い方

ビルドツール不要の静的サイトです。`index.html` をブラウザで開くか、静的ホスティングへ配置してください。

```bash
git clone https://github.com/suzukiken198-jpn/hanabi.git
cd hanabi
open index.html
```

Vercel、GitHub Pages、Netlifyなどの静的ホスティングにもそのままデプロイできます。

## カスタマイズ

- `index.html`：画面構成、ボタン、表示文言
- `styles.css`：色、レイアウト、スマートフォン表示
- `app.js`：花火、音、操作、打ち上げ演出

## ライセンス

Copyright (c) 2026 Kenichi Suzuki

MIT License。詳しくは [LICENSE](LICENSE) を確認してください。

※このリポジトリ内のコードを対象としたライセンスです。外部サービス、Webフォント、利用者が追加する画像・音源などは、それぞれの提供元の利用条件に従ってください。
