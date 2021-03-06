﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class Job
    {
        [Key]
        public int ID { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        [Required]
        public string Name{ get; set; }
        public ICollection<JobSkill> JobSkills{ get; set; }
    }
}
