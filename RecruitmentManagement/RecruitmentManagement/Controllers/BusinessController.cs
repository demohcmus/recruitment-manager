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
    public class BusinessController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BusinessController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateBusiness([FromBody] BusinessRegistrationDto businessDto)
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

        // Read
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }

            return Ok(business);
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusiness(int id, [FromBody] BusinessRegistrationDto businessDto)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }

            business.CompanyName = businessDto.CompanyName;
            business.TaxCode = businessDto.TaxCode;
            business.Email = businessDto.Email;
            business.Address = businessDto.Address;
            business.PhoneNumber = businessDto.PhoneNumber;

            _context.Businesses.Update(business);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Business updated successfully" });
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Business deleted successfully" });
        }
    }
}
