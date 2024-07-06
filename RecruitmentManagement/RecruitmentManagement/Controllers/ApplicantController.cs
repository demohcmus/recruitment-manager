using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagement.Data;
using RecruitmentManagement.Models;
using RecruitmentManagement.DTO;
using System.Threading.Tasks;

namespace RecruitmentManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicantController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplicantController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateApplicant([FromBody] ApplicantRegistrationDto applicantDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == applicantDto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            if (ModelState.IsValid)
            {
                var applicant = new Applicant
                {
                    FullName = applicantDto.FullName,
                    IdentityNumber = applicantDto.IdentityNumber,
                    BirthDate = applicantDto.BirthDate,
                    Gender = applicantDto.Gender,
                    Email = applicantDto.Email,
                    PhoneNumber = applicantDto.PhoneNumber,
                    Address = applicantDto.Address,
                    Skills = applicantDto.Skills,
                    EducationLevel = applicantDto.EducationLevel,
                    RegistrationDate = DateTime.Now
                };

                _context.Applicants.Add(applicant);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Applicant registered successfully" });
            }

            return BadRequest(ModelState);
        }

        // Read
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplicant(int id)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant == null)
            {
                return NotFound();
            }

            return Ok(applicant);
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApplicant(int id, [FromBody] ApplicantRegistrationDto applicantDto)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant == null)
            {
                return NotFound();
            }

            applicant.FullName = applicantDto.FullName;
            applicant.IdentityNumber = applicantDto.IdentityNumber;
            applicant.BirthDate = applicantDto.BirthDate;
            applicant.Gender = applicantDto.Gender;
            applicant.Email = applicantDto.Email;
            applicant.PhoneNumber = applicantDto.PhoneNumber;
            applicant.Address = applicantDto.Address;
            applicant.Skills = applicantDto.Skills;
            applicant.EducationLevel = applicantDto.EducationLevel;

            _context.Applicants.Update(applicant);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Applicant updated successfully" });
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicant(int id)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant == null)
            {
                return NotFound();
            }

            _context.Applicants.Remove(applicant);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Applicant deleted successfully" });
        }
    }
}
