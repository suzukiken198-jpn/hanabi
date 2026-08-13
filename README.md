# DIGITAL HANABI

ブラウザで楽しめる、参加型のデジタル花火大会です。\
An interactive digital fireworks festival that runs directly in your browser.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/live--demo-digital--hanabi.vercel.app-6b7cff.svg)](https://digital-hanabi.vercel.app)

## 日本語 / Japanese

### 公開配布について

このプロジェクトはMIT Licenseで公開しています。個人利用、教育利用、改変、再配布、商用利用が可能です。

利用・再配布する場合は、配布物に [LICENSE](LICENSE) の著作権表示とライセンス文を含めてください。

### デモ

https://digital-hanabi.vercel.app

### 主な機能

- Canvasによるリアルタイム花火パーティクル
- 常時打ち上がる通常花火
- 連射花火
- 色違いの特大玉3発同時打ち上げ
- ハート、星、螺旋、ナイアガラなどの花火表現
- タップ・長押しによる打ち上げ
- Web Audio APIによる打ち上げ音・爆発音
- ART MODE（展示・配信用のUIレス表示）
- スマートフォン対応

### 使い方

ビルドツール不要の静的サイトです。`index.html` をブラウザで開くか、静的ホスティングへ配置してください。

```bash
git clone https://github.com/suzukiken198-jpn/hanabi.git
cd hanabi
open index.html
```

Vercel、GitHub Pages、Netlifyなどの静的ホスティングにそのままデプロイできます。

### カスタマイズ

- `index.html`：画面構成、ボタン、表示文言
- `styles.css`：色、レイアウト、スマートフォン表示
- `app.js`：花火、音、操作、打ち上げ演出

## English

### Public Distribution

This project is released under the MIT License. You may use, copy, modify, publish, distribute, sublicense, and sell it, including for commercial purposes.

When using or redistributing this project, include the copyright notice and license text from [LICENSE](LICENSE).

### Demo

https://digital-hanabi.vercel.app

### Features

- Real-time fireworks particles rendered with Canvas
- Ambient fireworks that launch continuously
- Rapid-fire fireworks sequences
- Three simultaneous extra-large fireworks with varied colors
- Heart, star, spiral, and Niagara-style fireworks
- Tap and long-press launch controls
- Launch and explosion sounds using the Web Audio API
- ART MODE for exhibitions and digital signage
- Mobile-friendly layout

### Usage

This is a build-tool-free static website. Open `index.html` in a browser or deploy the files to any static hosting provider.

```bash
git clone https://github.com/suzukiken198-jpn/hanabi.git
cd hanabi
open index.html
```

It can be deployed directly to Vercel, GitHub Pages, Netlify, or similar static hosting services.

### Customization

- `index.html`: layout, buttons, and visible text
- `styles.css`: colors, layout, and mobile presentation
- `app.js`: fireworks, sound, interaction, and launch sequences

## ライセンス / License

Copyright (c) 2026 Kenichi Suzuki

MIT License。詳細は [LICENSE](LICENSE) を確認してください。\
MIT License. See [LICENSE](LICENSE) for the full text.

外部サービス、Webフォント、利用者が追加する画像・音源などは、それぞれの提供元の利用条件に従ってください。\
External services, web fonts, and any images or audio added by users remain subject to their respective terms.
