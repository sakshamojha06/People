using Data.Models;

namespace API.Repositories;

public interface IPersonRepository
{
    Task<List<Person>> GetAll();
    Task<Person?> GetById(int id);
    Task<Person> Create(Person person);
    Task<bool> Update(int id, string name);
    Task<bool> Delete(int id);
}