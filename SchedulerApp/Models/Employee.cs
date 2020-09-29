using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        [Required]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        [Required]
        public string Surname { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime CreationDate { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime HiringDate { get; set; }
        [JsonIgnore]
        public int JobId { get; set; }
        public Job Job { get; set; }
        [Display(Name="Skillset")]
        public ICollection<EmployeeSkill> EmployeeSkills{ get; set; }

        public Employee()
        {
            CreationDate = DateTime.Now;
        }
    }
}
