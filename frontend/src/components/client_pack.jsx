import '../css/client_pack.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import { FormTable } from './FormTable';

axios.defaults.baseURL = "http://localhost:3000/"  //connect with backend

function App() {
  const [dataList, setDataList] = useState([]);
  console.log(dataList);

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <>
      <div className="heading text-center mb-8">
        <h1 className="text-3xl font-bold">You can Buy your Package</h1>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dataList.length > 0 ? (
          dataList.map((el, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{el.pac_name}</h3>
              <p className="text-gray-600 mb-4">{el.features}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-indigo-600 h1">${el.price}</p>
                {/* Remove speed as it's not included in the dataList */}
                {/* <p className="text-lg font-semibold text-indigo-600">${el.speed}</p> */}
                <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No data</p>
        )}
      </div>
    </>
  );
}

export default App;
