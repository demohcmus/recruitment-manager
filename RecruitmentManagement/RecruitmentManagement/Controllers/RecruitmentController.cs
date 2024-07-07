using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagement.Data;
using RecruitmentManagement.DTO;
using RecruitmentManagement.Models;
using System.Security.Claims;
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
        //[Authorize(Roles = "Business")]
        public async Task<IActionResult> RegisterRecruitment([FromBody] RecruitmentInfoDto recruitmentInfoDto)
        {
            if (ModelState.IsValid)
            {
                // Lấy email từ thông tin đăng nhập của người dùng
                var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                if (email == null)
                {
                    return Unauthorized("Email claim not found.");
                }

                var recruitmentInfo = new RecruitmentInfo
                {
                    Position = recruitmentInfoDto.Position,
                    NumberOfPositions = recruitmentInfoDto.NumberOfPositions,
                    RecruitmentStartDate = recruitmentInfoDto.RecruitmentStartDate,
                    RecruitmentEndDate = recruitmentInfoDto.RecruitmentEndDate,
                    Requirements = recruitmentInfoDto.Requirements,
                    JobDescription = recruitmentInfoDto.JobDescription,
                    Salary = recruitmentInfoDto.Salary,
                    JobType = recruitmentInfoDto.JobType,
                    PostingForm = recruitmentInfoDto.PostingForm,
                    PostingStartDate = recruitmentInfoDto.PostingStartDate,
                    PostingDurationDays = recruitmentInfoDto.PostingDurationDays,
                    BusinessEmail = email
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

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecruitmentInfo(int id, [FromBody] RecruitmentInfoDto recruitmentInfoDto)
        {
            var recruitmentInfo = await _context.RecruitmentInfos.FindAsync(id);
            if (recruitmentInfo == null)
            {
                return NotFound();
            }

            // Chỉ cho phép cập nhật nếu email của người dùng trùng khớp với email của doanh nghiệp đã đăng ký
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (email == null || recruitmentInfo.BusinessEmail != email)
            {
                return Unauthorized("You are not authorized to update this recruitment information.");
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

            _context.RecruitmentInfos.Update(recruitmentInfo);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Recruitment information updated successfully" });
        }

        // Delete
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Employee")]
        public async Task<IActionResult> DeleteRecruitmentInfo(int id)
        {
            var recruitmentInfo = await _context.RecruitmentInfos.FindAsync(id);
            if (recruitmentInfo == null)
            {
                return NotFound();
            }

            // Chỉ cho phép xóa nếu email của người dùng trùng khớp với email của doanh nghiệp đã đăng ký
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (email == null || recruitmentInfo.BusinessEmail != email)
            {
                return Unauthorized("You are not authorized to delete this recruitment information.");
            }

            _context.RecruitmentInfos.Remove(recruitmentInfo);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Recruitment information deleted successfully" });
        }
    }
}
