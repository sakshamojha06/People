using Data.Models;
using Data;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class PersonRepository : IPersonRepository
{
    private readonly AppDbContext _context;

    public PersonRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Person>> GetAll()
    {
        return await _context.People.ToListAsync();
    }

    public async Task<Person?> GetById(int id)
    {
        return await _context.People.FindAsync(id);
    }

    public async Task<Person> Create(Person person)
    {
        _context.People.Add(person);
        await _context.SaveChangesAsync();
        return person;
    }

    public async Task<bool> Update(int id, string name)
    {
        var person = await _context.People.FindAsync(id);
        if (person == null)
        {
            return false;
        }

        person.Name = name;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var person = await _context.People.FindAsync(id);
        if(person == null)
        {
            return false;
        }
        _context.People.Remove(person);
        await _context.SaveChangesAsync();

        return true;
    }
}