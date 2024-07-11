import { createContext } from "react";
import { useOrg } from "../Hooks/useOrg";

export const OrganizationContext =createContext();

function OrgProvider(props){
    const {orgData}=useOrg('http://localhost:5000/ ')
    return(
<OrganizationContext.Provider value={orgData} >
    {props.children}
</OrganizationContext.Provider>
    )
}
export default OrgProvider;