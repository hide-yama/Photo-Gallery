# フォトギャラリー運用マニュアル

このドキュメントは、React＋Tailwind CSS製フォトギャラリーの運用方法（画像追加・タイトルや解説の編集・セクション追加など）をまとめた取扱説明書です。

---

## 1. 画像を追加する

1. `public/images/`配下の該当セクション（例：`itary`や`family`）ディレクトリに画像ファイルを追加します。
   - 例: `public/images/itary/新しい画像.jpg`
2. `src/data/photos.ts`を開き、該当セクションの配列（例：`itaryPhotos`や`familyPhotos`）に新しい画像情報を追加します。
   - 例:
     ```ts
     itaryPhotos.push({
       id: 'itary-26',
       src: 'images/itary/新しい画像.jpg',
       fullSrc: 'images/itary/新しい画像.jpg',
       alt: '新しい画像',
       width: 600, // 実際の画像サイズに合わせて
       height: 400,
       title: 'Italy',
       description: '画像の説明文'
     });
     ```
3. 保存後、` build`→FTPアップロードで反映されます。

---

## 2. タイトルや解説を編集する

- `src/data/photos.ts`内の各画像オブジェクトの`title`や`description`を編集してください。
- 例:
  ```ts
  description: '新しい説明文に変更'
  ```
- 保存後、ビルド＆FTPアップロードで反映されます。

---

## 3. セクションを増やしたい時

1. `public/images/`配下に新しいディレクトリを作成し、画像を配置します。
   - 例: `public/images/travel/`
2. `src/data/photos.ts`で新しい配列を作成し、画像情報を追加します。
   - 例:
     ```ts
     export const travelPhotos: Photo[] = [
       { id: 'travel-1', src: 'images/travel/xxx.jpg', ... },
       // ...
     ];
     ```
3. `sections`配列に新しいセクションを追加します。
   - 例:
     ```ts
     export const sections = [
       { id: 'itary', label: 'Italy', photos: itaryPhotos },
       { id: 'family', label: 'Family', photos: familyPhotos },
       { id: 'travel', label: 'Travel', photos: travelPhotos },
     ];
     ```
4. 保存後、ビルド＆FTPアップロードで反映されます。

---

## 4. 注意事項

- 画像ファイル名やidは**重複しないように**してください。
- 画像サイズ（width/height）は実際の画像に合わせて記入するとレイアウトが安定します。
- `.env`や画像ファイルは**Git管理外**です。
- 変更後は必ず`npm run build`→FTPアップロードを行ってください。

---

## 5. よくある質問

- **Q. 画像を削除したい場合は？**
  - `public/images/`から画像を削除し、`src/data/photos.ts`の該当エントリも削除してください。
- **Q. サイドバーやページ内リンクも自動で増えますか？**
  - `sections`配列に追加すれば自動で連動します。

---

## 6. Git操作ガイド

### Gitの基本操作

1. **変更の確認**:
   ```bash
   git status
   ```
   変更されたファイルを確認できます。

2. **変更をステージング**:
   ```bash
   git add .             # すべての変更をステージング
   git add ファイル名     # 特定のファイルをステージング
   ```

3. **変更をコミット**:
   ```bash
   git commit -m "変更内容の説明"
   ```

4. **変更をリモートリポジトリにプッシュ**:
   ```bash
   git push origin main  # mainブランチにプッシュ
   ```

### ブランチ操作

1. **新しいブランチを作成**:
   ```bash
   git checkout -b ブランチ名
   ```

2. **ブランチの切り替え**:
   ```bash
   git checkout ブランチ名
   ```

3. **変更をマージ**:
   ```bash
   git checkout main     # メインブランチに切り替え
   git merge ブランチ名   # ブランチの変更をマージ
   ```

### 画像ファイルのGit管理について

- 大きな画像ファイルはGit LFSを使用して管理すると効率的です。
- `.gitignore`に記載されているファイルは管理されません（`public/images/`が除外されている場合もあります）。

---

## 7. FTPアップロードガイド

### FTPクライアントを使用する方法

1. **FTPクライアントのインストール**:
   - [FileZilla](https://filezilla-project.org/)
   - [Cyberduck](https://cyberduck.io/)
   - [WinSCP](https://winscp.net/)（Windows専用）

2. **接続設定**:
   - ホスト: `ftp.yourserver.com`（サーバー情報に合わせて変更）
   - ユーザー名: `ftpユーザー名`
   - パスワード: `ftpパスワード`
   - ポート: 21（標準）またはサーバー指定のポート

3. **ファイルのアップロード**:
   - ビルド後に生成される`build`または`dist`フォルダーの内容をサーバーの公開ディレクトリ（通常は`public_html`や`www`など）にアップロードします。

### コマンドラインからのFTPアップロード

1. **ビルドコマンド**:
   ```bash
   npm run build
   ```

2. **FTPコマンドラインツール**:
   - Linux/Macでは`lftp`や`ncftp`などが利用可能です。
   - 例（lftp使用）:
     ```bash
     lftp -u ユーザー名,パスワード ftp.yourserver.com
     mirror -R build/ /public_html/
     ```

3. **スクリプトを使用したアップロード**:
   - NPMパッケージ（ftp-deployなど）を使って自動化できます。
   - `package.json`に以下のようなスクリプトを追加:
     ```json
     "scripts": {
       "deploy": "npm run build && node scripts/deploy.js"
     }
     ```
   - そして`npm run deploy`コマンドで自動ビルド＆アップロードを実行。

### 注意事項

- アップロードに時間がかかる場合は、必要なファイルのみを選択してアップロードすることも検討してください。
- FTP認証情報は安全に管理し、`.env`ファイルなどで環境変数として保存することをオススメします。
- 大量のファイルをアップロードする場合は、夜間や低トラフィック時間帯に実行することを検討してください。

### プロジェクト専用のFTPアップロードスクリプト

このプロジェクトでは、自動FTPアップロード用のスクリプト`upload-ftp.cjs`が用意されています。このスクリプトを使用すると、ビルドしたファイルを簡単にサーバーにアップロードできます。

1. **環境変数の設定**:
   プロジェクトルートに`.env`ファイルを作成し、以下の情報を設定します。
   ```
   FTP_HOST=ftpサーバーのホスト名
   FTP_USER=ftpユーザー名
   FTP_PASS=ftpパスワード
   FTP_PORT=21
   FTP_REMOTE_DIR=/photo-gallery
   ```

2. **アップロード手順**:
   ```bash
   # まずプロジェクトをビルド
   npm run build
   
   # FTPアップロードスクリプトを実行
   node upload-ftp.cjs
   ```

3. **アップロード進捗**:
   スクリプト実行中は、アップロードの進捗状況が表示されます。
   ```
   アップロード: dist/index.html → /photo-gallery//index.html
   アップロード: dist/assets/index-XXX.js → /photo-gallery//assets/index-XXX.js
   ...
   アップロード完了
   ```

4. **トラブルシューティング**:
   - エラーが発生した場合は、`.env`ファイルの設定を確認してください。
   - ネットワーク接続に問題がないか確認してください。
   - FTPサーバーのファイルパーミッションやディレクトリ構造を確認してください。

> 注意: `.env`ファイルにはFTP認証情報が含まれるため、このファイルは`.gitignore`に追加されており、Gitリポジトリにはコミットされません。

---

何か不明点があれば、開発担当者またはサポートAIまでご相談ください。 