import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CartList.css'
import {placeorder} from '../../../Components/ToastNotification'
import { useNavigate } from 'react-router-dom'
import { remove_all } from '../../../Store/CartSlice'
import emailjs from '@emailjs/browser';
import { registeration } from '../../../Components/ToastNotification'
import { add_data } from '../../../Store/DashboardSlice'
import { DynamicTitile } from '../../../DynamicPageTitle'
export const Checkout = ({setcheckout}) => {
    DynamicTitile('CheckOut Page')
    let cart_data = useSelector(state=>state.cartState.cartList)
    let name = useSelector(state=>state.loginState.name)
    let email = useSelector(state=>state.loginState.email)
    let total = useSelector(state=>state.cartState.total)
    let naviagate = useNavigate(); 
    let dispatch = useDispatch();
    let handledata = async () =>{
        const emailParams = {
            user_name: name,
            to_email: email
          };          

          emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID , emailParams, process.env.REACT_APP_PUBLIC_KEY)
            .then((result) => {
                registeration(true, 'Email Have been Sent!')
            })
            .catch((error) => {
                registeration(false, 'Error in Sending Email!')
            });
            naviagate('/order-confirmed')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const all_data = {
            "cartList":cart_data,
            "amount_paid": total,
            "quantity": cart_data.length,
            "user": {
              "name": name,
              "email": email
            },
        }
        const response = await fetch(`${process.env.REACT_APP_HOST}/orders`, {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(all_data)
      })
      const final_data = await response.json();
      setTimeout(() => {
            dispatch(add_data(cart_data))
            setcheckout(false);
            dispatch(remove_all());
        }, 3000);
        // setTimeout(() => {
            //     naviagate('/')
        // }, 5000);
    }
    return (
        <section>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            <div id="authentication-modal" tabIndex="-1" className="mt-5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog" >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto overflow-y-auto margin-apply-top">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" >
                            <svg onClick={()=>setcheckout(false)} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                <i className="bi bi-credit-card mr-2"></i>CARD PAYMENT
                            </h3>
                            <div className="space-y-6" >
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={name} disabled required="" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email:</label>
                                    <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={email} disabled required="" />
                                </div>
                                <div>
                                    <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number:</label>
                                    <input type="number" name="card" id="card" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="4215625462597845" disabled required="" />
                                </div>
                                <div className="">
                                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date:</label>
                                    <input type="number" name="month" id="month" className="inline-block w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="03" disabled required="" />
                                    <input type="number" name="year" id="year" className="inline-block w-20 ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="27" disabled required="" />
                                </div>
                                <div>
                                    <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Security Code:</label>
                                    <input type="number" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value="523" disabled required="" />
                                </div>
                                <p className="mb-4 text-2xl font-semibold text-lime-500 text-center">
                                    ${total}
                                </p>
                                <button onClick={()=>{placeorder(); handledata()}} className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" >
                                    <i className="mr-2 bi bi-lock-fill"></i>PAY NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}