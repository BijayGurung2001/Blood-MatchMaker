import React, { useContext } from 'react'
import { OrganizationContext } from '../Context/OrganizationContext'

const OrganizationList = () => {
    const {orgData}=useContext(OrganizationContext)
  return (
    <>
    <p>{orgData.name}</p>
    </>
  )
}

export default OrganizationList