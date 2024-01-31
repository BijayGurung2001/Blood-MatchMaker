import { createContext } from "react";
import { useOrg } from "../Hooks/useOrg";

export const OrganizationContext =createContext();

function OrgProvider(children){
    const {orgData}=useOrg('http://localhost:5000/ ')
    return(
<OrganizationContext.Provider value={orgData} >
    {children}
</OrganizationContext.Provider>
    )
}
export default OrgProvider;