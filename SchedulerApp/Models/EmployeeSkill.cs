using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class EmployeeSkill
    {
        [JsonIgnore]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        [JsonIgnore]
        public int SkillId { get; set; }
        public Skill Skill { get; set; }
    }
}
