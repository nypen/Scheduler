import http from "../http-common";

class EmployeeService{
    get(id) {
        return http.get(`/employees/${id}`);
    }
    getAll() {
        return http.get('/employees/');
    }
    add(data) {
        return http.post('/employees/', data);
    }
    addSkill(id,data) {
        return http.put(`/employees/${id}/skill`,data);
    }
    deleteSkill(id) {
        return http.delete(`/employees/${id}/skill`);
    }
}

export default new EmployeeService();