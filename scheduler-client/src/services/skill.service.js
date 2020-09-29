import http from "../http-common";

class SkillService{
    get(id) {
        return http.get(`/skills/${id}`);
    }
    getAll() {
        return http.get('/skills/');
    }
    add(data) {
        return http.post('/skills/', data);
    }
    update(id,data) {
        return http.put(`/skills/${id}`,data);
    }
    delete(id) {
        return http.delete(`/skills/${id}`);
    }
}

export default new SkillService();
