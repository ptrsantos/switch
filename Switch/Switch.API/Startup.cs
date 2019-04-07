using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Switch.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace Switch.API
{
    public class Startup
    {

        IConfiguration Configuration { get; set; }
        public Startup(IConfiguration configuration)
        {
            var builder = new ConfigurationBuilder().AddJsonFile("config.json");
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var conn = Configuration.GetConnectionString("SwitchDB");
            services.AddDbContext<SwitchContext>(o => o.UseLazyLoadingProxies()
                                                .UseMySql(conn, m => m.MigrationsAssembly("Switch.Infra.Data")));
            services.AddMvcCore();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
