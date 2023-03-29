const urlChanged = "192.168.100.2";
// const urlChanged = "localhost";
const API_URL = {
  auth: `http://${urlChanged}:3000/api/auth`,
  users: `http://${urlChanged}:3001/api/users`,
  wellness: `http://${urlChanged}:3002/api/wellness`,
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

export async function API_fetchQuestionCategories(token) {
  const response = await fetch(`${API_URL.wellness}/questions/categories`, {
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

export async function API_fetchQuestionsByCategory(token, category) {
  const response = await fetch(`${API_URL.wellness}/questions?root_category=${category}`, {
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

export async function API_createQuestionary(token, questionary) {
  const response = await fetch(`${API_URL.wellness}/questionary`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questionary)
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function API_fetchQuestionaries(token) {
  const response = await fetch(`${API_URL.wellness}/questionary`, {
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

export async function API_getQuestionary(token, questionaryId) {
  const response = await fetch(`${API_URL.wellness}/questionary/${questionaryId}`, {
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

export async function API_addAnswersToQuestionary(token, questionaryId, answers) {
  const response = await fetch(`${API_URL.wellness}/questionary/${questionaryId}/answers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answers)
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
}

export async function API_getQuestionaryCategoryCounts(token, questionaryId) {
  const response = await fetch(`${API_URL.wellness}/answers/user/questionary/categories`, {
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

export async function API_getQuestionaryAnswers(token, questionaryId) {
  const response = await fetch(`${API_URL.wellness}/answers/questionary/${questionaryId}`, {
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
