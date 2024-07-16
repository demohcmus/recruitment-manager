namespace RecruitmentManagement.DTO
{
    public class RecruitmentInfoDto
    {
        public string? Position { get; set; }
        public int? NumberOfPositions { get; set; }
        public DateTime RecruitmentStartDate { get; set; }
        public DateTime RecruitmentEndDate { get; set; }
        public string? Requirements { get; set; }
        public string? JobDescription { get; set; }
        public int? Salary { get; set; }
        public string? JobType { get; set; }
        public string? PostingForm { get; set; }
        public DateTime PostingStartDate { get; set; }
        public int? PostingDurationDays { get; set; }
        public string? Email { get; set; }  // Add this line
    }
}
