const API_URL = {
  auth: 'http://localhost:3000/api/auth',
  users: 'http://localhost:3001/api/users',
  wellness: 'http://localhost:3002/api/wellness',
}

export async function API_loginUser(email, password) {
  const response = await fetch(`${API_URL.auth}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function API_fetchUserData(token) {
  const response = await fetch(`${API_URL.auth}/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}
