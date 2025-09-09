export function logout() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('email');
      localStorage.removeItem('full_name');
      // In case more keys are added later, clear any namespaced keys if needed
    }
  } catch (e) {
    // no-op
  }
}


