<template>
  <div class="login-container">
    <div class="login-box">
      <h1>登入</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">使用者名稱</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required
            placeholder="請輸入使用者名稱"
          />
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="請輸入密碼"
          />
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? '登入中...' : '登入' }}
        </button>
      </form>
      <div class="hint">
        <p>測試帳號：admin / admin123</p>
        <p>或 user / user123</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../utils/api'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const loading = ref(false)

    const handleLogin = async () => {
      errorMessage.value = ''
      loading.value = true

      try {
        const result = await login(username.value, password.value)
        
        if (result.success) {
          localStorage.setItem('authToken', result.token)
          localStorage.setItem('username', result.username)
          router.push('/welcome')
        } else {
          errorMessage.value = result.message || '登入失敗'
        }
      } catch (error) {
        errorMessage.value = '無法連接到伺服器'
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      password,
      errorMessage,
      loading,
      handleLogin
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #667eea;
      }
    }
  }

  .error-message {
    color: #e74c3c;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #fef5f5;
    border-radius: 5px;
    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;

    &:hover:not(:disabled) {
      background: #5568d3;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .hint {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 0.875rem;
    color: #666;

    p {
      margin: 0.25rem 0;
    }
  }
}
</style>
