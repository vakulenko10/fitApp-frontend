import React from 'react'

const Profile = () => {
  return (
    <>
      <div className='bg-white my-4 mx-7.25'>
        <h3>
          Account Settings
        </h3>
        <div>
          <div>
            <p>
              First Name
            </p>
            <input 
              type="text"
              name="name"
            />
            <p>
              Last Name
            </p>
            <input 
              type="text"
              name="surname"
            />
          </div>
          <div>
            <p>
              Email
            </p>
            <input 
              type="text"
              name="email"
            />
            <p>
              Sex
            </p>
            <input 
              type="text"
              name="sex"
            />
          </div>
          <div>
            <p>
              Height
            </p>
            <input 
              type="text"
              name="height"
            />
            <p>
              Weight
            </p>
            <input 
              type="text"
              name="weight"
            />
            <p>
              Age
            </p>
            <input 
              type="text"
              name="age"
            />
          </div>
          <div>
            <a href="#">
              Delete Account
            </a>
            <a href="#">
              Change password
            </a>
          </div>
          <div>
            <a href="#">
              Cancel
            </a>
            <a href="#">
              Save
            </a>
          </div>
        </div>
        <div>
          <img src="" alt="Foto" />
        </div>
      </div>
    </>
  )
}

export default Profile