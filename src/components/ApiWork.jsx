import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import CustomModal from './Modal';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState({});
  const options = {
    method: 'GET',
    url: 'https://movies-api14.p.rapidapi.com/shows',
    headers: {
      'X-RapidAPI-Key': 'ade1280565mshfa32ec0622425b8p1f4c72jsnc3ed8285a200',
      'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setData(response.data.movies);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openModal = (index) => {
    setShowModal((prev) => ({ ...prev, [index]: true }));
  };

  const closeModal = (index) => {
    setShowModal((prev) => ({ ...prev, [index]: false }));
  };

  const filterDataByDate = () => {
    return data.filter((item) => {
      const firstAiredDate = new Date(item.first_aired);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

      return firstAiredDate >= selectedStartDate && firstAiredDate <= selectedEndDate;
    });
  };

  const filterDataBySearch = () => {
    return data.filter((item) =>
      item.original_title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredDataByDate = startDate && endDate ? filterDataByDate() : data;
  const filteredData = search ? filterDataBySearch() : filteredDataByDate;

  return (
    <>
      <section className="w-100 bg-dark " style={{minHeight:"100vh"}}>
        <div className="w-100 d-flex align-items-center align-items-between flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            <div
              className="d-flex justify-content-between mt-3 align-items-center"
              style={{ minWidth: '300px' }}
            >
              <span className="text-light px-4">From</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className=" px-3 bg-dark form-control gold"
                style={{
                  color: 'hsl(42, 100%, 50%)',
                  width: '250px',
                  border: '2px solid hsl(42,100%,50%)'
                }}
              />
            </div>
            <div
              className="d-flex justify-content-between mt-3 align-items-center"
              style={{ minWidth: '300px' }}
            >
              <span className="text-light px-4">To</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className=" px-3 bg-dark form-control gold"
                style={{
                  color: 'hsl(42, 100%, 50%)',
                  width: '250px',
                  border: '2px solid hsl(42,100%,50%)'
                }}
              />
            </div>
          </div>
          <div className="search-bar mx-3 mt-3">
            <input
              type="text"
              placeholder="Search by title"
              className="py-1 bg-dark text-white ps-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderRadius: "5px", border: "0.3px solid grey" ,border:"2px solid hsl(42,100%,50%)"}}
            />
          </div>
        </div>

        <div className="w-100 d-flex justify-content-around align-items-center flex-wrap">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="card m-3 d-flex flex-column"
              style={{
                width: '300px',
                border: '2px solid hsl(42,100%,50%)',
              }}
            >
              <img className="w-100" src={item.poster_path} style={{ height: '300px' }} />
              <div className="info bg-dark  text-white d-flex flex-column">
                <div
                  className="w-100 ps-3 text-white h5 text-center pt-3"
                  style={{ fontWeight: '700', color: 'black' }}
                >
                  {item.original_title}
                </div>
                <div className="w-100 d-flex align-items-center flex-wrap">
                  {
                    (item.genres).map((data) => (
                      <div className="badge bg-primary my-2 mx-2">{data}</div>
                    ))
                  }
                </div>
                <div className="w-100 d-flex align-items-center flex-row-reverse justify-content-between">
                  <div className="badge bg-danger mx-2">{item.contentType}</div>
                </div>
                <div className="w-100 d-flex align-items-center">
                  <span className="ps-3">Release Date : </span>
                  <div className="badge bg-success mx-4">{item.first_aired}</div>
                </div>
                <div className="w-100">
                  <button
                    className="btn bg-secondary text-white m-2 mx-2"
                    onClick={() => openModal(index)}
                  >
                    Know More
                  </button>
                </div>
              </div>
              <CustomModal className="bg-dark"
                showModal={showModal[index] || false}
                closeModal={() => closeModal(index)}
              >
                <div className="bg-dark">
                  <img src={item.backdrop_path} alt="" style={{width:"100%",height:"200px"}}/>
                  <p className="text-white">{item.overview}</p>
                </div>
              </CustomModal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MyComponent;