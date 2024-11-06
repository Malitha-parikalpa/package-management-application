import { CgCloseO } from "react-icons/cg";
import '../css/admin_front.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import { FormTable } from './FormTable';
import { jsPDF } from 'jspdf';



axios.defaults.baseURL ="http://localhost:3000/"  //connect with backend

function App() {

  const [addSection,setaddSection] = useState(false)
  const [editSection,seteditSection] = useState(false)
  const [FormData,setFormData] = useState({
    pac_name : "",
    features : "",
    price : "",
    speed : " ",
    
  })
  const [FormDataEdit,setFormDataEdit] = useState({
    pac_name : "",
    features : "",
    price : "",
    speed : " ",
   _id : "",
  })
  const [dataList,setDataList] = useState([])
console.log(dataList)

  const handleOnchange = (e)=>{
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value

      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //  validation
    if (!FormData.pac_name.trim()) {
      alert("Please enter a package name.");
      return;
    }
    
    if (!FormData.features.trim()) {
      alert("Please enter package Description.");
      return;
    }
    
    
    const priceNum = parseFloat(FormData.price);
    if (isNaN(priceNum) || priceNum <= 0) {  
      alert("Please enter price or valid price greater than zero.");
      return;
    }

    if (!FormData.speed.trim()) {
      alert("Please enter package Description.");
      return;
    }
  

    const data = await axios.post("/create", FormData);
    if (data.data.success) {
      getFetchData();
      setaddSection(false);
      alert(data.data.message);
    }
  };
  

  
//read
  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
      setDataFilterRecv(data.data.data);
    }
  };

  //refresh
  useEffect(()=>{
    getFetchData()
  },[])

  //delete
  const handleDelete=async(id)=>{
    const data = await axios.delete("/delete/"+id)
    
    if(data.data.data)
    {
      getFetchData()
      alert(data.data.message)
    }
  }

  //update
  const handleUpdate = async(e)=>{
    e.preventDefault()

    

    // const priceNum = parseFloat(FormData.price);
    // if (isNaN(priceNum) || priceNum <= 0) {  
    //   alert("Please enter price or valid price greater than zero.");
    //   return;
    // }
  

    const data = await axios.put("/update/",FormDataEdit)
    if(data.data.message)
    {
      getFetchData()
      alert(data.data.message)
      seteditSection(false)
    }
    
  }
  
  const handleEditOnchange = async(e)=>{
    const {value,name} = e.target
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value

      }
    })
  }

  const handleEdit =(el)=>{
    setFormDataEdit(el)
    seteditSection(true)
  }

  //search filter
  const [dataFilterRecv, setDataFilterRecv] = useState([]);

  const handleFilter = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const newData = dataFilterRecv.filter(row => 
      row.pac_name.toLowerCase().includes(searchQuery) ||
      row.features.toLowerCase().includes(searchQuery) ||
      row.price.toString().toLowerCase().includes(searchQuery) ||
      row.speed.toLowerCase().includes(searchQuery) 
    );
    setDataList(newData);
  }
  





  //generate report
  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;
    
    doc.text('Package of Details', 20, y);
    y += 20;
    
    dataList.forEach(contact => {
        doc.text(`Name: ${contact.pac_name}`, 10, y);
        y += 8;
        doc.text(`Description: ${contact.features}`, 10, y);
        y += 15;
        
        doc.text(`Price: ${contact.price}`, 10, y);
        y += 10;
        doc.text(`speed: ${contact.speed}`, 10, y);
        y += 15;
        y += 10; // Add some spacing between each contact
    });
    
    doc.save('contacts.pdf');
};







  
  

  


  return (
    <>
    <div className="container">
      <div className="search-bar">
        <input type="text"className="search" placeholder="search..." onChange={handleFilter}></input>
      </div>
      <button className="btn btn-add" onClick={()=>setaddSection(true)}>Add</button>
     
     {
      addSection &&(
        <FormTable
     handleSubmit={handleSubmit}
     handleOnchange={handleOnchange}
     
     handleClose={()=>setaddSection(false)}
     rest={FormData}
     />
      
        
      )
     } 

     {
      editSection &&(
        <FormTable
     handleSubmit={handleUpdate}
     handleOnchange={handleEditOnchange}
     handleClose={()=>seteditSection(false)}
     rest={FormDataEdit}
     />
      )
     } 
     <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Package name</th>
            <th> Description</th>
            <th>Price</th>
            <th>speed</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            dataList[0]?(
            dataList.map((el)=>{
              console.log(el)
              return(
              <tr>
                <td>{el.pac_name}</td>
                <td>{el.features}</td> 
                <td>{el.price}</td>
                <td>{el.speed}</td>
                <td>
                  <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                  <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                </td>
              </tr>
            )})
          )
          :(
            <p style={{textAlign : "center"}}>No data</p>
          )
        }
        </tbody>
      </table>
     </div>


     <div>
            <button className="btn btn-generate-pdf" onClick={generatePDF}>Download PDF </button>
        </div>
    </div>
    </>
  );
}
export default App;