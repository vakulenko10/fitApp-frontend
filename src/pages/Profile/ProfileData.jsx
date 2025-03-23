import React, { useEffect, useState } from 'react'
import { updateUserProfile } from "@/lib/profile"; // Assuming you've created this function
import {updateWeight } from "@/lib/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from '@/components/auth/AuthWrapper';
import Container from '@/components/Container';

const ProfileData = ({profileData, setProfileData}) => {
   const { user, token } = AuthData();
    const [loading, setLoading] = useState(true);
const [isEditing, setIsEditing] = useState(false);

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
      setIsEditing(false); // Disable editing after successful update
    } catch (error) {
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
    if (profileData.sex !== user.sex) updatedProfile.sex = profileData.sex;
    if (parseInt(profileData.height, 10) !== user.height)
      updatedProfile.height = parseInt(profileData.height, 10);
    if (parseInt(profileData.age, 10) !== user.age)
      updatedProfile.age = parseInt(profileData.age, 10);

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
      sex: user.sex || "",
      height: user.height || "",
      weight: user.weight || null,
      age: user.age || "",
    });
    setIsEditing(false);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };


  useEffect(() => {
      setLoading(false);
  }, [token]);
  if (loading) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <div className="bg-primary shadow-lg flex flex-col rounded-lg px-4">
            <h1 className="font-semibold text-lg lg:text-4xl flex justify-center sm:justify-start mb-4">
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
                  {user?.profileImageURL && (
                    <img src={user?.profileImageURL} alt="Profile" />
                  )}
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
                <div className="grid grid-cols-2 sm:max-lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                      Sex
                    </p>
                    <Input
                      type="text"
                      name="sex"
                      className="text-md placeholder:text-black"
                      placeholder="Male"
                      value={profileData.sex}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
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
                  <div>
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
                  <div>
                    <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl">
                      weight
                    </p>
                    <Input
                      type="number"
                      name="weight"
                      className="text-md placeholder:text-black"
                      placeholder="49"
                      value={profileData.weight}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    {isEditing&&
                    <Button
                      variant="submit"
                      className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20"
                      onClick={handleWeightSubmit}
                    >
                      Save
                    </Button>}
                  </div>
                </div>
    
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
  )
}

export default ProfileData