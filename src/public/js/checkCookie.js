const cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith('user_token='));
if (typeof cookieValue != 'undefined') {
  const body = document.getElementsByTagName("BODY")[0];
  body.style.display = 'none';
  location.reload(true);
}