import request,{gql} from "graphql-request"
import { useEffect, useState } from "react";

const MASTER_URL="https://api-ap-south-1.hygraph.com/v2/clmlrmtzk1kax01uj8lk14q7c/master";


export const getCarsList=async()=>{
    const query=gql`
    query CarLists {
        carLists {
          carAvg
          createdAt
          id
          name
          price
          publishedAt
          updatedAt
          seat
          image {
            url
          }
          carType
          carBrand
        }
      }      
    `

    const result=await request(MASTER_URL,query);
    return result;
}

export const getStoreLocations=async()=>{
  const query=gql`
  query storeLocation {
    storesLocations {
      address
    }
  }  
  `
  const result=await request(MASTER_URL,query);
  return result;
}


export const createBooking=async(formValue:any)=>{
  const mutationQuery=gql`
  mutation MyMutation {
    createBooking(
      data:  {userName: "`+formValue.userName+`", 
      pickUpDate: "`+formValue.pickUpDate+`", 
      pickUpTime: "`+formValue.pickUpTime+`", 
      dropOffDate: "`+formValue.dropOffDate+`", 
      dropOffTime: "`+formValue.dropOffTime+`", 
      contactNumber: "`+formValue.contactNumber+`", 
      carId: {connect: 
        {id: "`+formValue.carId+`"}}}
    ){
      id
    }
  }
  
  `

  const result=await request(MASTER_URL,mutationQuery);
  return result;
}

export default function App() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return <h1>{isClient ? 'This is never prerendered' : 'Prerendered'}</h1>
}