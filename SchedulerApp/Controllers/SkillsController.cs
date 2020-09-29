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
    public class SkillsController : ControllerBase
    {
        private readonly ISkillRepository _skillRepository;

        public SkillsController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        // GET: api/Skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            return Ok(await _skillRepository.GetAll());
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(int id)
        {
            var skill = await _skillRepository.GetById(id);

            if (skill == null)
            {
                return NotFound();
            }

            return skill;
        }

        // PUT: api/Skills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<ActionResult<Skill>> PutSkill(int id, Skill skill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            skill.ID = id;

            var updatedSkill = await _skillRepository.Update(skill);

            return updatedSkill;
        }

        // POST: api/Skills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Skill>> PostSkill(Skill skill)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _skillRepository.Create(skill);

            return CreatedAtAction("GetSkill", new { id = skill.ID }, skill);
        }

        // DELETE: api/Skills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Skill>> DeleteSkill(int id)
        {
            var skill = await _skillRepository.GetById(id);

            if (skill == null)
            {
                return NotFound();
            }

            await _skillRepository.Delete(skill);

            return skill;
        }

        [HttpGet("{id}/date")]
        public async Task<ActionResult<Skill>> GetSkillDate(int id)
        {
            var skill = await _skillRepository.GetById(id);
            
            skill.CreationDate = new DateTime(1980, 8, 8);
            
            if (skill == null)
            {
                return NotFound();
            }

            return skill;
        }
    }
}
