using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentManagement.Data;
using RecruitmentManagement.DTO;
using RecruitmentManagement.Models;
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

        [HttpPost("register")]
        //[Authorize(Roles ="Business")]
        public async Task<IActionResult> RegisterRecruitment([FromBody] RecruitmentInfoDto recruitmentInfoDto)
        {
            if (ModelState.IsValid)
            {
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
                    PostingDurationDays = recruitmentInfoDto.PostingDurationDays
                };

                _context.RecruitmentInfos.Add(recruitmentInfo);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Recruitment information registered successfully" });
            }

            return BadRequest(new { message = "Invalid data", errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
        }
    }
}
