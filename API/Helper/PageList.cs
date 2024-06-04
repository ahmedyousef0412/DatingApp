namespace API.Helper;

public class PageList<T>:List<T>
{

    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }


    public PageList(IEnumerable<T> items , int count, int pageNumber, int pageSize)
    {
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        PageSize = pageSize;
        TotalCount = count;
        AddRange(items);
    }

    public static async Task<PageList<T>> CreateAsync(IQueryable<T> source, int pageNumber , int pageSize)
    {

        var count = await source.CountAsync();

        /*
         * pageSize = 10
         * pageNumber = 3
          skip =   3 - 1 * 10 = 20  
          take = 20
         so => in page zero show 20 item
         
         */

        var items = await source.Skip((pageNumber - 1) * pageSize)
                                       .Take(pageSize)
                                       .ToListAsync();

        return new PageList<T>(items , count  , pageNumber, pageSize);
    }
}
