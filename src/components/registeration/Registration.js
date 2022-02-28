import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './registration.css';
import Modal from 'react-modal';
import { FaCheckCircle } from 'react-icons/fa';
Modal.setAppElement('#root');

function Registration() {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [user, setUser] = useState({});

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [modal, setModal] = useState(false);
    const handleName = (e) => {
        if (/^([a-z0-9]{3,30})$/.test(e.target.value)) {
            console.log(e.target.value);
            setNameInput(() => {
                setNameError(() => {
                    return false;
                })
                return e.target.value;
            });
        } else {
            setNameError(() => {
                return true;
            })
        }
    }
    const handleEmail = (e) => {
        if (/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(e.target.value)) {
            setEmailInput(() => {
                setEmailError(() => {
                    return false;
                })
                return e.target.value;
            });
        } else {
            setEmailError(() => {
                return true;
            })
        }

    }
    const handlePassword = (e) => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(e.target.value)) {
            setPasswordInput(() => {
                setPasswordError(() => {
                    return false;
                })
                return e.target.value;
            });
        } else {
            setPasswordError(() => {
                return true;
            })
        }

    }

    const storeUser = (e) => {
        e.preventDefault();
        const allUsers = JSON.parse(localStorage.getItem('users'));
        if (nameError || emailError || passwordError === false) {
            setUser(() => {
                const user = {
                    name: nameInput,
                    email: emailInput,
                    password: passwordInput
                };

                if (allUsers == null) {
                    localStorage.setItem('users', JSON.stringify([user]));
                } else {
                    localStorage.setItem('users', JSON.stringify([...allUsers, user]));
                }
                localStorage.setItem('current-user', JSON.stringify(user));
                return user;
            })
            setModal(()=>{
                return true;
            })
        }
        setNameInput('');
        setEmailInput('');
        setPasswordInput('');
        setUser({});
    }
    return (
        <>
            <div className="registration__container">
                <h1 className='registration__title'>Register</h1>
                <form className="ui form registration__form" onSubmit={storeUser}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" onChange={handleName} required />
                        <p className={(nameError) ? 'registration__error--show' : 'registration__error--disappear'}>Invalid name; letters only accepted</p>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" onChange={handleEmail} required />
                        <p className={(emailError) ? 'registration__error--show' : 'registration__error--disappear'}>Invalid email format</p>

                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" onChange={handlePassword} required />
                        <p className={(passwordError) ? 'registration__error--show' : 'registration__error--disappear'}>Invalid password; 8 characters (letters, numbers, special characters)</p>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>

                {/* Modal Section  */}
                <Modal isOpen={modal} className='registration__modal' onRequestClose={()=>setModal(false)}>
                     <h2>All Done!</h2>
                    <div className='registration__modalCheck'><FaCheckCircle /></div>
                     <p>You have been registered successfully</p>
                    <button className='registration__modalBtn' onClick={() => window.location.reload()}>
                        <Link to='/'>Back to home</Link>
                    </button>
                 </Modal>
            </div>
        </>
    )
}

export default Registration