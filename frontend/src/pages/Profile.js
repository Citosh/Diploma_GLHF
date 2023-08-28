import React, { useContext } from "react"
import { Context } from ".."
import { observer } from "mobx-react-lite";




 
const Profile = observer(() => {
    const {user} = useContext(Context)
    return (
      <div>
        profile
      </div>
    )
})

export default Profile