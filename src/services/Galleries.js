import axios from "axios";

class GalleriesService {

  getAll() {
    return axios.get("http://localhost:8000/api/galleries");
  }

}

export const galleriesService = new GalleriesService();