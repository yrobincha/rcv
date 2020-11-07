import React from 'react';
import styles from './header.module.css';
import { GoogleLogin } from 'react-google-login';
import { Spinner } from 'reactstrap';
const Header = (props) => {
	const responseGoogle = (res) => {
		console.log(res);
	};

	const responseFail = (err) => {
		console.log(err);
	};

	return (
		<header className={styles.header}>
			<img className={styles.logoImage} src="/images/logo.png" alt="logo" />
			<h1 className={styles.logo}>RCV</h1>
			<div className={styles.container}>
				<a className={styles.login}>Login</a>
				<a className={styles.login}>Add a new project</a>
				<GoogleLogin
					className={styles.googleLogin}
					clientId={process.env.REACT_APP_GOOGLE_API_KEY}
					buttonText="Sign in with google"
					onSuccess={responseGoogle}
					onFailure={responseFail}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
		</header>
	);
};

export default Header;
