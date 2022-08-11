import {FC} from 'react';
import './loader.css';

export const Loader: FC = () => (
  <div className='lds'>
    <div className='lds-text-spinner'>Loading</div>
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
