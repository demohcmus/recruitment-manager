namespace RecruitmentManagement.Models
{
    public class Employer
    {
        public int Id { get; set; }
        public string? CompanyName { get; set; }
        public string? TaxCode { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.Now; // Lấy ngày hiện tại
    }
}
