import Piano from "./Piano";
import VolumeSlider from "./VolumeSlider";

function App() {
	return (
		<div className='flex flex-col inset-y-0 inset-x-0 h-[100vw] lg:h-[100vh] w-[100vh] lg:w-[100vw] justify-center items-center content-center justify-items-center bg-gray-500 rotate-90 lg:rotate-0'>
			<h1 className='text-lg xl:text-3xl 2xl:text-6xl pb-2'>Piano App</h1>

			<Piano />
		</div>
	);
}

export default App;
