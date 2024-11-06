import React from 'react'
import { CgCloseO } from 'react-icons/cg'
import '../css/form_table.css'

export const FormTable = ({handleSubmit,handleOnchange,handleClose,rest}) => {
  return (
    <div className="addContainer">
    <form onSubmit={handleSubmit}>
    <div className="close-btn" onClick={handleClose}><CgCloseO/></div>
  
    <label htmlFor="pac_name">Package Name</label>
    <input type="text" id="pac_name" name="pac_name" onChange={handleOnchange} value={rest.pac_name} ></input>
    <label htmlFor="features">Description</label>
    <textarea name='features' onChange={handleOnchange} value={rest.features}></textarea>
    
    <label htmlFor="price">Price</label>
    <input type="text" id="price" name="price" onChange={handleOnchange}  value={rest.price}></input>
    <label htmlFor="speed">Speed</label>
    <input type="text" id="speed" name="speed" onChange={handleOnchange}  value={rest.speed}></input>
    
    <button className="btn btn-submit" >Submit</button>
    
    </form>

  </div>
  )
}
