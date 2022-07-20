import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-my-project-fbf5c-default-rtdb.asia-southeast1.firebasedatabase.app'
});

export default instance;