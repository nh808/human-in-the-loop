# 技術仕様書：Human in the Loop ブログサイト

## 1. 技術スタック詳細

### 1.1 フロントエンド技術
- **HTML5**
  - バージョン：HTML5 Living Standard
  - 文字エンコーディング：UTF-8
  - セマンティックタグ：`<header>`, `<main>`, `<aside>`, `<section>`, `<article>`
  - アクセシビリティ：ARIA属性、alt属性、適切な見出し階層

- **CSS3**
  - CSS Grid Layout
  - Flexbox
  - CSS Custom Properties (CSS Variables)
  - Media Queries for Responsive Design
  - CSS Animations & Transitions

- **JavaScript ES6+**
  - ECMAScript 2015+
  - Classes
  - Arrow Functions
  - Template Literals
  - Destructuring Assignment
  - Modules (future implementation)

### 1.2 開発・運用環境
- **IDE/Editor**：Claude Code
- **Version Control**：Git 2.x
- **Repository**：GitHub
- **Deployment**：Vercel
- **Local Development**：Python http.server または npx serve

## 2. ファイル構成詳細

### 2.1 HTMLファイル
```
index.html                 # メインページ（ホーム）
ai-learning-journey.html   # 記事1：生成AIを学ぶ旅路
blog-development.html      # 記事2：ブログ開発記録
demos/calculator/index.html # デモ：電卓アプリ
```

### 2.2 CSSファイル
```css
/* styles.css - メインスタイルシート */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --background-color: #f8f9fa;
  --text-color: #333;
  --border-color: #dee2e6;
}

/* レスポンシブブレークポイント */
@media (max-width: 768px) { /* モバイル */ }
@media (min-width: 769px) and (max-width: 1023px) { /* タブレット */ }
@media (min-width: 1024px) { /* デスクトップ */ }
```

### 2.3 JavaScriptファイル
```javascript
// script.js - メインスクリプト
class PersonalBlog {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupNavigation();
    this.setupSearch();
    this.setupTagFiltering();
    this.setupLikeFunction();
    this.setupContactForm();
  }
}
```

## 3. 機能実装詳細

### 3.1 記事検索機能
```javascript
setupSearch() {
  const searchInput = document.querySelector('.search-input');
  const performSearch = () => {
    const query = searchInput.value.toLowerCase().trim();
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
      const title = article.querySelector('.article-title a').textContent.toLowerCase();
      const description = article.querySelector('.article-description').textContent.toLowerCase();
      const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
      
      const matches = title.includes(query) || 
                    description.includes(query) || 
                    tags.some(tag => tag.includes(query));
      
      article.style.display = matches ? 'block' : 'none';
    });
  };
}
```

### 3.2 タグフィルタリング機能
```javascript
filterByTag(tagName) {
  const articles = document.querySelectorAll('.article-card');
  
  articles.forEach(article => {
    const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent);
    const hasTag = tags.includes(tagName);
    article.style.display = hasTag ? 'block' : 'none';
  });
}
```

### 3.3 いいね機能
```javascript
setupLikeFunction() {
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => {
    if (stat.textContent.includes('👍')) {
      stat.addEventListener('click', () => {
        const currentCount = parseInt(stat.textContent.match(/\\d+/)[0]);
        stat.textContent = `👍 ${currentCount + 1}`;
        
        // アニメーション効果
        stat.style.transform = 'scale(1.2)';
        setTimeout(() => {
          stat.style.transform = 'scale(1)';
        }, 200);
      });
    }
  });
}
```

## 4. データ構造

### 4.1 記事メタデータ (posts.json)
```json
{
  "posts": [
    {
      "id": "ai-learning-journey",
      "title": "生成AIを学ぶ旅路：Claude Codeとの出会い",
      "description": "Claude Codeを使って生成AIについて学習した経験と、技術ブログ開発の記録",
      "date": "2024-01-09",
      "tags": ["AI", "Claude", "学習記録"],
      "category": "AI・機械学習",
      "filename": "2024-01-09-ai-learning-journey.md",
      "url": "ai-learning-journey.html",
      "likes": 12,
      "comments": 3
    }
  ]
}
```

