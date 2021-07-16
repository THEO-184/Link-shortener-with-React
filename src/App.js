import React, { useRef, useEffect, useState } from "react";
import Api from "./Api";

function App() {
	const [longLink, setLongLink] = useState("");
	const [value, setValue] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef(null);
	// handleChange

	const handleChange = (e) => {
		setLongLink(e.target.value);
		setError(handleError(e));
		setValue(e.target.value);
	};

	// handleSubmit
	const handleError = (e) => {
		if (e.target.value.length === 0) {
			return "This is a required value";
		} else if (
			!/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zÐ-Ð¯Ð°-Ñ0-9]{1}[A-Za-zÐ-Ð¯Ð°-Ñ0-9\-]*\.?)*\.{1}[A-Za-zÐ-Ð¯Ð°-Ñ0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/.test(
				e.target.value
			)
		) {
			return "There should be a link";
		} else {
			return "";
		}
	};

	const api = new Api();
	const handleSubmit = (e) => {
		e.preventDefault();

		if (inputRef.current.value) {
			api
				.shortLink(inputRef.current.value)
				.then((res) => {
					setValue(res.link);
				})
				.catch((err) => err);
		}
	};

	// handleClick
	const handleClick = (e) => {
		document.querySelector(".input").select();
		document.execCommand("copy");
	};

	useEffect(() => {
		inputRef.current.focus();
	});
	return (
		<>
			<div className="container">
				<h1>Link shortner project</h1>
				<h4>Enter your link below</h4>
				<form onSubmit={handleSubmit}>
					<input
						className="input"
						type="url"
						ref={inputRef}
						required
						value={value}
						onChange={handleChange}
					/>
					<button id="error" className="error main-form__error">
						{error}
					</button>
					<button className="copy" onClick={handleClick}>
						Copy
					</button>
					<button className="shorten" type="submit">
						Shorten
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
