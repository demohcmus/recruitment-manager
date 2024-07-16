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
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeRegistrationDto employeeDto)
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

        // Read
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // Read all
        [HttpGet("AllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees);
        }

        // Read by email
        [HttpGet("ByEmail/{email}")]
        public async Task<IActionResult> GetEmployeeByEmail(string email)
        {
            var employee = await _context.Employees.SingleOrDefaultAsync(e => e.Email == email);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, [FromBody] EmployeeRegistrationDto employeeDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.FullName = employeeDto.FullName;
            employee.IdentityNumber = employeeDto.IdentityNumber;
            employee.BirthDate = employeeDto.BirthDate ?? DateTime.Now;
            employee.Email = employeeDto.Email;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.Position = employeeDto.Position;
            employee.Address = employeeDto.Address;

            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Employee updated successfully" });
        }

        // Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Employee deleted successfully" });
        }
    }
}
