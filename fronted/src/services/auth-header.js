export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  // console.log('user',user);
  if (user && user.accessToken) {
    const accessToken = user.accessToken;
      return { 'x-access-token': accessToken }; 
  } else {
    return {};
  }
}
