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


        //Criei uma classe personalizada para usarmos ela de filtro, e ai sim podemos utilizar o body
        public class Filtros
        {
            public string pesquisa { get; set; }
            public string status { get; set; }
            public string ordem { get; set; }
        }



        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas([FromQuery]string? pesquisa, [FromQuery] string? status, [FromQuery] string? ordem)
        {
            var listaUsuarios = await _context.Tarefa.ToListAsync();

            if (!String.IsNullOrEmpty(pesquisa))
                listaUsuarios = listaUsuarios.Where(c => !String.IsNullOrEmpty(c.Nome) && c.Nome.ToUpper().Contains(pesquisa.ToUpper())).ToList();

            if (!String.IsNullOrEmpty(status))
                listaUsuarios = listaUsuarios.Where(c => c.Completo == status).ToList();

            if (!String.IsNullOrEmpty(ordem)) {
                if (ordem == "DESC")
                    return Ok(listaUsuarios.OrderByDescending(c=> c.Id));
            }

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

        [HttpPut("completar/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> CompletarTarefa(int id)
        {
            var _tarefaExistente = _context.Tarefa.Find(id);

            if (_tarefaExistente == null)
            {
                return BadRequest("Tarefa não encontrada");
            }

            _tarefaExistente.Completo = "S";
            _context.SaveChanges();
            return Ok();
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
