
import React, { useContext } from 'react'
import { UserContext } from '../Provider/UserProvider'

function useUser() {
  return useContext(UserContext);
}

export default useUser;
