import axios from 'axios';

/**
 * Get city list
 * @returns
 */
export function getCityList() {
  return axios({
    url: 'city/list',
    method: 'get'
  });
}

/**
 * 
 * @returns 
 */
export function getCountryList() 
{
  return axios({
    url: 'countries/list',
    method: 'get'
  });
}

