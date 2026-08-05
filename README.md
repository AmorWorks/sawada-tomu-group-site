# STG Signature Site V3 Preview

株式会社STGホームページの、ローカル確認専用V3です。

## 位置づけ

- V2確定コミット`19316cc`から分岐した独立worktree
- 公開中`main`とV2プレビューは変更しない
- V3は`feature/stg-v3-experience`ブランチで共有する
- 本番反映、`main`への統合、deployは別途承認後に行う
- 詳しい設計は`V3_EXPERIENCE_MAP.md`、確認待ちは`V3_WORKLOG.md`を参照

## 開発

```powershell
npm.cmd ci
npm.cmd run dev
```

確認URL:

`http://localhost:4321/sawada-tomu-group-site/`

## 検証

```powershell
npm.cmd run check
npm.cmd run build
```

## 公開前に必要なこと

- 代表挨拶・代表写真・作業写真・集合写真・ロゴの掲載許可
- Instagram導線の実運用確認
- 旧URLの移行とGitHub PagesのAstro build公開方式の決定
- 未掲載の住所、電話、LINE、メール、営業時間、対応地域、求人条件の再確認

受領済み素材があることは、Web掲載許可の証明ではありません。
