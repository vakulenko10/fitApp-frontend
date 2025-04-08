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
import {
  UserIcon,
  MailIcon,
  VenetianMask,
  Ruler,
  Cake,
  Flame,
  Weight,
} from "lucide-react";

const Field = ({ label, icon, error, inputProps }) => {
  return (
    <div>
      <p className="text-muted-foreground mb-1 text-sm font-medium">{label}</p>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          {icon}
        </span>
        <Input
          {...inputProps}
          className={`w-full rounded-md border py-3 pr-4 pl-10 text-base transition-all ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-primary border-gray-300"} ${inputProps.disabled ? "cursor-not-allowed bg-gray-100" : "bg-white"} `}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

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
    const updatedProfile = {};
    const newWeight = Number(data.weight);
    const currentWeight = Number(user.weight);

    if (data.name !== user.name) updatedProfile.name = data.name;
    if (data.email !== user.email) updatedProfile.email = data.email;
    if (data.gender !== user.gender) updatedProfile.gender = data.gender;
    if (Number(data.height) !== user.height)
      updatedProfile.height = Number(data.height);
    if (Number(data.age) !== user.age) updatedProfile.age = Number(data.age);
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
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-1/3 rounded bg-gray-300" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 w-full rounded bg-gray-300" />
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <div className="h-10 w-24 rounded bg-gray-300" />
            <div className="h-10 w-24 rounded bg-gray-300" />
          </div>
        </div>
      </Container>
    );

  return (
    <div className="bg-primary relative flex flex-col rounded-lg p-4 shadow-lg md:flex-row">
      <div className="order-2 flex-9/12">
        <h1 className="mb-6 text-lg font-semibold lg:text-4xl">
          Account Settings
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Field
              label="Name"
              icon={<UserIcon className="h-5 w-5" />}
              error={errors.name?.message}
              inputProps={{
                ...register("name"),
                disabled: !isEditing,
                placeholder: "Enter your name",
              }}
            />

            <Field
              label="Email"
              icon={<MailIcon className="h-5 w-5" />}
              error={errors.email?.message}
              inputProps={{
                ...register("email"),
                disabled: true,
                placeholder: "you@email.com",
              }}
            />

            <div>
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                Gender
              </p>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <VenetianMask className="h-5 w-5" />
                </span>
                <select
                  {...register("gender")}
                  disabled={!isEditing}
                  className={`w-full rounded-md border py-3 pr-4 pl-10 text-sm transition-all ${
                    errors.gender
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-primary border-gray-300"
                  } ${!isEditing ? "text-destructive cursor-not-allowed" : "bg-white"}`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <Field
              label="Height (cm)"
              icon={<Ruler className="h-5 w-5" />}
              error={errors.height?.message}
              inputProps={{
                ...register("height", { valueAsNumber: true }),
                disabled: !isEditing,
                placeholder: "e.g. 180",
              }}
            />

            <Field
              label="Age"
              icon={<Cake className="h-5 w-5" />}
              error={errors.age?.message}
              inputProps={{
                ...register("age", { valueAsNumber: true }),
                disabled: !isEditing,
                placeholder: "e.g. 25",
              }}
            />

            <Field
              label="Calorie Intake"
              icon={<Flame className="h-5 w-5" />}
              error={errors.currentCalorieIntake?.message}
              inputProps={{
                ...register("currentCalorieIntake"),
                disabled: !isEditing,
                placeholder: "e.g. 2200",
              }}
            />

            <Field
              label="Weight (kg)"
              icon={<Weight className="h-5 w-5" />}
              error={errors.weight?.message}
              inputProps={{
                ...register("weight", { valueAsNumber: true }),
                disabled: !isEditing,
                placeholder: "e.g. 70",
              }}
            />

            <div className="flex justify-center space-x-4 pt-4">
              {isEditing ? (
                <>
                  <Button variant="grey" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="submit" type="submit">
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
            <AlertDialogTrigger className="cursor-pointer text-sm font-semibold hover:underline">
              Delete Account
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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
      </div>

      <div className="order-1 flex flex-1 items-center justify-center md:order-2">
        <Avatar className="h-32 w-32 rounded-full border-2 shadow-md md:h-40 md:w-40">
          <AvatarImage src={user?.profileImageURL} alt={user.name} />
          <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProfileData;
