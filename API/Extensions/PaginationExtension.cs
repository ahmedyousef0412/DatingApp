using System.Text.Json;

namespace API.Extensions;

public static class PaginationExtension
{

    public static void AddPaginationHeader(this HttpResponse response , 
        int currentPage , int itemsPerPage , int totalItems , int totalPages)
    {
        var paginationHeader = new PaginationHeader(currentPage , itemsPerPage , totalItems , totalPages);


        JsonSerializerOptions jsonSerializerOptions = new()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        var options = jsonSerializerOptions; 

        response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader,options));

        response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
    }
}
