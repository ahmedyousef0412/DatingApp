using Microsoft.EntityFrameworkCore.Storage;
using System.Net;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace API.Middlewares;

public  class ErrorHandlingMiddleware 
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;
    private readonly IHostEnvironment _env;
    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger, IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = _env.IsDevelopment()
                ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new ApiException(context.Response.StatusCode, "Internal Server Error");

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }


    }
    



    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        //HttpStatusCode status;
        //string message;


        //if (exception is Exceptions.BadRequestException) 
        //{
        //    status = HttpStatusCode.BadRequest;
        //    message = exception.Message; 
        //}
        //else if (exception is Exceptions.NotFoundException) 
        //{
        //    status = HttpStatusCode.NotFound;
        //    message = exception.Message;
        //}
        //else if (exception is UnauthorizedAccessException)
        //{
        //    status = HttpStatusCode.Unauthorized;
        //    message = exception.Message;
        //}
        //else
        //{
        //    status = HttpStatusCode.InternalServerError;
        //    message = exception.Message; 
        //}


        //var erors = new Error
        //{
        //    StatusCode = (int)status,
        //    Message = message,
        //};

        //var jsonResponse = JsonSerializer.Serialize(erors);

        //context.Response.ContentType = "application/json";
        //context.Response.StatusCode = (int)status;
        //return context.Response.WriteAsync(jsonResponse);

    }

}
