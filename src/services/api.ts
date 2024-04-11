import { ApiPropsSingle, ApiPropsDouble, RequestData } from "../types";
import { apiBaseUrl } from "../constants";

const areaBelow = async ({ mean, sd, value}: ApiPropsSingle) => {
    const url = `${apiBaseUrl}/area_below`;
    const data = { value, mean, sd }
  
    try {
      const result = await makeRequest(url, data);
      console.log("Area below probability:", result);
    } catch (error) {
      console.error('Error calculating area above:', error);
    }
}

const areaAbove = async ({value, mean, sd}: ApiPropsSingle) => {
    const url = `${apiBaseUrl}/area_above`;
    const data = { value, mean, sd }
  
    try {
      const result = await makeRequest(url, data);
      console.log("Area above probability:", result);
    } catch (error) {
      console.error('Error calculating area above:', error);
    }
  }

const areaBetween = async ({value_lower, value_upper, mean, sd}: ApiPropsDouble) => { 
    const url = `${apiBaseUrl}/area_between`;
    const data = {value_lower, value_upper, mean, sd}
  
    try {
      const result = await makeRequest(url, data);
      console.log("Area between Probability:", result);
    } catch (error) {
      console.error('Error calculating area above:', error);
    }
  }

const makeRequest = async (url: string, data: RequestData) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
  
    return response.json()
  }

export default {areaBelow, areaAbove, areaBetween}
