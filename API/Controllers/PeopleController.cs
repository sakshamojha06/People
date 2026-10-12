using Data.Models;
using Microsoft.AspNetCore.Mvc;
using API.Services;

namespace API.controller;

[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
    private readonly IPersonService _service;

    public PeopleController(IPersonService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAll());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var person = await _service.GetById(id);
        if (person == null)
        {
            return NotFound();
        }
        return Ok(person);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Person person)
    {
        if(string.IsNullOrWhiteSpace(person.Name))
        {
            return BadRequest("Name is required.");
        }

        var createdPerson = await _service.Create(person);
        return Ok("Person created successfully.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Person person)
    {
        if(string.IsNullOrWhiteSpace(person.Name))
        {
            return BadRequest("Name is required.");
        }

        var updatedPerson = await _service.Update(id, person.Name);
        if(updatedPerson == null)
        {
            return NotFound();
        }
        return Ok("Person updated successfully.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deletedPerson = await _service.Delete(id);
        if(deletedPerson == null)
        {
            return NotFound();
        }
        return Ok("Person deleted successfully.");
    }
}