// Zenn風ブログサイト JavaScript

class ZennBlog {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabSwitching();
        this.setupSearch();
        this.setupTagFiltering();
    }

    setupTabSwitching() {
        const tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // アクティブタブの切り替え
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                // タブに応じたコンテンツフィルタリング
                const tabType = e.target.dataset.tab;
                this.filterArticlesByTab(tabType);
            });
        });
    }

    filterArticlesByTab(tabType) {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            // すべての記事を表示（実際のプロジェクトでは、記事にカテゴリデータを持たせる）
            article.style.display = 'flex';
        });
        
        console.log(`フィルタリング: ${tabType}`);
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        const performSearch = () => {
            const query = searchInput.value.toLowerCase();
            const articles = document.querySelectorAll('.article-card');
            
            articles.forEach(article => {
                const title = article.querySelector('.article-title a').textContent.toLowerCase();
                const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                const matches = title.includes(query) || tags.some(tag => tag.includes(query));
                article.style.display = matches ? 'flex' : 'none';
            });
        };

        searchInput.addEventListener('input', performSearch);
        searchBtn.addEventListener('click', performSearch);
        
        // エンターキーでの検索
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    setupTagFiltering() {
        const sidebarTags = document.querySelectorAll('.sidebar-tag');
        const articleTags = document.querySelectorAll('.article-tags .tag');
        
        // サイドバーのタグクリック
        sidebarTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByTag(tag.textContent);
            });
        });
        
        // 記事内のタグクリック
        articleTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterByTag(tag.textContent);
            });
        });
    }

    filterByTag(tagName) {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent);
            const hasTag = tags.includes(tagName);
            article.style.display = hasTag ? 'flex' : 'none';
        });
        
        console.log(`タグでフィルタリング: ${tagName}`);
    }

    // いいね機能のシミュレーション
    setupLikeFunction() {
        const stats = document.querySelectorAll('.stat');
        stats.forEach(stat => {
            if (stat.textContent.includes('👍')) {
                stat.addEventListener('click', () => {
                    const currentCount = parseInt(stat.textContent.match(/\d+/)[0]);
                    stat.textContent = `👍 ${currentCount + 1}`;
                });
            }
        });
    }
}

// DOMが読み込まれたときに初期化
document.addEventListener('DOMContentLoaded', () => {
    new ZennBlog();
});

// ナビゲーション項目のアクティブ状態管理
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        e.target.classList.add('active');
    });
});