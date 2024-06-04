using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;


namespace API.Helper;

public class LogUserActivity(ILogger<LogUserActivity> logger) : IAsyncActionFilter
{

    private readonly ILogger<LogUserActivity> _logger = logger;

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {

        #region Get Action and Controller Name
        // Get the action name
        //var actionDescriptor = context.ActionDescriptor;
        //var actionName = actionDescriptor.DisplayName ?? actionDescriptor.AttributeRouteInfo?.Name;

        //// Get the controller name from RouteData
        //var controllerName = context.RouteData.Values["controller"].ToString();


        //_logger.LogInformation($"-------- Action Name ------------ {actionName}");
        //_logger.LogInformation($"-------------Controller Name ---------------{controllerName}");

        #endregion


        // The logic needs to be executed after the action is executed
        var resultContext = await next();

        if (!resultContext.HttpContext.User.Identity!.IsAuthenticated)
            return;

        var userId = resultContext.HttpContext.User.GetUserById();

        var repo = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();

        if (repo is null)
        {
            _logger.LogError("IUnitOfWork service not found.");
            return;
        }

        var user = await repo.UserRpository.GetUserByIdAsync(userId);


        if (user is not null)
        {
            user.Data.LastActive = DateTime.Now;
            bool saveResult = await repo.Complete();

            if (!saveResult)
            {
                _logger.LogError("Failed to save user activity for user {UserName}", userId);
            }
        }
        else
        {
            _logger.LogWarning("User with id {UserId} not found", userId);
        }



    }
}



/*
 
 
 
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace API.Helper
{
    public class LogUserActivity : IActionFilter
    {
        private readonly ILogger<LogUserActivity> _logger;

        public LogUserActivity(ILogger<LogUserActivity> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // This method is intentionally left empty
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (!context.HttpContext.User.Identity!.IsAuthenticated) return;

            var userId = context.HttpContext.User.GetUserById();
            var repo = context.HttpContext.RequestServices.GetService<IUnitOfWork>();

            if (repo == null)
            {
                _logger.LogError("IUnitOfWork service not found.");
                return;
            }

            UpdateUserLastActiveAsync(repo, userId).GetAwaiter().GetResult();
        }

        private async Task UpdateUserLastActiveAsync(IUnitOfWork repo, string userId)
        {
            var user = await repo.UserRepository.GetUserByIdAsync(userId);

            if (user != null)
            {
                user.Data.LastActive = DateTime.Now;
                bool saveResult = await repo.Complete();

                if (!saveResult)
                {
                    _logger.LogError("Failed to save user activity for user {UserName}", userId);
                }
            }
            else
            {
                _logger.LogWarning("User with id {UserId} not found", userId);
            }
        }
    }
}

 
 */