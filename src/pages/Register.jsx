import React, {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
export default function Register(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav = useNavigate();
  const submit= async e=>{ e.preventDefault();
    const res=await api.post('/api/auth/user/register',{ name, email, password });
    localStorage.setItem('token', res.data.token); localStorage.setItem('userId', res.data.id);
    alert('Registered'); nav('/');
  };
  return (<form onSubmit={submit}><h3>Register</h3><input placeholder="name" value={name} onChange={e=>setName(e.target.value)} /><br/>
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
    <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
    <button>Register</button></form>);
}
