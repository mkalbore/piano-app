import Piano from "./Piano";
import VolumeSlider from "./VolumeSlider";

function App() {
	return (
		<div className='h-screen w-screen flex flex-col justify-center items-center bg-gray-500'>
			<h1 className='text-lg xl:text-3xl 2xl:text-6xl pb-2'>Piano App</h1>
			<Piano />
		</div>
	);
}

export default App;
