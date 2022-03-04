import React from 'react';
import "./Header.css";

const Header = (props) => {

  const {mod, setMod} = props;

  const onCreateClick = () => {
    setMod('Create');
  }

  const onEditClick = () => {
    setMod('Edit');
  }

  const onEdit2Click = () => {
    setMod('Edit2');
  }

  const onNoneClick = () => {
    setMod('None')
  }

  return (
    <header className='header'>
      <button 
        className={`header-button ${mod === 'Create' ? 'active' : ''}`}
        onClick={onCreateClick}
      >
        Create
      </button>
      <button 
        className={`header-button ${mod === 'Edit' ? 'active' : ''}`}
        onClick={onEditClick}  
      >
        Edit
      </button>
      <button 
        className={`header-button ${mod === 'Edit2' ? 'active' : ''}`}
        onClick={onEdit2Click}  
      >
        Edit v.2 
      </button>
      <button 
        className={`header-button ${mod === 'None' ? 'active' : ''}`}
        onClick={onNoneClick}
      >
        None
      </button>
    </header>
  );
}

export default Header;