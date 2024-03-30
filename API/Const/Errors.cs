namespace API.Const;

public class Errors
{

    #region Shared 

    public const string MaxLength = "File Can't be more than 2MB";
    public const string ValidExtension = "Invalid file extension. Only JPG, JPEG, and PNG are allowed.";

    #endregion

    #region Photo

    public const string photoNotAdded = "PhotoNotAdded";
    public const string PhotoIsMain = "Photo is already main!";
    public const string FailedToSetMain = "Failed to set main photo!";
    public const string FailedToDeleteMainPhoto = "You cannot delete  main photo!";
    public const string FailedToDeletePhoto = "Failed to delete photo!";
    public const string PhotoNotFound = "Photo Not Found";

    #endregion
    #region User

    public const string UserNotFound = "User Not Found";
   
    public const string UserExistBefore = "UserName is already exist";
    public const string UserNotInserted = "UserNotInserted";
    public const string UserNotUpdated = "UserNotUpdated";
    public const string UserNotDeleted = "UserNotDeleted";
    public const string EmailDuplicated = "Email is already exist!";
    public const string EmailOrPasswordIncorrect = "Email or Password is Incorrect";

    #endregion
}
