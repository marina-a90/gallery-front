import axios from "axios";

class GalleriesService {

  constructor() {
    axios.defaults.baseURL = "http://localhost:8000/api/";
  }

  getAll(page = 1, term = "") {
    return axios.get('galleries',
      {
        params: {
          page,
          term
        }
      }
    )
    .then(({ data }) => data.galleries)
  }

  show(id) {
    return axios.get(`galleries/${id}`);
  }

  post(newGallery) {
    return axios.post("galleries", newGallery);
  }

  update(id, gallery) {
    return axios.put(`galleries/${id}`, gallery);
  }

  delete(id) {
    return axios.delete(`galleries/${id}`);
  }

  getMyGalleries(user_id, page = 1, term = "") {
    return axios.get(`my-galleries`, 
      {
        params: {
          user_id,
          page,
          term
        }
      }
    )
    .then(({ data }) => data.galleries);
  }

  getUserGalleries(uid, page = 1, term = '') {
    return axios.get(`user-galleries/${uid}`, {
      params: {
        page,
        term
      }
    })
    .then(({ data }) => data.galleries)
  }

}

export const galleriesService = new GalleriesService();