import React, { useState } from 'react'; // <--- Added useState here

const Login = () => {
  const [email, setEmail] = useState(''); // <--- Define email here

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return alert("Enter email!");
    
    localStorage.setItem('token', 'fake_token');
    window.location.href = '/dashboard';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Staff Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // <--- This updates the email variable
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;