# STG V3 Worklog

## 作業境界

- ベース: `feature/stg-v2-redesign` の確定コミット `19316cc`
- V3ブランチ: `feature/stg-v3-experience`
- V3作業場所: `ホームページ/01-制作/site-v3-preview`
- 公開中main、V2プレビュー、GitHub Pagesには触れない。
- 2026-08-05の承認により、V3ブランチへのcommit・pushのみ行う。deployとmain変更は含めない。

## 参照した声の資料

1. `01-STG文体メモ.md`
2. `02-社長挨拶案.md`
3. `20260704_HP制作イメージ議事録.md`
4. `20260704_会社情報.md`
5. `ヒアリングシート.md`
6. `リンク一覧.md`
7. `公開前チェックリスト.md`
8. `初稿確認メモ.md`

`VOICE_INDEX.md`は存在しないため、上記の案件内資料だけを根拠にした。

## 監査で判明した事項

- V2はPCで500svh、モバイルで430svhのヒーローとなり、主文言の到達が遅い。
- 3領域、3目的、6業務、3姿勢、5工程の再分類が重複している。
- ヒーロー後は共通fade-upと番号カードが続き、体験の質が落ちる。
- reduced motionで4現場の内容が欠落する。
- V2のfaviconパスは`BASE_URL`連結でスラッシュが欠ける。
- Astro公開と旧root静的サイトの境界、旧ページURL維持、GitHub Pagesのbuild公開方式は公開前に別途整備が必要。

## 確認待ち

- 代表挨拶本文と代表写真の本人確認・掲載許可
- 作業写真、集合写真、ロゴのWeb掲載許可
- InstagramプロフィールURLとDM運用
- 住所、電話、LINE、メール、営業時間、対応地域、求人条件
- 旧ページURLの移行方針とGitHub Pagesの公開方式

## 次にやること

1. ユーザーがV3ブランチとローカルプレビューを確認する。
2. 代表挨拶・写真・Instagram導線の公開可否を確認する。
3. 公開承認後に、main統合とGitHub Pages移行計画を作る。

## ローカルQA用URL

- 通常: `/sawada-tomu-group-site/`
- 低モーション強制確認（開発時のみ）: `/sawada-tomu-group-site/?motion=reduce`

`motion=reduce`はViteの開発モードだけで有効。本番ではOSの`prefers-reduced-motion`設定だけを参照する。

## 実装結果

- V2の500svhヒーローを、主文言が最初から読める122svh（モバイル108svh）の入口へ再構成。
- 3領域・3目的・6業務の重複を、6業務の一つの一覧へ統合。
- 仕事姿勢と5工程を、`見る / 組む / 仕上げる`の3章＋短い工程表へ統合。
- 現場写真4枚と集合写真1枚を、ページ上でそれぞれ一度だけ主役として使用。
- 集合写真を中盤のaperture reveal＋静止コピーに変更。
- 理念と代表挨拶を紙色の一続きのパートへ統合。
- FAQ後の結末をInstagram DMのContact一つに整理。
- faviconのbase path、canonical、sitemap、旧5URLの互換移動を整備。

## QA結果

- `npm.cmd run build`: Astro check 0 errors / 0 warnings / 0 hints、静的7ページ＋sitemap生成。
- PC `1440×900`、タブレット `768×1024`、スマホ `390×844`で実ブラウザ確認。
- 通常・高速・逆スクロール、reload、resize、PC/スマホナビ、Escape、FAQ開閉、anchor到達を確認。
- 全確認幅で横溢れ`0px`、console error/warning `0`。
- 低モーション強制確認で、全6写真・全sectionが表示され、集合写真とコピーは最初から静止状態。
- favicon・canonical・OG・robots・sitemap・旧URL移動を確認。
- dist内に未確認の電話、LINE、住所、メール、生成実績画像、内部確認文言なし。

## 今回の共有範囲

- V3は`feature/stg-v3-experience`へcommit・pushする。
- deploy / main変更は行っていない。
- 公開中URLはV3に変更していない。
