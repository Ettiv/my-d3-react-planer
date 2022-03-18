import React from 'react';
import "./Header.css";
import CustomSelector from '../CustormComponents/CustomSelect/CustomSelect';

const Header = (props) => {

  const { mod, setMod, setFloorId, allFloorId, floorId,onCloseWebSocket } = props;

  //Old save lockal storage
  // const onSaveClick = () => {
  //   const jsonData = JSON.stringify(data);
  //   localStorage.setItem(data.id, jsonData);
  // }

  const onCreateClick = () => {
    setMod('Create');
  }

  const onEditClick = () => {
    setMod('Edit');
  }

  const onEdit2Click = () => {
    setMod('Edit2');
  }

  const onEdit3Click = () => {
    setMod('Edit3');
  }

  const onNoneClick = () => {
    setMod('None')
  }

  const onChangeFloorSelect = (event) => {
    onCloseWebSocket();
    setFloorId(event.target.value);
  }

  return (
    <header className='header'>
      <div className='tools-panel'>
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
          className={`header-button ${mod === 'Edit3' ? 'active' : ''}`}
          onClick={onEdit3Click}
        >
          Edit v.3
        </button>
        <button
          className={`header-button ${mod === 'None' ? 'active' : ''}`}
          onClick={onNoneClick}
        >
          None
        </button>
      </div>
      <div className='control-buttons'>
        <CustomSelector
          options={allFloorId}
          name="floorIdSelect"
          id="floorIdSelect"
          defaultValue={floorId}
          onChange={onChangeFloorSelect}
        />
        {/* <button
          className={`header-button`}
          onClick={onSaveClick}
        >
          Save
        </button> */}
      </div>
    </header>
  );
}

export default Header;