using Microsoft.EntityFrameworkCore;
using RecruitmentManagement.Models;

namespace RecruitmentManagement.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employer> Employers { get; set; }
        public DbSet<Applicant> Applicants { get; set; }
    }
}