### 4.2 Markdownファイル構造
```markdown
# 生成AIを学ぶ旅路：Claude Codeとの出会い

## はじめに
Claude Codeとの出会いから学習の過程について

## 学習内容
- 生成AIの基本概念
- Claude Codeの使い方
- 実際の開発体験

## 今後の展望
継続的な学習と実践の計画
```

## 5. スタイルガイド

### 5.1 カラーパレット
```css
:root {
  /* Primary Colors */
  --primary-dark: #2c3e50;
  --primary-light: #34495e;
  
  /* Secondary Colors */
  --secondary-blue: #3498db;
  --secondary-light: #5dade2;
  
  /* Accent Colors */
  --accent-red: #e74c3c;
  --accent-green: #27ae60;
  --accent-orange: #f39c12;
  
  /* Neutral Colors */
  --white: #ffffff;
  --light-gray: #f8f9fa;
  --gray: #6c757d;
  --dark-gray: #495057;
  --black: #212529;
  
  /* Border Colors */
  --border-light: #dee2e6;
  --border-medium: #ced4da;
}
```

### 5.2 タイポグラフィ
```css
/* フォント設定 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
}

/* 見出し */
h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
h2 { font-size: 2rem; font-weight: 600; margin-bottom: 0.875rem; }
h3 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; }
h4 { font-size: 1.25rem; font-weight: 500; margin-bottom: 0.625rem; }

/* 本文 */
p { margin-bottom: 1rem; }
```

### 5.3 レスポンシブデザイン
```css
/* Mobile First Approach */
.main-container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* タブレット以上 */
@media (min-width: 768px) {
  .main-container {
    flex-direction: row;
    gap: 2rem;
  }
  
  .main-content {
    flex: 1;
  }
  
  .sidebar {
    width: 300px;
  }
}
```

## 6. パフォーマンス最適化

### 6.1 CSS最適化
```css
/* Critical Path CSS */
.header, .main-content, .sidebar {
  /* 初期表示に必要なスタイル */
}

/* Non-Critical CSS */
.animations, .transitions {
  /* 遅延読み込み可能なスタイル */
}
```

### 6.2 JavaScript最適化
```javascript
// 遅延読み込み
document.addEventListener('DOMContentLoaded', () => {
  // DOM構築後に実行
  new PersonalBlog();
});

// イベントの効率的な処理
setupSearch() {
  const searchInput = document.querySelector('.search-input');
  let debounceTimer;
  
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      this.performSearch();
    }, 300);
  });
}
```

## 7. SEO最適化

### 7.1 メタタグ設定
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Human in the Loop - 技術ブログ</title>
  <meta name="description" content="AI・機械学習・開発について学習した内容を発信する技術ブログ">
  <meta name="keywords" content="AI,機械学習,Claude,開発,技術ブログ">
  <meta name="author" content="Human in the Loop">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Human in the Loop">
  <meta property="og:description" content="AI・機械学習・開発について学習した内容を発信する技術ブログ">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://your-domain.vercel.app">
</head>
```

### 7.2 構造化データ
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Human in the Loop",
  "description": "AI・機械学習・開発について学習した内容を発信する技術ブログ",
  "url": "https://your-domain.vercel.app",
  "author": {
    "@type": "Person",
    "name": "Tech Blogger"
  }
}
</script>
```

## 8. アクセシビリティ

### 8.1 ARIA属性
```html
<nav aria-label="メインナビゲーション">
  <a href="#home" aria-current="page">ホーム</a>
  <a href="#posts">記事</a>
</nav>

<main aria-label="メインコンテンツ">
  <section aria-labelledby="posts-heading">
    <h2 id="posts-heading">最新記事</h2>
  </section>
</main>
```

