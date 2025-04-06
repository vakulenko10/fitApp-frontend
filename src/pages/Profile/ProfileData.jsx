import React, { useEffect, useState } from 'react'
import { updateUserProfile } from "@/lib/profile";
import { updateWeight } from "@/lib/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/hooks/AuthData";
import Container from '@/components/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNotification } from "@/hooks/UseNotification";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from '@/validation/profileFormSchema';


const ProfileData = ({ profileData, setProfileData }) => {
  const { triggerToast } = useNotification();
  const { user, setUser, token } = AuthData();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isWeightEditing, setIsWeightEditing] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData
  });

  useEffect(() => {
    Object.keys(profileData).forEach(key => {
      setValue(key, profileData[key]);
    });
  }, [profileData, setValue]);

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
      const response = await updateWeight(token, parseInt(profileData.weight, 10));
      setUser(prev => ({
        ...prev,
        weight: profileData.weight,
      }));
      triggerToast('Weight updated!', 'success');
      setIsWeightEditing(false);
    } catch (error) {
      triggerToast("You can't add more than on weight track per day", 'error');
      console.error("Error updating weight:", error);
    }
  };

  const onSubmit = async (data) => {
    const updatedProfile = {};

    if (data.name !== user.name) updatedProfile.name = data.name;
    if (data.email !== user.email) updatedProfile.email = data.email;
    if (data.gender !== user.gender) updatedProfile.gender = data.gender;
    if (parseInt(data.height, 10) !== user.height) updatedProfile.height = parseInt(data.height, 10);
    if (parseInt(data.age, 10) !== user.age) updatedProfile.age = parseInt(data.age, 10);
    if (parseInt(data.currentcalorieIntake, 10) !== user.currentCalorieIntake)
      updatedProfile.currentCalorieIntake = parseInt(data.currentcalorieIntake, 10);

    if (Object.keys(updatedProfile).length === 0) {
      console.log("No changes detected.");
      return;
    }

    try {
      const response = await updateUserProfile(token, updatedProfile);
      triggerToast('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      triggerToast("Failed to update profile", 'error');
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
      currentCalorieIntake: user.currentCalorieIntake || null
    });
    setIsEditing(false);
  };

  const handleWeightCancel = (e) => {
    setProfileData((prev) => ({
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

  useEffect(() => { }, [user]);

  if (loading) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <div className="bg-primary shadow-lg flex flex-col justify-center items-center md:flex-row rounded-lg p-4 relative">
      <h1 className="font-semibold md:hidden text-lg lg:text-4xl flex justify-center sm:justify-start">
        Account Settings
      </h1>
      <div className='flex-9/12  order-2 md:order-2 lg:order-1'>
        <h1 className="font-semibold text-lg hidden md:flex lg:text-4xl justify-center sm:justify-start">
          Account Settings
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:w-[70%]">
            <div>
              <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl">Name</p>
              <Input {...register("name")} name="name" className="text-md placeholder:text-black" value={profileData.name} onChange={handleChange} disabled={!isEditing} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl">Email</p>
              <Input {...register("email")} name="email" className="text-md placeholder:text-black" value={profileData.email} onChange={handleChange} disabled={!isEditing} />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col md:flex-row w-full items-baseline justify-between mb-4 relative">
              <div className='w-full  mx-1'>
                <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl">Gender</p>
                <select {...register("gender")} name="gender" value={profileData.gender} onChange={handleChange} disabled={!isEditing} className="text-md w-full border border-input rounded-md px-3 py-2">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
              </div>
              <div className='w-full  mx-1'>
                <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl">Height</p>
                <Input {...register("height", { valueAsNumber: true })} name="height" className="text-md placeholder:text-black" value={profileData.height} onChange={handleChange} disabled={!isEditing} />
                {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
              </div>
              <div className='w-full mx-1'>
                <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl">Age</p>
                <Input {...register("age", { valueAsNumber: true })} name="age" className="text-md placeholder:text-black" value={profileData.age} onChange={handleChange} disabled={!isEditing} />
                {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
              </div>
            </div>
            <div>
              <p className="font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl">Calorie Intake</p>
              <Input {...register("currentcalorieIntake")} name="currentcalorieIntake" className="text-md placeholder:text-black" value={profileData.currentcalorieIntake} onChange={handleChange} disabled={!isEditing} />
              {errors.currentcalorieIntake && <p className="text-red-500 text-sm">{errors.currentcalorieIntake.message}</p>}
            </div>
            <div>
              <p className="font-semibold text-center sm:text-left text-muted-darker text-lg  lg:text-xl">Weight</p>
              <div className='w-full flex justify-center items-center gap-2'>
                <Input {...register("weight", { valueAsNumber: true })} name="weight" className="text-md placeholder:text-black" value={profileData.weight} onChange={handleChange} disabled={!isWeightEditing} />
                {isWeightEditing ? <>
                  <Button variant="grey" size="lg" onClick={handleWeightCancel}>Cancel</Button>
                  <Button variant="submit" size="lg" onClick={handleWeightSubmit}>Save</Button>
                </> :
                  <Button size="lg" onClick={() => setIsWeightEditing((prev) => !prev)}>Edit</Button>}
              </div>
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 mb-4">
              <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">Change password</p>
              <AlertDialog>
                <AlertDialogTrigger className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">Delete Account</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex space-x-2.5 justify-center sm:justify-around mx-3">
              {isEditing ? (
                <>
                  <Button variant="grey" className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20" onClick={handleCancel}>Cancel</Button>
                  <Button variant="submit" className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20" type="submit">Save</Button>
                </>
              ) : (
                <Button className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20" onClick={handleEdit}>Edit Profile</Button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className='relative m-0 border-box flex-1/4 justify-center order-1 md:order-2 items-center my-auto'>
        <Avatar className="h-20 w-20 md:h-40 md:w-40 rounded-full p-0 border-2 relative border-secondary shadow-md">
          <AvatarImage src={user?.profileImageURL} alt={user.name} className="h-full w-full object-cover rounded-full" />
          {!(user.profileImageURL) &&
            <AvatarFallback className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-600 font-bold text-lg">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>}
        </Avatar>
      </div>
    </div>
  )
}

export default ProfileData;
