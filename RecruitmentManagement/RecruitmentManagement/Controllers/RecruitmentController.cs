using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagement.Data;
using RecruitmentManagement.DTO;
using RecruitmentManagement.Models;
using System.Linq;
using System.Threading.Tasks;

namespace RecruitmentManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecruitmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecruitmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost("register")]
        public async Task<IActionResult> RegisterRecruitment([FromBody] RecruitmentInfoDto recruitmentInfoDto)
        {
            if (ModelState.IsValid)
            {
                var recruitmentStartDate = DateTime.UtcNow;
                var recruitmentEndDate = recruitmentInfoDto.PostingStartDate.AddDays(recruitmentInfoDto.PostingDurationDays.Value);

                var recruitmentInfo = new RecruitmentInfo
                {
                    Position = recruitmentInfoDto.Position,
                    NumberOfPositions = recruitmentInfoDto.NumberOfPositions,
                    RecruitmentStartDate = recruitmentStartDate,
                    RecruitmentEndDate = recruitmentEndDate,
                    Requirements = recruitmentInfoDto.Requirements,
                    JobDescription = recruitmentInfoDto.JobDescription,
                    Salary = recruitmentInfoDto.Salary,
                    JobType = recruitmentInfoDto.JobType,
                    PostingForm = recruitmentInfoDto.PostingForm,
                    PostingStartDate = recruitmentInfoDto.PostingStartDate,
                    PostingDurationDays = recruitmentInfoDto.PostingDurationDays,
                    BusinessEmail = recruitmentInfoDto.Email // Use the Email from DTO
                };

                _context.RecruitmentInfos.Add(recruitmentInfo);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Recruitment information registered successfully" });
            }

            return BadRequest(new { message = "Invalid data", errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
        }

        // Read
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecruitmentInfo(int id)
        {
            var recruitmentInfo = await _context.RecruitmentInfos.FindAsync(id);
            if (recruitmentInfo == null)
            {
                return NotFound();
            }

            return Ok(recruitmentInfo);
        }

        // Read all
        [HttpGet("AllRecruitments")]
        public async Task<IActionResult> GetAllRecruitmentInfos()
        {
            var recruitments = await _context.RecruitmentInfos.ToListAsync();
            return Ok(recruitments);
        }

        // Read all by email
        [HttpGet("ByEmail/{email}")]
        public async Task<IActionResult> GetRecruitmentInfosByEmail(string email)
        {
            var recruitments = await _context.RecruitmentInfos
                .Where(r => r.BusinessEmail == email)
                .ToListAsync();

            if (recruitments == null || recruitments.Count == 0)
            {
                return NotFound(new { message = "No recruitments found for this email." });
            }

            return Ok(recruitments);
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecruitmentInfo(int id, [FromBody] RecruitmentInfoDto recruitmentInfoDto)
        {
            var recruitmentInfo = await _context.RecruitmentInfos.FindAsync(id);
            if (recruitmentInfo == null)
            {
                return NotFound();
            }

            recruitmentInfo.Position = recruitmentInfoDto.Position;
            recruitmentInfo.NumberOfPositions = recruitmentInfoDto.NumberOfPositions;
            recruitmentInfo.RecruitmentStartDate = recruitmentInfoDto.RecruitmentStartDate;
            recruitmentInfo.RecruitmentEndDate = recruitmentInfoDto.RecruitmentEndDate;
            recruitmentInfo.Requirements = recruitmentInfoDto.Requirements;
            recruitmentInfo.JobDescription = recruitmentInfoDto.JobDescription;
            recruitmentInfo.Salary = recruitmentInfoDto.Salary;
            recruitmentInfo.JobType = recruitmentInfoDto.JobType;
            recruitmentInfo.PostingForm = recruitmentInfoDto.PostingForm;
            recruitmentInfo.PostingStartDate = recruitmentInfoDto.PostingStartDate;
            recruitmentInfo.PostingDurationDays = recruitmentInfoDto.PostingDurationDays;
            recruitmentInfo.BusinessEmail = recruitmentInfoDto.Email;

            _context.RecruitmentInfos.Update(recruitmentInfo);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Recruitment information updated successfully" });
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecruitmentInfo(int id)
        {
            var recruitmentInfo = await _context.RecruitmentInfos.FindAsync(id);
            if (recruitmentInfo == null)
            {
                return NotFound();
            }

            _context.RecruitmentInfos.Remove(recruitmentInfo);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Recruitment information deleted successfully" });
        }
    }
}
