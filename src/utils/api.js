const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  
  const data = await response.json()
  return data
}

export const verifyToken = async (token) => {
  const response = await fetch(`${API_URL}/api/verify`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  const data = await response.json()
  return data
}

export const logout = async (token) => {
  const response = await fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  const data = await response.json()
  return data
}
