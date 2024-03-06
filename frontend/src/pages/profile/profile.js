import React from 'react'
import "../../styles/Profile.scss"
import PageMenu from '../../components/pageMenu/pageMenu'

const Profile = () => {
  return (
    <>
      <section>
        <div className="container">
          <PageMenu></PageMenu>
          <h2>Profile</h2>
        </div>
      </section>
    </>
  )
}

export default Profile
