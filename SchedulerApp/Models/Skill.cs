using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerApp.Models
{
    public class Skill
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)] 
        public int ID { get; set; }
        [Column(TypeName = "nvarchar(20)")]
        [MaxLength(20)]
        [Required]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(200)")]
        [MaxLength(200)]
        [Required] 
        public string Description { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Creation Date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)] 
        public DateTime CreationDate{ get; set; }

        public Skill()
        {
            CreationDate = DateTime.Now;
        }
    }
}
