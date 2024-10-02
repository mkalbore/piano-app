// piano-app/src/VolumeSlider.js
import React from "react";

const VolumeSlider = ({ volume, setVolume }) => {
	const handleVolumeChange = e => {
		setVolume(e.target.value);
	};

	return (
		<div className='flex flex-row text-nowrap items-center text-center'>
			<p className='mr-2 text-lg font-bold'>Volume:</p>
			<input
				type='range'
				min='0'
				max='100'
				value={volume}
				onChange={handleVolumeChange}
				className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
			/>
			<p className='flex text-center ml-2 text-lg font-bold'>🔈 {volume}%</p>
		</div>
	);
};

export default VolumeSlider;
