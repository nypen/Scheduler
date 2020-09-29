using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using SchedulerApp.Repositories.Interfaces;

namespace SchedulerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ISkillRepository _skillRepository;
        private readonly IJobRepository _jobRepository;

        public EmployeesController(IEmployeeRepository employeeRepository, ISkillRepository skillRepository, IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
            _employeeRepository = employeeRepository;
            _skillRepository = skillRepository;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return Ok(await _employeeRepository.GetAll(true));
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeRepository.GetById(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.ID)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _employeeRepository.Update(employee);

            return NoContent();
        }

        // POST: api/Employees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _employeeRepository.Create(employee);

            return CreatedAtAction("GetEmployee", new { id = employee.ID }, employee);
        }

        // POST: api/Jobs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("{id}/skill")]
        public async Task<ActionResult<Job>> AddSkill(int id, [FromBody]int skillId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var empToAddSkill = await _employeeRepository.GetByIdWithSkills(id);

            if (empToAddSkill == null)
            {
                return NotFound();
            }

            var skillToAdd = await _skillRepository.GetById(skillId);

            if (skillToAdd == null)
            {
                return NotFound();
            }

            await _employeeRepository.AddSkill(empToAddSkill, skillToAdd);
            
            return Ok();
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employeeToDelete = await _employeeRepository.GetById(id);
            await _employeeRepository.Delete(employeeToDelete);

            return employeeToDelete;
        }
    }
}
