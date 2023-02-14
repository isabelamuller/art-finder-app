import { ThreeDots } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div className='Loading-Spinner-Container'>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="var(--navy-blue)"
                ariaLabel="three-dots-loading"
            />
        </div>
    )
}

export default Loader;

