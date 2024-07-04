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

        public DbSet<Business> Businesses { get; set; }
        public DbSet<Applicant> Applicants { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RecruitmentInfo> RecruitmentInfos { get; set; }
    }
}
