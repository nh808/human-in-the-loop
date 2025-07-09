// 個人ブログサイト JavaScript

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

    setupNavigation() {
        // ナビゲーションリンクのスムーススクロール
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            const articles = document.querySelectorAll('.article-card');
            
            if (query === '') {
                // 空の場合は全記事を表示
                articles.forEach(article => {
                    article.style.display = 'block';
                });
                return;
            }
            
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

        if (searchInput && searchBtn) {
            searchInput.addEventListener('input', performSearch);
            searchBtn.addEventListener('click', performSearch);
            
            // エンターキーでの検索
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    setupTagFiltering() {
        // サイドバーのタグクリック
        const sidebarTags = document.querySelectorAll('.tag-cloud-item');
        const articleTags = document.querySelectorAll('.article-tags .tag');
        const categoryItems = document.querySelectorAll('.category-item');
        
        // タグクラウドのクリック
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

        // カテゴリーアイテムのクリック
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const categoryName = item.textContent.split(' (')[0]; // カテゴリー名のみ抽出
                this.filterByCategory(categoryName);
            });
        });
    }

    filterByTag(tagName) {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent);
            const hasTag = tags.includes(tagName);
            article.style.display = hasTag ? 'block' : 'none';
        });
        
        // 検索ボックスをクリア
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        console.log(`タグでフィルタリング: ${tagName}`);
    }

    filterByCategory(categoryName) {
        const articles = document.querySelectorAll('.article-card');
        
        articles.forEach(article => {
            const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent);
            const title = article.querySelector('.article-title a').textContent;
            
            let matches = false;
            
            // カテゴリー名に基づいてフィルタリング
            switch(categoryName) {
                case 'AI・機械学習':
                    matches = tags.some(tag => ['AI', 'Claude', '機械学習', '学習記録'].includes(tag));
                    break;
                case 'Web開発':
                    matches = tags.some(tag => ['Web開発', 'JavaScript', 'HTML', 'CSS'].includes(tag));
                    break;
                case 'JavaScript':
                    matches = tags.includes('JavaScript');
                    break;
                case '学習記録':
                    matches = tags.includes('学習記録');
                    break;
                default:
                    matches = true;
            }
            
            article.style.display = matches ? 'block' : 'none';
        });
        
        console.log(`カテゴリーでフィルタリング: ${categoryName}`);
    }

    setupLikeFunction() {
        // いいね機能のシミュレーション
        const stats = document.querySelectorAll('.stat');
        stats.forEach(stat => {
            if (stat.textContent.includes('👍')) {
                stat.addEventListener('click', () => {
                    const currentCount = parseInt(stat.textContent.match(/\d+/)[0]);
                    stat.textContent = `👍 ${currentCount + 1}`;
                    
                    // 簡単なアニメーション
                    stat.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 200);
                });
            }
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // フォームデータの処理（実際のプロジェクトでは適切な送信処理を実装）
                console.log('お問い合わせフォーム送信:', data);
                
                // 成功メッセージを表示
                this.showMessage('お問い合わせありがとうございます。後ほどご連絡いたします。', 'success');
                
                // フォームをリセット
                contactForm.reset();
            });
        }
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            max-width: 400px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 3000);
    }

    // 全記事を表示する関数
    showAllArticles() {
        const articles = document.querySelectorAll('.article-card');
        articles.forEach(article => {
            article.style.display = 'block';
        });
        
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = '';
        }
    }
}

// DOMが読み込まれたときに初期化
document.addEventListener('DOMContentLoaded', () => {
    new PersonalBlog();
});