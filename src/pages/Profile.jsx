import React, {useEffect, useState} from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { AuthData } from "@components/auth/AuthWrapper";
import LineChartComponent from '@/components/LineChart';
import { getWeightHistory } from '@/lib/profile';
function GridItem({ title, children, className}) {
  return (
    <div className={`${className} flex flex-col items-center justify-center p-4 border-0 rounded-xl h-[400px]`}>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );}
export const Profile = () => {
  const {user, token} = AuthData();
  const [loading, setLoading] = useState(true);  
  // console.log(user)
  const fetchWeightHistory = async () => {
    try {
      const response = await getWeightHistory(token);
      setWeightHistory(response);
    } catch (error) {
      console.error("Error fetching weight history:", error);
    } finally {
      setLoading(false);
    }
  };
  const [weightHistory, setWeightHistory] = useState()

  useEffect(() => {
    if (token) fetchWeightHistory();
  }, [token]);
  if (loading) {
    return <div>Loading...</div>;  // Display loading state
  }
  else{

 
  return (
    <>
      <div className='bg-white shadow-lg flex flex-col rounded-lg mx-12 sm:max-lg:mx-7.5 lg:mx-[7.25rem] my-8 sm:max-lg:my-14 py-4 sm:pt-4 sm:pb-7 lg:pt-6 lg:pb-[6.25] px-2 sm:px-6 min-w-[20rem]'>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 w-full gap-10 max-w-[1400px]">
        <GridItem className=" border-2 border-tertiary">
        <LineChartComponent data={weightHistory}/>
        </GridItem>
      </div>
      
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
              value={user.name}
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
              value={user.surname}
            />
          </div>
          <div>
            <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
              First name
            </p>
            <img
              src={`${user?.profileImageURL
              }`}
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
              value={user.email}
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
                value={user.sex}
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
                value={user.weight}
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
                value={user.height}
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
                value={user.age}
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
            <Button variant="grey" className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20">
              Cancel
            </Button>
            <Button variant="submit" className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
}

export default Profile