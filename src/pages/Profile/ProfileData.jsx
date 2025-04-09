import React, { useEffect, useState } from "react";
import { updateUserProfile, addWeight } from "@/lib/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/hooks/AuthData";
import Container from "@/components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { profileFormSchema } from "@/validation/profileFormSchema";

const ProfileData = ({ profileData, setProfileData }) => {
  const { triggerToast } = useNotification();
  const { user, setUser, token } = AuthData();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData,
  });

  useEffect(() => {
    reset(profileData);
  }, [profileData, reset]);

  const onSubmit = async (data) => {
    console.log("Form submission triggered");
    const updatedProfile = {};
    const newWeight = Number(data.weight);
    const currentWeight = Number(user.weight);

    // Only update changed fields
    if (data.name !== user.name) updatedProfile.name = data.name;
    if (data.email !== user.email) updatedProfile.email = data.email;
    if (data.gender !== user.gender) updatedProfile.gender = data.gender;
    if (Number(data.height) !== user.height)
      updatedProfile.height = Number(data.height);
    if (Number(data.age) !== user.age)
      updatedProfile.age = Number(data.age);
    if (Number(data.currentCalorieIntake) !== user.currentCalorieIntake)
      updatedProfile.currentCalorieIntake = Number(data.currentCalorieIntake);

    try {
      if (Object.keys(updatedProfile).length > 0) {
        await updateUserProfile(token, updatedProfile);
        triggerToast("Profile updated successfully!", "success");
      }

      if (newWeight !== currentWeight) {
        try {
          await addWeight(token, newWeight);
          triggerToast("Weight added!", "success");
        } catch (error) {
          if (error.message === "403") {
            triggerToast("You can only log weight once per day", "error");
          } else {
            triggerToast("Error updating weight", "error");
          }
        }
      }

      setUser((prev) => ({ ...prev, ...data }));
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      triggerToast("Failed to update profile", "error");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    reset({
      name: user.name || "",
      email: user.email || "",
      gender: user.gender || "",
      height: user.height || "",
      weight: user.weight || null,
      age: user.age || "",
      currentCalorieIntake: user.currentCalorieIntake || null,
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

  if (loading)
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );

  return (
    <main className="bg-primary shadow-lg flex flex-col md:flex-row rounded-lg p-4 relative">
      <section className="flex-9/12 order-2">
        <h1 className="font-semibold text-lg lg:text-4xl mb-4">
          Account Settings
        </h1>
        <form onSubmit={handleSubmit (onSubmit, (formErrors) => {console.log("❌ Validation failed:", formErrors);})}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name">Name</label>
              <Input 
                id="name"
                {...register("name")} 
                disabled={!isEditing} 
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input 
                id="email"
                {...register("email")} 
                disabled 
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                {...register("gender")}
                disabled={!isEditing}
                className="w-full border rounded-md px-3 py-2 disabled:text-muted-darker"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="height">Height</label>
              <Input
                id="height"
                {...register("height", { valueAsNumber: true })}
                disabled={!isEditing}
              />
              {errors.height && (
                <p className="text-red-500">{errors.height.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <Input
                id="age"
                {...register("age", { valueAsNumber: true })}
                disabled={!isEditing}
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="calorieIntake">Calorie Intake</label>
              <Input
                id="calorieIntake"
                {...register("currentCalorieIntake")}
                disabled={!isEditing}
              />
              {errors.currentCalorieIntake && (
                <p className="text-red-500">
                  {errors.currentCalorieIntake.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="weight">Weight</label>
              <Input
                id="weight"
                {...register("weight", { valueAsNumber: true })}
                disabled={!isEditing}
              />
              {errors.weight && (
                <p className="text-red-500">{errors.weight.message}</p>
              )}
            </div>

            <div className="flex space-x-4 justify-center">
              {isEditing ? (
                <>
                  <Button variant="grey" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant={"submit"} type="submit">
                    Save
                  </Button>
                </>
              ) : (
                <Button onClick={handleEdit}>Edit Profile</Button>
              )}
            </div>
          </div>
        </form>

        <div className="mt-6">
          <AlertDialog>
            <AlertDialogTrigger className="text-sm font-semibold hover:underline cursor-pointer">
              Delete Account
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="flex-1 order-1 md:order-2 flex justify-center items-center">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 rounded-full border-2 shadow-md">
          <AvatarImage src={user?.profileImageURL} alt={user.name} />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </section>
    </main>
  );
};

export default ProfileData;