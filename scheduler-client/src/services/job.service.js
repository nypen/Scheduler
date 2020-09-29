import http from "../http-common";

class JobService{
    getAll() {
        return http.get('/jobs/');
    }
}

export default new JobService();