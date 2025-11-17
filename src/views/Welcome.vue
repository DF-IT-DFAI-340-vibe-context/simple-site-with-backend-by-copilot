<template>
  <div class="welcome-container">
    <nav class="navbar">
      <div class="nav-content">
        <h2>簡單網站</h2>
        <div class="nav-links">
          <router-link to="/welcome" class="nav-link">歡迎頁</router-link>
          <router-link to="/about" class="nav-link">關於我們</router-link>
          <button @click="handleLogout" class="logout-btn">登出</button>
        </div>
      </div>
    </nav>
    
    <div class="content">
      <div class="welcome-box">
        <h1>歡迎，{{ username }}！</h1>
        <p class="subtitle">您已成功登入系統</p>
        
        <div class="info-card">
          <h3>系統資訊</h3>
          <ul>
            <li><strong>環境：</strong>{{ environment }}</li>
            <li><strong>路徑前綴：</strong>{{ contextPath }}</li>
            <li><strong>登入時間：</strong>{{ loginTime }}</li>
          </ul>
        </div>
        
        <div class="actions">
          <router-link to="/about" class="btn-primary">瞭解更多</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../utils/api'

export default {
  name: 'Welcome',
  setup() {
    const router = useRouter()
    const username = ref('')
    const loginTime = ref('')
    const contextPath = ref('')
    const environment = ref('')

    onMounted(() => {
      username.value = localStorage.getItem('username') || '訪客'
      loginTime.value = new Date().toLocaleString('zh-TW')
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
      username,
      loginTime,
      contextPath,
      environment,
      handleLogout
    }
  }
}
</script>

<style scoped lang="scss">
.welcome-container {
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
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.welcome-box {
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #666;
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }

  .info-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    text-align: left;

    h3 {
      color: #333;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem 0;
        color: #555;
        border-bottom: 1px solid #e0e0e0;

        &:last-child {
          border-bottom: none;
        }

        strong {
          color: #333;
        }
      }
    }
  }

  .actions {
    .btn-primary {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 600;
      transition: background 0.3s;

      &:hover {
        background: #5568d3;
      }
    }
  }
}
</style>
