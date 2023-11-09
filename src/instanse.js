import axios from 'axios';

export class InstanseAPI {

  
    constructor() {
      this.q = '';
      this.page = 1;
      this.totalPage = 1;
    }
  
    async searchInfo() {
        const instance = axios.create({
            baseURL: 'https://pixabay.com/api/',
            params: {
              key: '40571793-a40fb1e5684797f2ee860174c',
              image_type: 'photo',
              safesearch: true,
              orientation: 'horizontal',
              q: this.q,
              page: this.page,
              per_page: 40,
            },
          });
    
        const response = await instance.get();
    
        console.log(response.data);

        return response.data;
    }

    } 
     