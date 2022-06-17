import React, { useState } from 'react'
import axios from 'axios';
import encrypt from './encrypt.png'

export const EncryptionPage = () => {
  // states for the message sent
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    phoneNumber: ''
  });
  // state to handle result of the email sending
  const [result, setResult] = useState(null);
  const [decryptedMessage, setDecryptedMessage] = useState(null);

  // code to trigger Sending email
  const sendEmail = event => {
    event.preventDefault();
    axios
      .post('/send', { ...state })
      .then(response => {
        setResult(response.data);
        setState({ name: '', email: '', message: '', phoneNumber: '' });
      })
      .catch(() => {
        setResult({ success: false, message: 'Something went wrong. Please try again.' });
      });

  };

  // code to decrypt message
  const decrypt = event => {
    event.preventDefault();
    axios
      .post('/decrypt', { ...state })
      .then(response => {
        setDecryptedMessage(response.data);
        setState({ encryptedMessage: '', decryptionKey: '' });
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


        {result && (
          <p className={`${result.success ? 'success' : 'error'}`}>
            {result.message}
          </p>
        )}


        <form className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={sendEmail}>
          <h1>Encryption Part</h1>
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
            <label className="text-gray-600 font-medium" htmlFor="phoneNumber">Phone Number:</label>
            <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" type="tel" name="phoneNumber" placeholder='Must start with +254'
              value={state.phoneNumber} onChange={onInputChange} required />
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



        <form className="w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={decrypt}>
          <h1>Decryption Page</h1>
          <div>
            <label className="text-gray-600 font-medium" htmlFor="message"> Encrypted Message:</label>
            <textarea className="border-solid border-gray-300 border py-20 px-4 w-full
        rounded text-gray-700" rows={3} cols={5} name="encryptedMessage" placeholder='Message'
              value={state.encryptedMessage} onChange={onInputChange} required />
          </div>
          <div>
            <label className="text-gray-600 font-medium" htmlFor="phoneNumber">Decryption Key:</label>
            <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" type="text" name="decryptionKey" placeholder='Must start with +254'
              value={state.decryptionKey} onChange={onInputChange} required />
          </div>
          <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
            type="submit">Submit</button>
        </form>

        <div>
          <label className="text-gray-600 font-medium" htmlFor="message"> Decrypted Message:</label>
          {decryptedMessage && (
            <p className={`${decryptedMessage.success ? 'success' : 'error'}`}>
              {decryptedMessage.message}
            </p>
          )}

        </div>
      </div>
    </div>
  );

}

export default EncryptionPage;
