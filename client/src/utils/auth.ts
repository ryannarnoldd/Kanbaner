import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';
class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // TODO:  a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {

        return true;
      }
    }
      catch (err) {
        return false;
      }
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token');

    if (loggedUser) {
      return loggedUser
    } else return ''

  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();