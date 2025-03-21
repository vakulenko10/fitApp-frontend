import React, {useState} from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { AuthData } from "./auth/AuthWrapper";

const Profile = () => {

  // async function updateUserProfile(profileData) {
  //   const backendURL = "https://example.com";
  
  //   try {
  //     const response = await fetch(`${backendURL}/user/profile`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(profileData),
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Błąd: ${response.status} - ${response.statusText}`);
  //     }
  
  //     const data = await response.json(); 
  //     console.log("Profil został zaktualizowany:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Wystąpił problem podczas aktualizacji profilu:", error);
  //     throw error;
  //   }
  // }

  const {user} = AuthData();

  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    sex: '',
    height: '',
    weight: '',
    age: '',
    email: '',
  });

  return (
    <>
      <div className='bg-white shadow-lg flex flex-col rounded-lg mx-12 sm:max-lg:mx-7.5 lg:mx-[7.25rem] my-8 sm:max-lg:my-14 py-4 sm:pt-4 sm:pb-7 lg:pt-6 lg:pb-[6.25] px-2 sm:px-6 min-w-[20rem]'>
        <h1 className='font-semibold text-lg lg:text-4xl flex justify-center sm:justify-start mb-4'>
          Account Settings
        </h1>
        <div className="sm:w-[70%]">
          <div>
            <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
              First name
            </p>
            <Input 
              type="text"
              className="text-md placeholder:text-black"
              placeholder="Aboba"
              value={profileData.name}
            />
          </div>
          <div>
            <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
              Last Name
            </p>
            <Input 
              type="text"
              className="text-md placeholder:text-black"
              placeholder="Abobos"
              value={profileData.surname}
            />
          </div>
          <div>
            <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
              Email
            </p>
            <Input 
              type="text"
              className="text-md placeholder:text-black"
              placeholder="abobatestpoczta@gmail.com"
              value={profileData.email}
            />
          </div>
          <div className='grid grid-cols-2 sm:max-lg:grid-cols-4 gap-4 mb-4'>
            <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
                Sex
              </p>
              <Input
                type="text"
                className="text-md placeholder:text-black"
                placeholder="Male"
                value={profileData.sex}
              />
            </div>
            <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
                Weight
              </p>
              <Input 
                type="text"
                className="text-md placeholder:text-black"
                placeholder="55"
                value={profileData.weight}
              />
            </div>
            <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
                Height
              </p>
              <Input 
                type="text"
                className="text-md placeholder:text-black"
                placeholder="173"
                value={profileData.height}
              />
            </div>
            <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
                Age
              </p>
              <Input 
                type="text"
                className="text-md placeholder:text-black"
                placeholder="49"
                value={profileData.age}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 mb-4">
            <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">Change password</p>
            <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">Delete Account</p>
          </div>

          {/* <Drawer>
            <DrawerTrigger>Delete Account</DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button variant="submit">Delete Account</Button>
                  <DrawerClose>
                    <Button
                      variant="outline"
                      className={"text-secondary hover:text-secondary/80"}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer> */}

          <div className='flex space-x-2.5 justify-center sm:justify-around mx-3'>
            <Button className="bg-muted-darker py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20">
              Cancel
            </Button>
            <Button className="bg-ring py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile