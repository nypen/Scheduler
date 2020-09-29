using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class CompanyContext : DbContext
    {
        public CompanyContext(DbContextOptions<CompanyContext> options):base(options)
        {

        }

        public DbSet<Skill> Skills { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Employee> Employees{ get; set; }
        public DbSet<EmployeeSkill> EmployeeSkills { get; set; }
        public DbSet<DepartmentJob> DepartmentJobs { get; set; }
        public DbSet<JobSkill> JobSkills { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeSkill>(entity =>
            {
                entity.HasKey(e => new { e.EmployeeId, e.SkillId });
            });

            modelBuilder.Entity<DepartmentJob>(entity =>
            {
                entity.HasKey(e => new { e.DepartmentId, e.JobId });
            });

            modelBuilder.Entity<JobSkill>(entity =>
            {
                entity.HasKey(e => new { e.JobId, e.SkillId});
            });
        }
    }
}
