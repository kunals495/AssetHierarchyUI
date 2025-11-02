import React from 'react';
import "../styles/HierarchyHeader.css";
import wrenchIcon from '../assets/wrench.png';
import filterIcon from '../assets/filter.png';
import expandIcon from '../assets/html-code.png';

const HierarchyHeader : React.FC = () => {
    return (
        <div className='hierarchy-header'>
            <h4>Assets</h4>
            <button className='add-buttons'>+</button>
            <button className='search-button'>
                <img src={wrenchIcon} />
            </button>
            <button className='filter-button'>
                <img src ={filterIcon}/>
            </button>
            <button className='expand-button'>
                <img src = {expandIcon}/>
            </button>
        </div>
    );
};

export default HierarchyHeader;