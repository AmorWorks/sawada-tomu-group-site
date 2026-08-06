# STG Signature Site V3 Preview

株式会社STGホームページの、ローカル確認専用V3です。

## 位置づけ

- V2確定コミット`19316cc`から分岐した独立worktree
- V3のソース正本は`feature/stg-v3-experience`ブランチで管理する
- 2026-08-07に、現行V3の代表挨拶・写真を含む本番公開が承認された
- 本番`main`にはソース一式ではなく、検査済みのAstro build成果物だけを配置する
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

## 公開・運用の確認事項

- 代表挨拶・代表写真・作業写真・集合写真は2026-08-07の公開承認対象
- Instagram導線は公開直前と公開後に遷移確認する
- 旧URLはAstroの互換ページでトップ内の該当箇所へ移動する
- 住所、電話、LINE、メール、営業時間、対応地域、求人条件は、確認が取れるまで本番に掲載しない

受領済み素材があることは、Web掲載許可の証明ではありません。
