using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Adicionado para uso de métodos async
using ToDoList.ModelTO;
using ToDoList.Util;

namespace ToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDatabase _context;

        public UsuarioController(AppDatabase context)
        {
            _context = context;
        }

        // GET: api/Usuario
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas()
        {
            var listaUsuarios = await _context.Tarefa.ToListAsync();
            return Ok(listaUsuarios);
        }

        // GET: api/Usuario/{id}
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

        // POST: api/Usuario
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Tarefa>> PostTodolist(Tarefa todolist)
        {
            if (todolist == null)
            {
                return BadRequest("Tarefa inválida.");
            }

            _context.Tarefa.Add(todolist);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTarefa), new { id = todolist.Id }, todolist);
        }

        // PUT: api/Usuario/{id}
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> PutEmployee(int id, Tarefa todolist)
        {
            if (id != todolist.Id)
            {
                return BadRequest("ID da tarefa não corresponde ao ID na URL.");
            }

            var tarefaAntiga = await _context.Tarefa.FindAsync(id);

            if (tarefaAntiga == null)
            {
                return NotFound();
            }

            _context.Entry(tarefaAntiga).CurrentValues.SetValues(todolist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Usuario/{id}
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

