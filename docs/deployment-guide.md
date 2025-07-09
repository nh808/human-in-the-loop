# デプロイメントガイド：Human in the Loop ブログサイト

## 1. デプロイメント概要

### 1.1 デプロイメントフロー
```
ローカル開発 → GitHub → Vercel → 本番環境
```

### 1.2 使用サービス
- **ソースコード管理**：GitHub
- **CI/CD**：Vercel自動デプロイ
- **ホスティング**：Vercel
- **ドメイン**：Vercel提供サブドメイン

## 2. 初回デプロイ手順

### 2.1 前提条件
- GitHubアカウントを持っている
- Vercelアカウントを持っている
- ローカルにGitがインストール済み
- プロジェクトコードが完成している

### 2.2 GitHubリポジトリの作成

#### 手順1: GitHubでリポジトリを作成
1. https://github.com/new にアクセス
2. リポジトリ名：`human-in-the-loop`
3. 公開設定：Public
4. 「Create repository」をクリック

#### 手順2: ローカルからプッシュ
```bash
# Gitリポジトリの初期化（既に完了済み）
git init

# GitHubリモートリポジトリを追加
git remote add origin https://github.com/YOUR_USERNAME/human-in-the-loop.git

# ファイルをステージング
git add .

# コミット作成
git commit -m \"Initial commit: Human in the Loop blog

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>\"

# GitHubにプッシュ
git push -u origin main
```

### 2.3 Vercelでのデプロイ設定

#### 手順1: Vercelにログイン
1. https://vercel.com にアクセス
2. 「Continue with GitHub」でログイン

#### 手順2: プロジェクトをインポート
1. ダッシュボードから「Add New...」→「Project」をクリック
2. GitHubリポジトリ一覧から「human-in-the-loop」を選択
3. 「Import」をクリック

#### 手順3: デプロイ設定
```
Project Name: human-in-the-loop
Framework Preset: Other
Root Directory: ./
Build Command: (空欄)
Output Directory: (空欄)
Install Command: (空欄)
```

#### 手順4: デプロイ実行
1. 「Deploy」をクリック
2. デプロイ完了まで待機（通常1-3分）
3. 成功時にURLが表示される

## 3. 継続的デプロイ（CD）

### 3.1 自動デプロイ設定
Vercelは自動的に以下を設定します：
- **main**ブランチへのプッシュ → 本番環境へ自動デプロイ
- **他のブランチ**へのプッシュ → プレビュー環境へ自動デプロイ

### 3.2 デプロイフロー
```
1. ローカルでコード変更
2. git add . && git commit -m \"変更内容\"
3. git push origin main
4. Vercelが自動的に検知
5. ビルド・デプロイ実行
6. 完了時にSlackなどで通知（オプション）
```

## 4. 環境管理

### 4.1 環境種別
- **本番環境**：mainブランチ
- **プレビュー環境**：フィーチャーブランチ
- **ローカル環境**：開発用

### 4.2 環境変数設定
現在は環境変数を使用していませんが、将来的に必要になった場合：

#### Vercelで環境変数を設定
1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」タブをクリック
3. 「Environment Variables」を選択
4. 変数名・値・環境を設定

```
例：
Name: API_BASE_URL
Value: https://api.example.com
Environment: Production
```

## 5. ドメイン設定

### 5.1 Vercelサブドメイン
デフォルトで以下のURLが提供されます：
- `https://human-in-the-loop.vercel.app`
- `https://human-in-the-loop-git-main-username.vercel.app`

### 5.2 独自ドメイン設定（オプション）
```
1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Domains」をクリック
3. 「Add Domain」で独自ドメインを入力
4. DNSレコードを設定（CNAMEまたはAレコード）
5. SSL証明書が自動的に設定される
```

## 6. デプロイ設定ファイル

### 6.1 vercel.json
```json
{
  \"headers\": [
    {
      \"source\": \"/(.*)\",
      \"headers\": [
        {
          \"key\": \"X-Frame-Options\",
          \"value\": \"DENY\"
        },
        {
          \"key\": \"X-Content-Type-Options\",
          \"value\": \"nosniff\"
        }
      ]
    }
  ]
}
```

### 6.2 .gitignore
```
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.production

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Temporary files
*.tmp
*.temp
```

## 7. トラブルシューティング

### 7.1 よくあるエラーと対処法

#### エラー1: \"Function Runtimes must have a valid version\"
```
原因：vercel.jsonの設定が不正
対処：functionsの設定を削除または正しく設定
```

#### エラー2: \"Build failed\"
```
原因：ビルドコマンドの設定問題
対処：Build Commandを空欄にする（静的サイトの場合）
```

#### エラー3: \"404 Not Found\"
```
原因：ファイルパスの問題
対処：ファイル名とリンクの整合性を確認
```

