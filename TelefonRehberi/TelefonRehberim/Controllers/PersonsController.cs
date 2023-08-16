using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TelefonRehberim.Repositories;
using Microsoft.EntityFrameworkCore;
using TelefonRehberim.Models;

namespace TelefonRehberim.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly RepositoryContext _context;
        public PersonsController(RepositoryContext context) { _context = context; }

        //api/Persons
        [HttpGet]  //All person list
        public async Task<ActionResult<IEnumerable<Person>>> GetPersonRecords()
        {
            return await _context.Persons.ToListAsync();
        }

        //api/Persons/id
        [HttpGet("{id}")]  //Get person by id
        public async Task<ActionResult<IEnumerable<Person>>> GetPersonById(int id)
        {
            var person=_context.Persons.FindAsync(id);
            if(person == null) { 
                return  NotFound(); 
            }
            return Ok(person);
        }

        //api/Persons
        [HttpPost]    //Save Person
        public async Task<ActionResult<IEnumerable<Person>>> SaveRecords(Person person)
        {
            try
            {
                if (person is null)
                {
                    return BadRequest();
                }
                _context.Persons.Add(person);
                await _context.SaveChangesAsync();
                return Ok();

            }
            catch (Exception)
            {
                throw;
            };
        }

        //api/Persons/id
        [HttpPut("{id}")]   // update Person
        public async Task<ActionResult<IEnumerable<Person>>> UpdateRecord(int id , Person person)
        {
            var excitingPerson = await _context.Persons.FindAsync(id);
            if (excitingPerson == null) { return NotFound(); }  
            excitingPerson.name=person.name;
            excitingPerson.phoneNumber=person.phoneNumber;
            await _context.SaveChangesAsync();
            return Ok(excitingPerson);

        }

        //api/Persons/id
        [HttpDelete("{id}")]   // Delete Person
        public async Task<ActionResult<IEnumerable<Person>>> DeleteRecord(int id)
        {
            var deletePerson = await _context.Persons.FindAsync(id);
            if (deletePerson == null) { return NotFound(); }
            _context.Persons.Remove(deletePerson);
            await _context.SaveChangesAsync();
            return Ok(deletePerson);
        }

    }
}
