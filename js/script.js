document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = loginForm.elements['username'].value;
      const password = loginForm.elements['password'].value;
      console.log('Logging in', username, password);
      // Handle login logic here
    });
  });
  