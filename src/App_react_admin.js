import React from "react"
import { Admin, Resource, ListGuesser } from "react-admin"
import restProvider from "ra-data-simple-rest"
import jsonServerProvider from 'ra-data-json-server'


// const API_URL = "https://jsonplaceholder.typicode.com"
const API_URL = "http://localhost:5000/api"

const dataProvider = jsonServerProvider(API_URL)
// const dataProvider = jsonServerProvider(API_URL)

export const App = () => {

  return <Admin dataProvider={dataProvider}>
    {/* <Resource name="users" list={ListGuesser} />
    <Resource name="posts" list={ListGuesser} /> */}
    <Resource name="tags" list={ListGuesser} />
    
  </Admin>
}


export default App;