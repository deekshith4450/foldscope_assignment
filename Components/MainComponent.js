import React, { useState, useEffect } from 'react';
const MainComponent = () => {
	const [textAreaValue, setTextAreaValue] = useState('');
	const [characterCount, setCharacterCount] = useState({});
	const [mostFrequentCharArray, setMostFrequentCharArray] = useState([]);

	useEffect(() => {
		countCharacters();
	}, [textAreaValue]);

	const countCharacters = () => {
		let textArray = textAreaValue.split('');

		let temp = {};
		textArray.forEach((item) => {
			if (item !== ' ' && item !== '\n') {
				if (Object.keys(temp).includes(item)) {
					temp[item] += 1;
				} else {
					temp[item] = 1;
				}
			}
		});
		setCharacterCount(temp);
		if (textAreaValue.length >= 5) {
			mostFrequentChars(temp);
		}
	};

	const mostFrequentChars = (charObject) => {
		let temp = [];
		let res = Object.values(charObject)
			.sort((a, b) => b - a)
			.slice(0, 5);
		res.forEach((value) => {
			let x = Object.keys(charObject).filter(
				(key) => charObject[key] === value
			);
			// console.log('key', x, 'value', value);
			x.forEach((item) => {
				if (!temp.includes(item)) {
					temp = [...temp, item];
				}
			});
		});
		console.log({ temp });
		setMostFrequentCharArray(temp.slice(0, 5));
	};

	const debounce = (func, delay) => {
		let debounceTimer;
		return function () {
			const context = this;
			const args = arguments;
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func.apply(context, args), delay);
		};
	};
	let handleChange = (event) => {
		event.persist();
		console.log('Something is changed in the textarea', event.target.value);
		setTextAreaValue(event.target.value);
	};

	let optimizehandleChange = debounce(handleChange, 500);
	return (
		<div className="mt-20 mx-10">
			<div className="flex flex-row lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap">
				<div className="xl:w-1/3 2xl:w-1/3 lg:w-1/3 md:w-full sm:w-full w-full rounded-md bg-white shadow-lg mr-5 mt-5">
					<div className="flex flex-col p-5">
						<label>Enter your message.</label>
						<textarea
							onChange={optimizehandleChange}
							className="h-48 max-h-full md:max-h-screen border border-gray-300 rounded-md my-3 p-2 focus:rounded-md"
						/>
					</div>
				</div>
				<div className="rounded-md bg-white shadow-lg lg:w-2/3 xl:w-2/3 2xl:w-2/3  md:w-full sm:w-full w-full p-5 mt-5 mr-5">
					<p>Character and its count.</p>
					{textAreaValue.length > 0 ? (
						<div className="flex flex-row flex-wrap justify-center">
							{Object.keys(characterCount).map((char, i) => {
								return (
									<div key={i}>
										<div className="box-border h-32 w-32 rounded-md  m-2 shadow-lg">
											<div className="flex flex-col">
												<div
													className={`py-2 rounded-t-md ${
														mostFrequentCharArray.includes(char)
															? 'bg-red-400'
															: 'bg-green-400'
													}`}>
													<p className="text-center text-white">{char} </p>
												</div>
												<div className="h-16  flex justify-center items-center my-2 ">
													<p>{characterCount[char]}</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						<p>No Message yet!</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default MainComponent;
