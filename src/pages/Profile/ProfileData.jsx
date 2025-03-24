import React, { useEffect, useState } from 'react'
import { updateUserProfile } from "@/lib/profile"; // Assuming you've created this function
import {updateWeight } from "@/lib/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from '@/components/auth/AuthWrapper';
import Container from '@/components/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast, Toaster } from 'sonner';

const ProfileData = ({profileData, setProfileData}) => {
   const { user,setUser, token } = AuthData();
    const [loading, setLoading] = useState(true);
const [isEditing, setIsEditing] = useState(false);
const [isWeightEditing, setIsWeightEditing] = useState(false);
const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };  
  const handleWeightSubmit = async (e) => {
    e.preventDefault();
  
    if (!profileData.weight) {
      console.log("Weight is required.");
      return;
    }
  
    try {
      console.log("Updating weight with data:", { weight: profileData.weight });
  
      const response = await updateWeight(token, parseInt(profileData.weight, 10));
  
      console.log("Weight updated successfully:", response);
      setUser(prev => ({
        ...prev,
        weight: profileData.weight,  // Update the calorie intake in the state
      }));
      toast.success(
        <div>
          <p><strong>Success:</strong> Weight updated!</p>
        </div>,
        {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
            
          },
          style:{
            background: "var(--accent)"
          }
        },
        {
          className: "bg-green-100 text-green-800 border border-green-400 shadow-lg",
        }
        
        
      );
      setIsWeightEditing(false); // Disable editing after successful update
    } catch (error) {
      // console.log('error keys:', Error.prototype)
        toast.error(<p >You can't add more than on weight track per day</p>, {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          }, style:{
            background: "var(--popover)",
            color: "var(--muted-darker)"
          }
        });
     
      console.error("Error updating weight:", error);
    }
  };
  
  // Only send updated fields
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object that contains only the fields that have changed
    const updatedProfile = {};

    if (profileData.name !== user.name) updatedProfile.name = profileData.name;
    if (profileData.email !== user.email)
      updatedProfile.email = profileData.email;
    if (profileData.gender !== user.gender) updatedProfile.gender = profileData.gender;
    if (parseInt(profileData.height, 10) !== user.height)
      updatedProfile.height = parseInt(profileData.height, 10);
    if (parseInt(profileData.age, 10) !== user.age)
      updatedProfile.age = parseInt(profileData.age, 10);
    if (parseInt(profileData.currentCalorieIntake, 10) !== user.currentCalorieIntake)
      updatedProfile.currentCalorieIntake = parseInt(profileData.currentCalorieIntake, 10);

    // Don't send empty fields
    if (Object.keys(updatedProfile).length === 0) {
      console.log("No changes detected.");
      return;
    }

    try {
      console.log("Updating profile with data:", updatedProfile);
      const response = await updateUserProfile(token, updatedProfile);
      console.log("Profile updated successfully:", response);
      // Only set isEditing to false after successful profile update
      setIsEditing(false); // Disable editing after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Do not reset isEditing state if there's an error.
    }
  };

  const handleCancel = (e) => {
    setProfileData({
      name: user.name || "",
      email: user.email || "",
      gender: user.gender || "",
      height: user.height || "",
      weight: user.weight || null,
      age: user.age || "",
      currentCalorieIntake: user.currentCalorieIntake ||null
      });
    setIsEditing(false);
  };
  const handleWeightCancel = (e) => {
    setProfileData((prev)=>({
      ...prev,
      weight: user.weight || null
    }));
    setIsWeightEditing(false);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };


  useEffect(() => {
      setLoading(false);
  }, [token]);
  useEffect(()=>{

  }, [user])
  if (loading) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <div className="bg-primary shadow-lg flex flex-col justify-center items-center md:flex-row rounded-lg p-4 relative">
      <h1 className="font-semibold md:hidden text-lg lg:text-4xl flex justify-center sm:justify-start">
              Account Settings
            </h1>
      <div className='flex-9/12  order-2 md:order-2 lg:order-1  '>
      <h1 className="font-semibold text-lg hidden md:flex lg:text-4xl justify-center sm:justify-start">
              Account Settings
            </h1>
    
            <form onSubmit={handleSubmit}>
              <div className="sm:w-[70%]">
                <div>
                  <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                    Name
                  </p>
                  <Input
                    type="text"
                    name="name"
                    className="text-md placeholder:text-black"
                    placeholder="Aboba"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                    Email
                  </p>
                  <Input
                    type="text"
                    name="email"
                    className="text-md placeholder:text-black"
                    placeholder="abobatestpoczta@gmail.com"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex flex-col md:flex-row w-full items-baseline justify-between mb-4 relative">
                  <div className='w-full  mx-1'>
                    <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                    Gender
                    </p>
                    <Input
                      type="text"
                      name="gender"
                      className="text-md placeholder:text-black"
                      placeholder="Male"
                      value={profileData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className='w-full  mx-1'>
                    <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                      Height
                    </p>
                    <Input
                      type="number"
                      name="height"
                      className="text-md placeholder:text-black"
                      placeholder="173"
                      value={profileData.height}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className='w-full mx-1'>
                    <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                      Age
                    </p>
                    <Input
                      type="number"
                      name="age"
                      className="text-md placeholder:text-black"
                      placeholder="49"
                      value={profileData.age}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                </div>
                <div>
                    <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                      Calorie Intake
                    </p>
                    <Input
                      type="number"
                      name="currentCalorieIntake"
                      className="text-md placeholder:text-black"
                      placeholder={profileData.currentCalorieIntake}
                      value={profileData.currentCalorieIntake}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div><p className="font-semibold text-center sm:text-left text-muted-darker text-lg  lg:text-xl">
                      weight
                    </p>
                <div className='w-full flex justify-center items-center gap-2'>
                    
                    <Input
                      type="number"
                      name="weight"
                      className="text-md placeholder:text-black"
                      placeholder="49"
                      value={profileData.weight}
                      onChange={handleChange}
                      disabled={!isWeightEditing}
                    />
                    {isWeightEditing?<>
                      <Button
                      variant="grey"
                      size="lg"
                      onClick={handleWeightCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="submit"
                       size="lg"
                      onClick={handleWeightSubmit}
                    >
                      Save
                    </Button>
                    </>:
                    <Button
                      size="lg"
                      onClick={()=>setIsWeightEditing((prev)=>!prev)}
                    >
                      Edit
                    </Button>}
                  </div></div>
                <div className="flex flex-col sm:flex-row items-center space-y-4 mb-4">
                  <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">
                    Change password
                  </p>
                  <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">
                    Delete Account
                  </p>
                </div>
    
                <div className="flex space-x-2.5 justify-center sm:justify-around mx-3">
                  {isEditing ? (
                    <>
                      <Button
                        variant="grey"
                        className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="submit"
                        className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20"
                        type="submit"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20"
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </form>
            </div>
            <div className='relative m-0 border-box flex-1/4 justify-center order-1 md:order-2 items-center my-auto'>
                  {/* {user?.profileImageURL && (
                    <img src={user?.profileImageURL} alt="Profile"  className='rounded-full'/>
                  )} */}
               
                    <Avatar className="h-20 w-20 md:h-40 md:w-40 rounded-full p-0 border-2 relative border-secondary shadow-md ">
                    <AvatarImage
                      src={user?.profileImageURL}
                      alt={user.name}
                      className="h-full w-full object-cover rounded-full"
                    />
                   {!(user.profileImageURL)&&
                   <AvatarFallback className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-600 font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>}
                  </Avatar>
                  
                  
                </div>
    </div>
  )
}

export default ProfileData