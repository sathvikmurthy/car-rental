import { useState, useEffect } from "react";
import Axios from "axios";
import Image from 'next/image'
import Nav from "../components/Nav";
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter()

  const [cars, setCars] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState({
    id: "",
    model: "",
    bookings: [{}],
    image: "",
    pricePerDay: 0
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")
  const [days, setDays] = useState(0);

  const getCars = () => {
    Axios.get("https://bd83-223-31-218-223.ngrok-free.app/cars/all", {
      headers: {
        'ngrok-skip-browser-warning': 'sandesh'
      }
    }).then((res) => {
      console.log(res.data);
      setCars(res.data);
    })
  }

  // const bookCar = (carid) => {
  //   Axios.post("https://8ad7-223-31-218-223.ngrok-free.app/rentals/book", {
  //     userId: 
  //     carId: carid
  //   })
  // }

  useEffect(() => {
    if(startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDays(diffDays + 1);
    } else {
      setDays(0);
    }
    getCars();
  }, [startDate, endDate])

  const openModal = (car_id) => {
    setShowModal(true)

    Axios.get(`https://bd83-223-31-218-223.ngrok-free.app/cars/${car_id}`, {
      headers: {
        'ngrok-skip-browser-warning': 'sandesh'
      }
    }).then((res) => {
      setModalData(res.data);
    })
  }

  const bookCar = (car_id) => {
    Axios.post("https://bd83-223-31-218-223.ngrok-free.app/rentals/book", {
      startDate: startDate,
      endDate: endDate,
      carId: car_id,
      userId: localStorage.getItem('id')
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'sandesh'
      }
    }).then((res) => {
      setStartDate("");
      setEndDate("");
      alert("Booking Successful!")
      router.push('/profile')
    })
  }

  return (
    <div>
      {showModal && (<BookModal />)}
      <Nav />
      <div className="flex flex-col w-full mt-[50px] items-center gap-7">
        {cars.map((car, index) => (
          <div key={index} className="w-[60%] border-2 border-black rounded-lg flex flex-row">
            <Image className="flex ml-[5px] mt-[5px] mb-[5px]" src={car.image} width={300} height={300}/>
            <div className="flex flex-col mt-[20px] ml-[100px] mb-[20px] justify-between">
              <div className="flex flex-col gap-3">
                <span className="text-black text-xl font-semibold ">Model: {car.model}</span>
                <span className="text-black text-lg font-semibold ">Price: ${car.pricePerDay}/day</span>
              </div>
              <button onClick={() => openModal(car.id)} className="flex flex-col bg-black text-white font-semibold border-0 h-9 items-center justify-center rounded-md cursor-pointer pl-[12px] pr-[12px] w-[120px]">Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function BookModal() {
    return(
      <div className="flex fixed inset-0 flex-col items-center justify-center">
        <div className="flex w-screen h-screen bg-black absolute inset-0 opacity-80"></div>

        <div className="relative bg-white z-50 w-[90%] rounded-lg h-[80%]">
          <div className="flex flex-row justify-between items-center ml-[20px] mr-[20px] mt-[20px]">
            <span className="text-2xl font-semibold">{modalData.model}</span>
            <button className="flex flex-col bg-black text-white font-semibold border-0 pl-[12px] pr-[12px] rounded-md cursor-pointer" onClick={() => setShowModal(false)}>Close</button>
          </div>
          <div className="flex flex-row w-full h-full">
            <div className="flex flex-col w-full items-center">
              <Image priority className="flex ml-[20px] mt-[20px]" src={modalData.image} width={400} height={400} />

              <span className="text-black font-medium">Choose Dates:</span>
              <div className="flex flex-row items-center gap-3 mt-[10px] mb-[20px]">
                <input onChange={(e) => setStartDate(e.target.value)} className="flex flex-col pl-[5px] pr-[5px] items-center justify-center h-[30px] border-2 rounded" type="date" placeholder="Start Date" value={startDate} />
                <span className="text-black font-semibold">-</span>
                <input onChange={(e) => setEndDate(e.target.value)} className="flex flex-col pl-[5px] pr-[5px] items-center justify-center h-[30px] border-2 rounded" type="date" placeholder="End Date" value={endDate} />
              </div>
              <span className="text-black font-semibold mb-[5px]">Price: ${modalData.pricePerDay}/day</span>
              <span className="text-black font-semibold mb-[20px]">Total Cost: ${modalData.pricePerDay * days}</span>
              <button className="flex flex-col items-center justify-center text-white bg-black font-semibold h-[30px] pl-[10px] pr-[10px] rounded cursor-pointer" onClick={() => bookCar(modalData.id)}>Book</button>
            </div>
            <div className="flex flex-col h-[80%] w-[2px] bg-black"></div>
            <div className="w-full h-full">
              <span className="flex text-black text-lg font-medium ml-[20px] mt-[20px]">Bookings</span>
              <p className="flex ml-[20px] mr-[20px] text-gray-500 text-sm mt-[5px]">This list display the already booked dates, please refer to these dates before booking.</p>

              <div className="flex flex-col items-center">
                {modalData.bookings.map((rentals, index) => (
                  <div key={index} className="flex flex-row mt-[20px] w-[60%] justify-between">
                    <span className="text-black font-medium text-base">From: {rentals.startDate}</span>
                    <span className="text-black font-medium text-base">To: {rentals.endDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}
