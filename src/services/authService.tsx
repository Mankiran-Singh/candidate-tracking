import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3200';
axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

class AuthService {
  
  static async signUp(data:Object) {
    try {
        return await axios.post('/auth/sign-up', data);
      } catch (error) {
        console.error('Login failed:', error);
      }   
  }

  static async login(data:Object) {
    try {
       return await axios.post('/auth/login', data);
      } catch (error) {
        console.error('Login failed:', error);
      }
  }

  static async addCandidate(data:Object) {
    try {
       return await axios.post('/interview/add-candidate', data);
      } catch (error) {
        console.error('Login failed:', error);
      }
  }
  static async getCandidates() {
    try {
       return await axios.get('/interview/get-candidates');
      } catch (error) {
        console.error('Login failed:', error);
      }
  }

  static async deleteCandidate(id:string){
    try {
        return await axios.delete(`/interview/delete-candidate/${id}`);
      } catch (error) {
        console.error('Deletion failed:', error);
        throw error; 
      }
  }
}

export default AuthService;