#### エラー4: Git pushが失敗
```bash
# リモートリポジトリを確認
git remote -v

# 正しいリモートURLを設定
git remote set-url origin https://github.com/USERNAME/REPO.git

# 再度プッシュ
git push origin main
```

### 7.2 デプロイログの確認
1. Vercelダッシュボードでプロジェクトを選択
2. 「Deployments」タブを開く
3. 失敗したデプロイをクリック
4. 「View Function Logs」または「View Build Logs」で詳細を確認

## 8. パフォーマンス監視

### 8.1 Vercel Analytics
```
1. Vercelダッシュボードでプロジェクトを選択
2. 「Analytics」タブをクリック
3. ページビュー・パフォーマンスを確認
```

### 8.2 Core Web Vitals
```
- LCP (Largest Contentful Paint): 2.5秒以下
- FID (First Input Delay): 100ms以下
- CLS (Cumulative Layout Shift): 0.1以下
```

## 9. セキュリティ設定

### 9.1 HTTPS設定
- Vercelが自動的にHTTPS証明書を提供
- HTTP→HTTPSの自動リダイレクト
- 証明書の自動更新

### 9.2 セキュリティヘッダー
```json
{
  \"headers\": [
    {
      \"source\": \"/(.*)\",
      \"headers\": [
        {
          \"key\": \"X-Frame-Options\",
          \"value\": \"DENY\"
        },
        {
          \"key\": \"X-Content-Type-Options\",
          \"value\": \"nosniff\"
        },
        {
          \"key\": \"Referrer-Policy\",
          \"value\": \"strict-origin-when-cross-origin\"
        }
      ]
    }
  ]
}
```

## 10. バックアップ・復旧

### 10.1 バックアップ戦略
- **ソースコード**：GitHubリポジトリ
- **デプロイ履歴**：Vercelの自動保存
- **設定情報**：設定ファイルとしてGit管理

### 10.2 復旧手順
```bash
# 特定のコミットに戻す
git log --oneline
git reset --hard COMMIT_HASH
git push --force origin main

# または、Vercelの管理画面から以前のデプロイを再デプロイ
```

## 11. 運用監視

### 11.1 監視項目
- **稼働率**：99.9%以上
- **応答時間**：3秒以内
- **エラー率**：1%以下
- **SSL証明書**：自動更新確認

### 11.2 アラート設定
```
- デプロイ失敗時のSlack通知
- ダウンタイム検知
- パフォーマンス劣化のアラート
```

## 12. 更新・メンテナンス

### 12.1 定期メンテナンス
- **月次**：パフォーマンス確認
- **四半期**：セキュリティ設定確認
- **年次**：技術スタックの見直し

### 12.2 更新手順
```bash
# 機能追加・修正
git checkout -b feature/new-feature
# 開発・テスト
git add .
git commit -m \"新機能の追加\"
git push origin feature/new-feature

# プルリクエスト作成・レビュー
# mainブランチにマージ
git checkout main
git pull origin main
# 本番環境に自動デプロイ
```

## 13. 緊急時対応

### 13.1 緊急時対応フロー
```
1. 問題の発見・報告
2. 影響範囲の特定
3. 緊急対応（ロールバック等）
4. 根本原因分析
5. 恒久対策の実施
6. 再発防止策の検討
```

### 13.2 緊急ロールバック
```bash
# 前回のコミットに戻す
git reset --hard HEAD~1
git push --force origin main

# 特定のコミットに戻す
git reset --hard COMMIT_HASH
git push --force origin main
```

## 14. チーム開発時の運用

### 14.1 ブランチ戦略
```
main        : 本番環境
develop     : 開発環境（将来）
feature/*   : 機能開発
hotfix/*    : 緊急修正
```

### 14.2 プルリクエスト運用
```
1. フィーチャーブランチでの開発
2. プルリクエスト作成
3. コードレビュー
4. mainブランチへマージ
5. 自動デプロイ実行
```

## 15. 将来的な改善計画

### 15.1 短期改善（1-3ヶ月）
- CI/CDパイプラインの改善
- 自動テストの導入
- 監視体制の強化

### 15.2 中長期改善（3-12ヶ月）
- マイクロサービス化
- API連携の実装
- 独自ドメインの取得
- CDNの最適化

## 16. 連絡先・サポート

### 16.1 技術サポート
- **Vercel Documentation**: https://vercel.com/docs
- **GitHub Support**: https://support.github.com
- **プロジェクト管理者**: [連絡先]

### 16.2 緊急連絡先
- **システム障害**: [緊急連絡先]
- **セキュリティ問題**: [セキュリティ担当者]

---

## 更新履歴

- **2024-01-09**: 初版作成
- **2024-01-09**: Vercelエラー対応手順追加

## 承認

- **作成日**: 2024年1月9日
- **作成者**: Claude Code
- **承認者**: プロジェクトオーナー
- **次回更新**: 機能追加・環境変更時