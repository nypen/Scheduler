using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using SchedulerApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Repositories
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(CompanyContext context) : base(context)
        {
        }
        public async Task<Employee> GetByIdWithSkills(int id)
        {
            return await _context.Employees
                .Include(e => e.EmployeeSkills)
                .ThenInclude(e => e.Skill)
                .SingleOrDefaultAsync(a => a.ID == id);
        }

        public async Task AddSkill(Employee employee, Skill skill)
        {
            employee.EmployeeSkills.Add(new EmployeeSkill{ EmployeeId = employee.ID, SkillId = skill.ID });

            await Save();
        }


    }
}
