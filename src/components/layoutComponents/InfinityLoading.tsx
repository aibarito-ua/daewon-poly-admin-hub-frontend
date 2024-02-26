
import './infinityLoading.css';
export default function InfinityLoadingComponent() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="infinity-path">
        <div></div>
        <div></div>
      </div>
      <div className='infinity-path-text'>Loading...</div>
    </div>
  )
}