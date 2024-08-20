using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoList.ModelTO;
using ToDoList.Util;

namespace ToDoList.Controllers
{
    // sempre a route principal vai ser api/[controller] ele entender que o controller é o que está escrito antes dele ex todocontroller vai ser todo
    // ou seja api/todo
    //[Route("api/todolist")]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDatabase _context;

        public TodoController(AppDatabase context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas()
        {
            var listaUsuarios = await _context.Tarefa.ToListAsync();
            return Ok(listaUsuarios);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Tarefa>> GetTarefa(int id)
        {
            var tarefa = await _context.Tarefa.FindAsync(id);

            if (tarefa == null)
            {
                return NotFound();
            }

            return Ok(tarefa);
        }

        // Corrigido o nome do método para corresponder à ação de criação
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Tarefa>> CreateTarefa(Tarefa tarefa)
        {
            if (tarefa == null)
            {
                return BadRequest("Tarefa inválida.");
            }

            _context.Tarefa.Add(tarefa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTarefa), new { id = tarefa.Id }, tarefa);
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateTarefa(int id, Tarefa tarefa)
        {
            if (id != tarefa.Id)
            {
                return BadRequest("ID da tarefa não corresponde ao ID na URL.");
            }

            var tarefaAntiga = await _context.Tarefa.FindAsync(id);

            if (tarefaAntiga == null)
            {
                return NotFound();
            }

            _context.Entry(tarefaAntiga).CurrentValues.SetValues(tarefa);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteTarefa(int id)
        {
            var tarefa = await _context.Tarefa.FindAsync(id);

            if (tarefa == null)
            {
                return NotFound();
            }

            _context.Tarefa.Remove(tarefa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
