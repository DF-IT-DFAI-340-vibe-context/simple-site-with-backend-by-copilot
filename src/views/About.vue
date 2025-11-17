<template>
  <div class="about-container">
    <nav class="navbar">
      <div class="nav-content">
        <h2>簡單網站</h2>
        <div class="nav-links">
          <router-link to="/welcome" class="nav-link" v-if="isLoggedIn">歡迎頁</router-link>
          <router-link to="/about" class="nav-link">關於我們</router-link>
          <router-link to="/login" class="nav-link" v-if="!isLoggedIn">登入</router-link>
          <button @click="handleLogout" class="logout-btn" v-if="isLoggedIn">登出</button>
        </div>
      </div>
    </nav>
    
    <div class="content">
      <div class="about-box">
        <h1>關於我們</h1>
        
        <section class="section">
          <h2>專案介紹</h2>
          <p>
            這是一個使用現代化技術堆疊建立的簡單網站範例。本專案展示了前後端分離架構的基本實現，
            並包含了使用者認證、路由保護等常見功能。
          </p>
        </section>

        <section class="section">
          <h2>技術堆疊</h2>
          <div class="tech-grid">
            <div class="tech-card">
              <h3>前端技術</h3>
              <ul>
                <li>Vite - 快速的建置工具</li>
                <li>Vue 3 - 漸進式 JavaScript 框架</li>
                <li>Vue Router - 官方路由管理器</li>
                <li>SCSS - CSS 預處理器</li>
              </ul>
            </div>
            <div class="tech-card">
              <h3>後端技術</h3>
              <ul>
                <li>Node.js - JavaScript 執行環境</li>
                <li>HTTP 模組 - 原生 HTTP 伺服器</li>
                <li>Token 認證 - 授權機制</li>
                <li>Mock API - 模擬後端服務</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>主要功能</h2>
          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">🔐</div>
              <h3>使用者認證</h3>
              <p>基於 Token 的登入系統，保護需要授權的頁面</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🌍</div>
              <h3>環境配置</h3>
              <p>支援開發環境和正式環境的不同配置</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎨</div>
              <h3>現代化 UI</h3>
              <p>使用 SCSS 打造美觀的使用者介面</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>環境配置</h2>
          <p>
            本專案使用 <code>.env.development</code> 和 <code>.env.production</code> 來管理不同環境的配置。
            主要的環境變數包括：
          </p>
          <ul>
            <li><code>VITE_CONTEXT_PATH</code>：網址路徑前綴</li>
            <li><code>VITE_API_URL</code>：API 伺服器位址</li>
          </ul>
          <p class="current-env">
            <strong>目前環境：</strong>{{ environment }}<br>
            <strong>路徑前綴：</strong>{{ contextPath }}
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../utils/api'

export default {
  name: 'About',
  setup() {
    const router = useRouter()
    const contextPath = ref('')
    const environment = ref('')
    
    const isLoggedIn = computed(() => {
      return !!localStorage.getItem('authToken')
    })

    onMounted(() => {
      contextPath.value = import.meta.env.VITE_CONTEXT_PATH || '/'
      environment.value = import.meta.env.MODE === 'production' ? '正式環境' : '開發環境'
    })

    const handleLogout = async () => {
      const token = localStorage.getItem('authToken')
      
      try {
        await logout(token)
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        localStorage.removeItem('authToken')
        localStorage.removeItem('username')
        router.push('/login')
      }
    }

    return {
      contextPath,
      environment,
      isLoggedIn,
      handleLogout
    }
  }
}
</script>

<style scoped lang="scss">
.about-container {
  min-height: 100vh;
  background: #f5f7fa;
}

.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
      color: #333;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;

      .nav-link {
        color: #555;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;

        &:hover, &.router-link-active {
          color: #667eea;
        }
      }

      .logout-btn {
        padding: 0.5rem 1rem;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.3s;

        &:hover {
          background: #c0392b;
        }
      }
    }
  }
}

.content {
  max-width: 900px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.about-box {
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2.5rem;
  }

  .section {
    margin-bottom: 3rem;

    h2 {
      color: #667eea;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #667eea;
    }

    p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    ul {
      color: #555;
      line-height: 1.8;
      
      li {
        margin-bottom: 0.5rem;
      }
    }

    code {
      background: #f4f4f4;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      color: #e74c3c;
    }

    .current-env {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;

    .tech-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e0e0e0;

      h3 {
        color: #333;
        margin-top: 0;
        margin-bottom: 1rem;
      }

      ul {
        padding-left: 1.5rem;
        margin: 0;
      }
    }
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 1.5rem;

    .feature-item {
      text-align: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        color: #333;
        margin-bottom: 0.5rem;
      }

      p {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
}
</style>
