import React, { useState, useEffect } from "react";
import VolumeSlider from "./VolumeSlider";

const whiteKeys = [
	"C1",
	"D1",
	"E1",
	"F1",
	"G1",
	"A1",
	"B1",
	"C2",
	"D2",
	"E2",
	"F2",
	"G2",
	"A2",
	"B2",
	"C3",
	"D3",
	"E3",
	"F3",
	"G3",
	"A3",
	"B3",
	"C4",
	"D4",
	"E4",
	"F4",
	"G4",
	"A4",
	"B4",
];

const blackKeys = [
	"Db1",
	"Eb1",
	"Gb1",
	"Ab1", // Black keys in octave 1
	"Db2",
	"Eb2",
	"Gb2",
	"Ab2", // Black keys in octave 2
	"Db3",
	"Eb3",
	"Gb3",
	"Ab3", // Black keys in octave 3
	"Db4",
	"Eb4",
	"Gb4",
	"Ab4", // Black keys in octave 4
	"Db5",
	"Eb5",
	"Gb5",
	"Ab5", // Black keys in octave 5
];

// Mapping for keyboard keys
const keyMap = {
	// Octave 1 (C1 - B1)
	z: "C1",
	x: "Db1",
	c: "D1",
	v: "Eb1",
	b: "E1",
	n: "F1",
	m: "Gb1",
	",": "G1",
	".": "Ab1",
	"/": "A1",
	Shift: "Bb1", // Using B as Bb for compatibility with the list
	a: "B1",
	// Octave 2 (C2 - B2)
	s: "C2",
	d: "Db2",
	f: "D2",
	g: "Eb2",
	h: "E2",
	j: "F2",
	k: "Gb2",
	l: "G2",
	";": "Ab2",
	"'": "A2",
	Enter: "Bb2",
	q: "B2",
	// Octave 3 (C3 - B3)
	w: "C3",
	e: "Db3",
	r: "D3",
	t: "Eb3",
	y: "E3",
	u: "F3",
	i: "Gb3",
	o: "G3",
	p: "Ab3",
	"[": "A3",
	"]": "Bb3",
	// Octave 4 (C4 - B4)
	Backslash: "C4",
	1: "Db4",
	2: "D4",
	3: "Eb4",
	4: "E4",
	5: "F4",
	6: "Gb4",
	7: "G4",
	8: "Ab4",
	9: "A4",
	0: "Bb4",
	"-": "B4",

	// Octave 5 (C5 - B5)
	"=": "C5",
	Backspace: "Db5",
	Tab: "D5",
};

