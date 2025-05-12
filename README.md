# Photo Gallery（React + Tailwind CSS）

## 概要
React（TypeScript）とTailwind CSSで作成したフォトギャラリーアプリです。セクションごと（例：`itary`、`family`）に画像を管理し、ピンタレスト風のmasonryレイアウトで表示します。サムネイルクリックでLightbox（詳細ページ）を表示し、UI/UXもミニマルかつスタイリッシュに調整しています。

## 主な機能
- セクションごとのギャラリー表示（masonryレイアウト、レスポンシブ対応）
- 「more +」「less -」ボタンで画像の表示数をトグル
- サイドバー/トグルメニューでセクション間スクロール
- サムネイルクリックでLightbox（詳細ページ）表示
- 画像60%・テキスト40%の2カラム（スマホは1カラム）
- アローボタン・クローズボタンの最適配置

## ディレクトリ構成（一部）
```
public/
  images/
    itary/
    family/
src/
  data/photos.ts  # 画像データ配列
  components/     # UI部品
```

## 画像管理について
- 画像ファイル（`public/images/`配下）は**GitHub管理外**です。
- `.gitignore`で除外しており、リポジトリには含まれません。
- 画像データは`src/data/photos.ts`でパス・メタ情報を配列管理しています。
- サーバー公開時は、画像をサーバー側で管理・配信してください。

## セットアップ
1. リポジトリをクローン
2. 依存パッケージをインストール
   ```bash
   npm install
   ```
3. 必要な画像を`public/images/`配下に配置
4. 開発サーバー起動
   ```bash
   npm run dev
   ```

## 注意事項
- 画像ファイルは容量制限のためGitHubにpushできません。
- 画像を追加・変更した場合は、サーバー側で直接管理してください。
- GitHub Pages等で公開する場合、画像が含まれない点にご注意ください。

## 使用技術
- React 18
- TypeScript
- Tailwind CSS 3
- Vite

---

ご質問・ご要望はIssue等でご連絡ください。 