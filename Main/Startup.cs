using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace YourNamespace
{
    public class Startup
    {
        // Esse método é chamado pelo runtime para adicionar serviços ao container de DI.
        public void ConfigureServices(IServiceCollection services)
        {
            // Adiciona serviços necessários ao container, como controle de MVC.
            services.AddControllersWithViews(); // Para MVC
            // services.AddRazorPages(); // Para Razor Pages (se precisar)
        }

        // Esse método é chamado pelo runtime para configurar o pipeline de requisição HTTP.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Configura a resposta detalhada de erro no ambiente de desenvolvimento.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts(); // Habilita a segurança HSTS (HTTP Strict Transport Security) em produção.
            }

            app.UseHttpsRedirection(); // Redireciona HTTP para HTTPS
            app.UseStaticFiles(); // Habilita o uso de arquivos estáticos (ex: CSS, JS, imagens).

            app.UseRouting(); // Habilita o roteamento.

            app.UseAuthorization(); // Habilita a autorização (se necessária).

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}"); // Define a rota padrão do MVC.

                // Se estiver usando Razor Pages, descomente a linha abaixo:
                // endpoints.MapRazorPages();
            });
        }
    }
}
