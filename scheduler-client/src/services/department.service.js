import http from "../http-common";

class DepartmentService{
    getAll() {
        return http.get(`/departments/`);
    }

    getDepartment(id) {
        return http.get(`/departments/${id}`);
    }
}
export default new DepartmentService();