const Piano = () => {
	const [activeKeys, setActiveKeys] = useState([]);
	const [volume, setVolume] = useState(75); // Add a state for volume
	const [keyTimeouts, setKeyTimeouts] = useState({}); // Add a state for key timeouts

	// Function to play sound
	const playSound = key => {
		console.log(`Playing sound for key: ${key}`);

		if (key === activeKeys[activeKeys.length - 1]) {
			console.log(`Key ${key} is already active.`);
			return;
		} else {
			const audio = new Audio(`/sounds/${key}.mp3`);
			audio.volume = volume / 100; // Use the volume state to set the audio volume
			audio.play().catch(error => {
				console.error(`Error playing sound for key ${key}:`, error);
			});
		}
	};

	// Handle key down event
	const handleKeyDown = event => {
		console.log(`Key pressed: ${event.key}`);
		const key = keyMap[event.key];

		if (key) {
			console.log(`Mapped to piano key: ${key}`);
		} else {
			console.log(`No mapping found for key: ${event.key}`);
		}

		// Check if key is already active
		if (key && !activeKeys.includes(key)) {
			console.log(`Adding key to activeKeys: ${key}`);
			setActiveKeys([...activeKeys, key]);
			playSound(key);
		} else if (key && activeKeys.includes(key)) {
			console.log(`Key ${key} is already active.`);
		}
	};

	// Handle key up event
	const handleKeyUp = event => {
		console.log(`Key released: ${event.key}`);
		const key = keyMap[event.key];

		if (key) {
			console.log(`Removing key from activeKeys: ${key}`);
			setActiveKeys(activeKeys.filter(k => k !== key));
		}
	};

	// UseEffect to listen for key events
	useEffect(() => {
		console.log("Adding keydown and keyup event listeners");
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			console.log("Removing keydown and keyup event listeners");
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [activeKeys]);

	// Get corresponding keyboard button for piano key
	const getKeyLabel = key => {
		return Object.keys(keyMap).find(k => keyMap[k] === key);
	};

	// Function to get black key offset
	const getBlackKeyOffset = index => {
		const offsets = [
			3.75, //
			7.25, //
			14.25, //
			17.75, //
			21.25, //
			28.25, //
			31.75, // ]
			38.75, // z
			42.25, // g
			45.5, // j
			52.5, // ;
			56, // ,
			63, // 2
			66.5, // 4
			70, // 7
			77, // 9
			80.5, // 0
			87.4, // -
			91, // 1
			94.5, // 3
			98, // 6

			// 16 Keys
			// repeat for every octave
		];
		return offsets[index % offsets.length]; // Repeat the pattern for additional octaves
	};

	return (
		<div className='relative flex flex-col justify-center items-center content-center w-full'>
			{/* Render the VolumeSlider component */}
			<VolumeSlider volume={volume} setVolume={setVolume} />
			<div className='relative flex justify-center items-center content-center w-full h-72 mt-5 px-8 '>
				{/* White Keys */}
				<div className='flex relative w-full h-full'>
					{whiteKeys.map((key, index) => (
						<div
							key={key}
							className={`relative border border-black bg-gray-300 h-full flex flex-col items-center justify-end shadow-lg transition-all duration-75 ease-out select-none
              ${
								activeKeys.includes(key)
									? "bg-gray-600 shadow-red-400/75 scale-[98%] -translate-y-1"
									: ""
							}
              flex-grow flex-shrink basis-[calc(100%/52)]`}
							onMouseOver={() => {
								setActiveKeys([...activeKeys, key]);
								playSound(key);
							}}
							onMouseOut={() => {
								const timeoutId = setTimeout(() => {
									setActiveKeys(activeKeys.filter(k => k !== key));
								}, 200); // 200ms delay
								setKeyTimeouts(prevTimeouts => ({
									...prevTimeouts,
									[key]: timeoutId,
								}));
							}}
							onMouseDown={() => {
								setActiveKeys([...activeKeys, key]);
								playSound(key);
							}}
							onMouseUp={() => {
								setActiveKeys(activeKeys.filter(k => k !== key));
							}}
							onMouseLeave={() =>
								setActiveKeys(activeKeys.filter(k => k !== key))
							}>
							<div className='flex flex-col text-base xl:text-xl mb-1 text-center items-center -space-y-4'>
								<span className=''>{getKeyLabel(key)}</span>
								<br></br>
								<span className='opacity-15 font-bold'>{key}</span>
							</div>
						</div>
					))}
				</div>
				{/* Black Keys */}
				<div className='absolute top-0 flex w-full h-[60%] justify-center'>
					{blackKeys.map((key, index) => {
						if (!key) return null; // Skip spaces where there's no black key

						// Use the getBlackKeyOffset function to position black keys
						const leftOffset = getBlackKeyOffset(index); // Get the specific offset for this key
						const blackKeyStyle = {
							left: `calc(${leftOffset}%)`, // Use the offset for positioning
						};
						return (
							<div
								key={key}
								className={`absolute border border-black bg-black w-[calc(100%/32*0.6)] h-full flex flex-col items-center justify-end shadow-lg transition-all duration-75 ease-out select-none
              ${
								activeKeys.includes(key)
									? "bg-gray-400 shadow-red-400/75 scale-[98%] -translate-y-[2px]"
									: ""
							}
              z-10`}
								style={blackKeyStyle}
								onMouseOver={() => {
									setActiveKeys([...activeKeys, key]);
									playSound(key);
								}}
								onMouseOut={() => {
									const timeoutId = setTimeout(() => {
										setActiveKeys(activeKeys.filter(k => k !== key));
									}, 200); // 200ms delay
									setKeyTimeouts(prevTimeouts => ({
										...prevTimeouts,
										[key]: timeoutId,
									}));
								}}
								onMouseDown={() => {
									setActiveKeys([...activeKeys, key]);
									playSound(key);
								}}
								onMouseUp={() => {
									setActiveKeys(activeKeys.filter(k => k !== key));
								}}
								onMouseLeave={() =>
									setActiveKeys(activeKeys.filter(k => k !== key))
								}>
								<div
									className={`flex flex-col items-center text-center text-base xl:text-lg -space-y-6 text-white mb-1 z-10  ${
										activeKeys.includes(key) ? "text-black" : ""
									}`}>
									<span className=''>{getKeyLabel(key)}</span>
									<br></br>
									<span className='opacity-40 font-semibold'>{key}</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Piano;
