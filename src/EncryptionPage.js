import React, {useState} from 'react'
import encrypt from './encrypt.png'
export const EncryptionPage = () => {
    const [status, setStatus] = useState("Submit");
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Encrypting...");
      const { name, email, message, phonenumber } = e.target.elements;
      let details = {
        name: name.value,
        email: email.value,
        message: message.value,
        phonenumber: phonenumber.value
      };
      let response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      setStatus("Submit");
      let result = await response.json();
      alert(result.status);
    };
  return (
    <div>
        <div className="flex flex-wrap justify-center">
        <div className="w-6/12 sm:w-4/12 px-4">
    <img src={encrypt} alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
        </div>
    <form className = "w-full max-w-lg m-auto py-10 mt-10 px-10 border" onSubmit={handleSubmit}>
      <div>
        <label className="text-gray-600 font-medium" htmlFor="name">Name:</label>
        <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" placeholder='Name'  type="text" id="name" required />
      </div>
      <div>
        <label className="text-gray-600 font-medium" htmlFor="email">Email:</label>
        <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" type="email" id="email" required />
      </div>
      <div>
        <label className="text-gray-600 font-medium" htmlFor="phonenumber">Phone Number:</label>
        <input className="border-solid border-gray-300 border py-2 px-4 w-full
        rounded text-gray-700" type="tel" id="phonenumber" required />
      </div>
      <div>
        <label className="text-gray-600 font-medium" htmlFor="message">Message:</label>
        <textarea className="border-solid border-gray-300 border py-20 px-4 w-full
        rounded text-gray-700" rows={3} cols={5} id="message" required />
      </div>
      <button className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
      type="submit">{status}</button>
    </form>
    </div>
    </div>
  );
  
}
