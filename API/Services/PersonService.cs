using Data.Models;
using API.Repositories;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _repository;

        public PersonService(IPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Person>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<Person?> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task<Person> Create(Person person)
        {
            return await _repository.Create(person);
        }

        public async Task<bool> Update(int id, string name)
        {
            return await _repository.Update(id, name);
        }

        public async Task<bool> Delete(int id)
        {
            return await _repository.Delete(id);
        }
    }
}