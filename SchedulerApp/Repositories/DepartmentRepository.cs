using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using SchedulerApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Repositories
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(CompanyContext context) : base(context)
        {
        }

        public async Task<Department> GetByIdWithJobs(int id)
        {
            return await _context.Departments
                .Include(e => e.DepartmentJobs)
                .ThenInclude(e => e.Job)
                .SingleOrDefaultAsync(a => a.ID == id);
        }

        public async Task<List<Department>> GetAll()
        {
            return await _context.Departments
                .Include(e => e.DepartmentJobs)
                .ThenInclude(e => e.Job)
                .ThenInclude(e => e.JobSkills)
                .ThenInclude(e=> e.Skill)
                .ToListAsync();
        }
    }
}
