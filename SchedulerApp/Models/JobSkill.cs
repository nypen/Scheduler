using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class JobSkill
    {
        [JsonIgnore]

        public int JobId { get; set; }
        public Job Job { get; set; }
        [JsonIgnore]

        public int SkillId { get; set; }
        public Skill Skill { get; set; }
    }
}
