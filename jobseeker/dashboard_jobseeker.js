document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').addEventListener('click', async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/logout/', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Logout failed');
        }
  
        window.location.href = '/';
      } catch (error) {
        console.error('Error during logout:', error);
      }
    });
});
