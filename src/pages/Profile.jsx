import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "@components/auth/AuthWrapper";
import LineChartComponent from '@/components/LineChart';
import { getWeightHistory } from '@/lib/profile';
import { updateUserProfile } from '@/lib/profile'; // Assuming you've created this function
import { getMealPlanHistory } from '@/lib/mealplan';

function GridItem({ title, children, className }) {
  return (
    <div className={`${className} w-full flex flex-col items-center justify-center p-4 border-0 rounded-xl h-[400px]`}>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

const Profile = () => {
  const { user, token } = AuthData();
  const [loading, setLoading] = useState(true);
  const [weightHistory, setWeightHistory] = useState();
  const [mealPlanHistory, setMealPlanHistory] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || '',
    email: user.email || '',
    sex: user.sex || '',
    height: user.height || '',
    age: user.age || '',
  });
  useEffect(() => {
    const fetchMealPlanHistory = async () => {
      try {
        setLoading(true);
        const mealHistory = await getMealPlanHistory(token);
        console.log('mealHistory:', mealHistory.mealPlans)
        setMealPlanHistory(mealHistory.mealPlans);
      } catch (error) {
        console.error("Error fetching meal plan history:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMealPlanHistory();
  }, [token]);
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

  useEffect(() => {
    if (token) fetchWeightHistory();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Only send updated fields
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object that contains only the fields that have changed
    const updatedProfile = {};
  
    if (profileData.name !== user.name) updatedProfile.name = profileData.name;
    if (profileData.email !== user.email) updatedProfile.email = profileData.email;
    if (profileData.sex !== user.sex) updatedProfile.sex = profileData.sex;
    if (parseInt(profileData.height, 10) !== user.height) updatedProfile.height = parseInt(profileData.height, 10);
    if (parseInt(profileData.age, 10) !== user.age) updatedProfile.age = parseInt(profileData.age, 10);
  
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
      setIsEditing(false);  // Disable editing after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Do not reset isEditing state if there's an error.
    }
  };
  

  const handleCancel = (e) => {
    setProfileData({
      name: user.name || '',
      email: user.email || '',
      sex: user.sex || '',
      height: user.height || '',
      age: user.age || '',
    });
    setIsEditing(false);
  };
  const handleEdit = (e) =>{
    e.preventDefault()
    setIsEditing(true)
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='bg-white shadow-lg flex flex-col rounded-lg mx-12 sm:max-lg:mx-7.5 lg:mx-[7.25rem] my-8 sm:max-lg:my-14 py-4 sm:pt-4 sm:pb-7 lg:pt-6 lg:pb-[6.25] px-2 sm:px-6 min-w-[20rem]'>
        <h1 className='font-semibold text-lg lg:text-4xl flex justify-center sm:justify-start mb-4'>
          Account Settings
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="sm:w-[70%]">
            <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
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
            {/* <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
                Last Name
              </p>
              <Input
                type="text"
                name="surname"
                className="text-md placeholder:text-black"
                placeholder="Abobos"
                value={profileData.surname}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div> */}
            <div>
              {user?.profileImageURL && <img src={user?.profileImageURL} alt="Profile" />}
            </div>
            <div>
              <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
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
            <div className='grid grid-cols-2 sm:max-lg:grid-cols-4 gap-4 mb-4'>
              <div>
                <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
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
                <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
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
                <p className='font-semibold text-center sm:text-left text-muted-darker text-lg lg:text-xl lg:text-xl'>
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

            <div className="flex flex-col sm:flex-row items-center space-y-4 mb-4">
              <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">Change password</p>
              <p className="text-sm sm:text-lg font-semibold sm:font-bold hover:underline cursor-pointer">Delete Account</p>
            </div>

            <div className='flex space-x-2.5 justify-center sm:justify-around mx-3'>
              {isEditing ? (
                <>
                  <Button variant="grey" className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="submit" className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20" type="submit">
                    Save
                  </Button>
                </>
              ) : (
                <Button className="py-3 sm:py-6 lg:py-8 px-6 sm:px-8 lg:px-20" onClick={handleEdit}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </form>

        <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 max-w-[1400px]">
        <GridItem title="Weight " className="border-2 border-tertiary">
          <LineChartComponent data={weightHistory} />
        </GridItem>
       
      </div>
      <div title="Meal Plan History" className="border-2 border-primary mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {mealPlanHistory?.length > 0 ? (
                mealPlanHistory.map((plan, index) => (
                  <div key={plan.id} className="bg-secondary text-white shadow-lg rounded-lg">
                    <div>
                      <div className="text-lg font-bold">
                        {`Meal Plan ${index + 1} (${plan.calorieIntake} kcal)`}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">
                        <strong>Included Products:</strong> {JSON.parse(plan.includedProducts).join(", ")}
                      </p>
                      <p className="mt-2 text-gray-300">
                        {plan.generatedText.length > 100
                          ? `${plan.generatedText.substring(0, 100)}...`
                          : plan.generatedText}
                      </p>
                      {plan.generatedText.length > 100 && (
                        <Button variant="ghost" className="text-sm mt-2">
                          Show More
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No meal plans found.</p>
              )}
            </div>
          </div>
      </div>
    </>
  );
};

export default Profile;
