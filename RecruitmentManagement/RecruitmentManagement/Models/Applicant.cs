namespace RecruitmentManagement.Models
{
    public class Applicant
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? IdentityNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Gender { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Skills { get; set; }
        public string? EducationLevel { get; set; } // THPT, Đại Học, Cao Học
        public DateTime RegistrationDate { get; set; } = DateTime.Now; // Lấy ngày hiện tại
    }
}
