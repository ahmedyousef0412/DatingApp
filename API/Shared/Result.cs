namespace API.Shared;

public class Result<T>
{

    public bool IsSuccess { get; private set; }
    public T Data { get; private set; }
    public string ErrorMessage { get; private set; }

    // Private constructor to ensure controlled instantiation.
    private Result(bool success, T data, string errorMessage)
    {
        IsSuccess = success;
        Data = data;
        ErrorMessage = errorMessage;
    }

    public static Result<T> Success(T data)
    {
        return new Result<T>(true, data, null);
    }

    public static Result<T> Failure(string errorMessage)
    {
        return new Result<T>(false, default, errorMessage);
    }
}

