import React, {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav = useNavigate();
  const submit= async e=>{ e.preventDefault();
    const res=await api.post('/api/auth/user/login',{ email, password });
    localStorage.setItem('token', res.data.token); localStorage.setItem('userId', res.data.id);
    alert('Logged in'); nav('/');
  };
  return (<form onSubmit={submit}><h3>Login</h3><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
    <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
    <button>Login</button></form>);
}
