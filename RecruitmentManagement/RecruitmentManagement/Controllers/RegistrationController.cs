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
    public class RegistrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RegistrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("business")]
        public async Task<IActionResult> RegisterBusiness([FromBody] BusinessRegistrationDto businessDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == businessDto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            if (ModelState.IsValid)
            {
                var business = new Business
                {
                    CompanyName = businessDto.CompanyName,
                    TaxCode = businessDto.TaxCode,
                    Email = businessDto.Email,
                    Address = businessDto.Address,
                    PhoneNumber = businessDto.PhoneNumber,
                    RegistrationDate = DateTime.Now
                };

                _context.Businesses.Add(business);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Business registered successfully" });
            }

            return BadRequest(ModelState);
        }

        [HttpPost("applicant")]
        public async Task<IActionResult> RegisterApplicant([FromBody] ApplicantRegistrationDto applicantDto)
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

        [HttpPost("employee")]
        public async Task<IActionResult> RegisterEmployee([FromBody] EmployeeRegistrationDto employeeDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == employeeDto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            if (ModelState.IsValid)
            {
                var employee = new Employee
                {
                    FullName = employeeDto.FullName,
                    IdentityNumber = employeeDto.IdentityNumber,
                    BirthDate = employeeDto.BirthDate ?? DateTime.Now,
                    Email = employeeDto.Email,
                    PhoneNumber = employeeDto.PhoneNumber,
                    Position = employeeDto.Position,
                    Address = employeeDto.Address,
                    RegistrationDate = DateTime.Now
                };

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Employee registered successfully" });
            }

            return BadRequest(ModelState);
        }
    }
}
