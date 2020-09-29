using Microsoft.EntityFrameworkCore;
using SchedulerApp.Models;
using SchedulerApp.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Repositories
{
    public class JobRepository : Repository<Job>, IJobRepository
    {
        public JobRepository(CompanyContext context) : base(context)
        {
        }
    }
}
