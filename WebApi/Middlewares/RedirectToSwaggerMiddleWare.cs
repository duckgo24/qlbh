using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.middlewares
{
    public class RedirectToSwaggerMiddleWare
    {
        private readonly RequestDelegate _next;

        public RedirectToSwaggerMiddleWare(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path == "/")
            {
                context.Response.Redirect("/swagger/index.html");
            }
            else
            {
                await _next(context);
            }
        }
    }
}