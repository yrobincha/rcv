import React, { useState } from 'react';
import styles from './login.module.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'

const Login = (props) => {
		const [isLoggedIn, setLoggedIn] = useState(false);
		const [userName, setUserName] = useState('');

		const setLoggedOut = () => {
				setLoggedIn(false);
		}

		const responseGoogle = (user) => {
				console.log(user.getBasicProfile().getId());
				const name = user.getBasicProfile().getName();
				axios.post('/login', {
userID : user.getBasicProfile().getId(),
uname : user.getBasicProfile().getName()
});
// userName = user.getBasicProfile.getName();
console.log('Signed in as ' + user.getBasicProfile().getName());
setLoggedIn(true);
setUserName(name);
// userList.push(userName);
};

const responseFail = (err) => {
		console.log(err);
};

return (
				<div>
				{isLoggedIn ?
				<>
				<a className={styles.userName}>Hello {userName}</a>
				<a className={styles.login}
				onClick={setLoggedOut}>
				로그아웃
				</a>
				</> :
				<>
				<a className={styles.login}>로그인</a>
				<GoogleLogin
				className={styles.googleLogin}
				clientId={process.env.REACT_APP_GOOGLE_API_KEY}
				buttonText="Sign in with google"
				onSuccess={responseGoogle}
				onFailure={responseFail}
				cookiePolicy={'single_host_origin'}
				/>
				</>
				}
</div>
);
};

export default Login;
