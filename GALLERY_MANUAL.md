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
3. 保存後、`npm run build`→FTPアップロードで反映されます。

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

何か不明点があれば、開発担当者またはサポートAIまでご相談ください。 