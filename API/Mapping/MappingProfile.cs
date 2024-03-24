using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mapping;

public class MappingProfile:Profile
{
    public MappingProfile()
    {

        #region ApplicationUser
        CreateMap<ApplicationUser, RegisterDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.UserName))
           
            .ReverseMap();




        CreateMap<ApplicationUser,UserDto>()
             .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url))
           .ReverseMap();


        CreateMap<MemberDto, ApplicationUser>().ReverseMap();
        #endregion


        #region Photo

        CreateMap<Photo, PhotoDto>().ReverseMap();

        #endregion
    }
}
