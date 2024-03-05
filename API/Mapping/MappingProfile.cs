using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mapping;

public class MappingProfile:Profile
{
    public MappingProfile()
    {
        CreateMap<ApplicationUser, RegisterDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
           
            .ReverseMap();
    }
}
