import React, { useState } from 'react'
import axios from 'axios';
import encrypt from './encrypt.png'

export const EncryptionPage = () => {
  // states for the message sent
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    phonenumber: ''
  });
  // state to handle result of the email sending
  const [result, setResult] = useState(null);

  // code to trigger Sending email
  const sendEmail = event => {
    event.preventDefault();
    axios
      .post('/send', { ...state })
      .then(response => {
        setResult(response.data);
        setState({ name: '', email: '', message: '', phonenumber: '' });
      })
      .catch(() => {
        setResult({ success: false, message: 'Something went wrong. Please try again.' });
      });
    
  };

  const onInputChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-6/12 sm:w-4/12 px-4">
          <img src={encrypt} alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
        </div>

        // result to see whether email is sent or not
        {result && (
          <p className={`${result.success ? 'success': 'error'}`}>
            {result.message}
          </p>
        )}


        <form className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={sendEmail}>
          <div>
            <label className="text-gray-600 font-medium">Name:</label>
            <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" placeholder='Name' type="text" name="name"
              value={state.name} onChange={onInputChange} required />
          </div>
          <div>
            <label className="text-gray-600 font-medium" htmlFor="email">Email:</label>
            <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" type="email" name="email" placeholder='Email'
              value={state.email} onChange={onInputChange} required />
          </div>
          <div>
            <label className="text-gray-600 font-medium" htmlFor="phonenumber">Phone Number:</label>
            <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" type="tel" name="phonenumber" placeholder='Must start with +254'
              value={state.phonenumber} onChange={onInputChange} required />
          </div>
          <div>
            <label className="text-gray-600 font-medium" htmlFor="message">Message:</label>
            <textarea className="border-solid border-gray-300 border py-20 px-4 w-full
        rounded text-gray-700" rows={3} cols={5} name="message" placeholder='Message'
              value={state.message} onChange={onInputChange} required />
          </div>
          <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
            type="submit">Submit</button>
        </form>
      </div>
    </div>
  );

}
