import axios from "axios";

class CommentsService {

  constructor() {
    axios.defaults.baseURL = "http://localhost:8000/api/";
  }

  post(newComment) {
    return axios.post("comments", newComment);
  }

  update(id, comment) {
    return axios.put(`comments/${id}`, comment);
  }

  delete(id) {
    return axios.delete(`comments/${id}`);
  }

}

export const commentsService = new CommentsService();