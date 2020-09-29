using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class DepartmentJob
    {
        [JsonIgnore]
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        [JsonIgnore]
        public int JobId { get; set; }
        public Job Job { get; set; }
    }
}
