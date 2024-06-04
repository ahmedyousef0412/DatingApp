


namespace API.Controllers;

public class PhotosController(IUnitOfWork unitOfWork,IMapper mapper,IImageService imageService) : BaseApiController
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IMapper _mapper = mapper;
    private readonly IImageService _imageService = imageService;



    [HttpPost("UploadPhoto")]
    public async Task<ActionResult<PhotoDto>> UploadImage(IFormFile file)
    {
       
        var user = await _unitOfWork.Users
            .GetByUserNameAsync(u => u.UserName == User.GetUserName(), [Includes.Photo]);


        var result = await _imageService.AddImageAsync(file);

        if (result.Error is not null)
            return BadRequest(result.Error.Message);


        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };


        if (user!.Photos.Count == 0)
            photo.IsMain = true;

        user.Photos.Add(photo);


        if (await _unitOfWork.Complete())
            return  _mapper.Map<PhotoDto>(photo);
        

        return BadRequest(Errors.photoNotAdded);
    }


    
    [HttpPut("SetMain/{photoId}")]
    public async Task<IActionResult> SetMainPhoto(int photoId)
    {

        var (user, photo) = await GetUserAndPhoto(photoId);

        if (user is null || photo is null)
            return NotFound();


        if (photo.IsMain)
            return BadRequest(Errors.PhotoIsMain);

        var currentMainPhoto = user!.Photos.FirstOrDefault(p => p.IsMain);

        if (currentMainPhoto is not null)
            currentMainPhoto.IsMain = false;

        photo.IsMain = true;

        if (await _unitOfWork.Complete())
            return NoContent();


        return BadRequest(Errors.FailedToSetMain);

    }


    [HttpDelete("DeletePhoto/{photoId}")]
    public async Task<IActionResult> DeleteImage(int photoId)
    {
      
        var (user, photo) = await GetUserAndPhoto(photoId);

        if (user is null || photo is null)
            return NotFound();

        if (photo.IsMain) return BadRequest(Errors.FailedToDeleteMainPhoto);

        if (photo.PublicId is not null)
        {
            var result = await _imageService.DeleteImageAsync(photo.PublicId);
           
            if (result.Error is not null)
                return BadRequest(result.Error.Message);
        }


        _unitOfWork.Photos.Remove(photo);

        if (await _unitOfWork.Complete())
            return NoContent();

        return BadRequest(Errors.FailedToDeletePhoto);

    }


    private async Task<(ApplicationUser user, Photo photo)> GetUserAndPhoto(int photoId)
    {
        var userName = User.GetUserName();

        var user = await _unitOfWork
                   .Users
                   .GetByUserNameAsync(u => u.UserName == userName, [Includes.Photo]) 
                   ?? throw new Exception(Errors.UserNotFound);


        var photo = user!.Photos
                              .FirstOrDefault(p => p.Id == photoId)
                              ?? throw new Exception(Errors.PhotoNotFound);

      

        return (user, photo);
    }
}
