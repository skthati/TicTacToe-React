import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] =useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        const user = {
            username: username,
            password: password
        };
    try {
        const {data} = await axios.post('http://localhost:8000/token/', 
        user, 
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true 
        }
        );

        console.log('Successful Login: ', data)
        setSuccess(true);

        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = 
                                         `Bearer ${data['access']}`;
        
        window.location.href = '/';

    } catch (err) {
        console.error('Error during Login', err)
        setSuccess(false)
        setError('Login Failed, Please check Credentials');
    }

    };

    return (
        <div className='Auth-form-container pt-5' style={{ maxWidth: '400px', margin: 'auto' }}>
            {error && <p style={{color:'red'}}>{error}</p>}
            {success && <p style={{color:'green'}}>Login Successful!</p>}
            <form className='Auth-form' onSubmit={submit}>
                <div className='Auth-form-Content'>
                    <h3 className='Auth-form-title'>Sign In</h3>
                    <div className='form-group mt-3'>
                        <label>username</label>
                        <input className='form-control mt-1'
                        placeholder='Enter username'
                        name='username'
                        type='text'
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}>
                        </input>
                    </div>

                    <div className='form-group mt-3'>
                        <label>password</label>
                        <input className='form-control mt-1'
                        placeholder='Enter password'
                        name='password'
                        type='password'
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}>
                        </input>
                    </div>

                    <div className='d-grid gap-2 mt-3'>
                        <button type='submit' className=' btn btn-primary'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

