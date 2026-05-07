import { getToken } from "./tokenStorage.js";

export function getApiBaseUrl() {
  return "https://final-project-backend.onrender.com";
}

export async function sendRequest(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(getApiBaseUrl() + path, {
    method: options.method,
    body: options.body,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const errorBody = await response.json();
      message = errorBody.error || errorBody.message || message;
    } catch {
      // Keep the default message if the server does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Character endpoints
export function getCharacters() {
  return sendRequest("/characters", { method: "GET" });
}

export function createCharacter(data) {
  return sendRequest("/characters", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCharacter(id, data) {
  return sendRequest(`/characters/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteCharacter(id) {
  return sendRequest(`/characters/${id}`, {
    method: "DELETE",
  });
}

// Anime + Personality endpoints
export function getAnime() {
  return sendRequest("/animes", { method: "GET" });
}

export function getPersonalities() {
  return sendRequest("/personalities", { method: "GET" });
}
