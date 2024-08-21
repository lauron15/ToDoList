using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoList.ModelTO
{

    [Table("tarefas")]
    public class Tarefa
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }
        [Column("Nome")]
        public string? Nome { get; set; }
        [Column("Tarefa")]
        public string? Tarefas { get; set; }
        [Column("Completo")]
        public string? Completo { get; set; }

    }
}
