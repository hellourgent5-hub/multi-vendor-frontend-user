import React, {useEffect, useState} from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function Profile(){
  const [profile,setProfile]=useState(null);
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(!token) return;
    axios.get(`${API}/api/users/profile`,{headers:{Authorization:`Bearer ${token}`}}).then(r=>setProfile(r.data)).catch(e=>console.error(e));
  },[]);
  if(!profile) return <div>Please login (placeholder)</div>;
  return (<div><h2>Profile</h2><div>Name: {profile.name}</div><div>Email: {profile.email}</div></div>);
}