### 8.2 キーボードナビゲーション
```css
/* フォーカス表示 */
a:focus, button:focus, input:focus {
  outline: 2px solid var(--secondary-color);
  outline-offset: 2px;
}

/* スキップリンク */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}
```

## 9. エラーハンドリング

### 9.1 JavaScript エラーハンドリング
```javascript
try {
  // 機能実行
  this.performSearch();
} catch (error) {
  console.error('検索機能でエラーが発生しました:', error);
  this.showMessage('検索中にエラーが発生しました。', 'error');
}
```

### 9.2 フォームバリデーション
```javascript
setupContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // バリデーション
    if (!data.name || !data.email || !data.message) {
      this.showMessage('すべての項目を入力してください。', 'error');
      return;
    }
    
    if (!this.validateEmail(data.email)) {
      this.showMessage('有効なメールアドレスを入力してください。', 'error');
      return;
    }
    
    // 送信処理
    this.submitForm(data);
  });
}
```

## 10. テスト方針

### 10.1 手動テスト項目
- [ ] 全ページの正常表示
- [ ] レスポンシブデザインの確認
- [ ] 検索機能の動作
- [ ] タグフィルタリング機能
- [ ] いいね機能のカウント
- [ ] お問い合わせフォームの送信
- [ ] ナビゲーションの動作
- [ ] 各ブラウザでの動作確認

### 10.2 将来的な自動テスト
```javascript
// Jest テストケース例
describe('PersonalBlog', () => {
  test('検索機能が正常に動作する', () => {
    // テストケース実装
  });
  
  test('タグフィルタリングが正常に動作する', () => {
    // テストケース実装
  });
});
```

## 11. デプロイメント設定

### 11.1 Vercel設定 (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### 11.2 Git設定 (.gitignore)
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

## 12. 監視・メンテナンス

### 12.1 パフォーマンス監視
- **Lighthouse スコア**：90点以上維持
- **Core Web Vitals**：Google推奨値以内
- **ページ読み込み時間**：3秒以内

### 12.2 セキュリティ監視
- **HTTPS証明書**：Vercelの自動更新
- **セキュリティヘッダー**：定期的な確認
- **依存関係**：脆弱性チェック

## 13. 今後の技術的改善

### 13.1 短期改善（1-3ヶ月）
- Progressive Web App (PWA) 対応
- Service Worker によるキャッシュ最適化
- 画像の遅延読み込み (Lazy Loading)

### 13.2 中長期改善（3-12ヶ月）
- TypeScript導入
- フロントエンドフレームワーク（React/Vue）
- APIファースト設計への移行
- 自動テストの導入

## 14. 技術的制約と対策

### 14.1 現在の制約
- **サーバーサイド処理なし**
  - 対策：静的サイト生成とクライアントサイド処理
- **データベースなし**
  - 対策：JSONファイルでのデータ管理
- **認証機能なし**
  - 対策：将来的なAuth0等の導入

### 14.2 スケーラビリティ対策
- **記事数の増加**
  - 対策：ページネーション機能の追加
- **トラフィック増加**
  - 対策：CDN配信とキャッシュ最適化
- **機能拡張**
  - 対策：モジュール化とコンポーネント設計

## 15. ドキュメント管理

### 15.1 技術ドキュメント
- `docs/requirements.md` - 要件定義書
- `docs/system-design.md` - システム設計書
- `docs/technical-specs.md` - 技術仕様書（本書）
- `docs/deployment-guide.md` - デプロイメントガイド

### 15.2 更新履歴
- 2024-01-09: 初版作成
- 2024-01-09: Vercelデプロイエラー修正対応

## 16. 承認・レビュー

- **技術仕様完了日**：2024年1月9日
- **作成者**：Claude Code
- **レビュー者**：プロジェクトオーナー
- **承認者**：プロジェクトオーナー
- **次回更新予定**：機能追加時またはアーキテクチャ変更時