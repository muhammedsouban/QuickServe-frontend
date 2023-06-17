import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsChevronRight } from 'react-icons/bs';
import { isSameDay } from 'date-fns';
import toast from 'react-hot-toast';

const TimeShedule = ({ onClose, modal, payment, onTimeSelection, selectedAddress, action }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const Address = selectedAddress.map((address) => address.address);
    setAddress(Address);
  }, [selectedAddress]);

  const handleGoBack = () => {
    onClose();
    action()
  };

  const handleAddress = () => {
    modal();
    onClose();
  };

  const handleProceedToPayment = () => {
    if (selectedDate && selectedTime && address.length > 0 && address !=='') {
      payment();
      onTimeSelection(selectedDate, selectedTime);
    } else {
  if (!selectedDate) {
        toast.error('Please select a date.');
      } else if (!selectedTime) {
        toast.error('Please select a time.');
      }
      toast.error('Please select an address.');

    }
  };


  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const renderDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    const getDayOfWeek = (date) => {
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      return days[date.getDay()];
    };

    const dates = [
      { date: today, label: getDayOfWeek(today) },
      { date: tomorrow, label: getDayOfWeek(tomorrow) },
      { date: dayAfterTomorrow, label: getDayOfWeek(dayAfterTomorrow) }
    ];

    return dates.map((item) => (
      <div
        key={item.date.toString()}
        className={`border ${selectedDate && isSameDay(selectedDate, item.date) ? 'bg-blue-900 text-white' : 'bg-white text-black'
          } text-center h-20 w-20 rounded-md`}
        onClick={() => handleDateSelection(item.date)}
      >
        <h2 className="mt-5">{item.label}</h2>
        <h2>{item.date.getDate()}</h2>
      </div>
    ));
  };

  const renderTimes = () => {
    const availableTimes = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const isToday = selectedDate && isSameDay(selectedDate, new Date());
    const startIndex = isToday ? Math.max(0, currentHour - 8) : 0;

    return availableTimes.slice(startIndex).map((time) => (
      <div
        key={time}
        className={`h-8 w-16 rounded-md mb-2 text-center ${selectedTime === time ? 'bg-blue-900 text-white' : 'bg-white text-black'}`}
        onClick={() => handleTimeSelection(time)}
      >
        <p className="py-1 text-sm">{time}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className='flex justify-center items-center absolute left-0 right-0 bottom-0 top-0'>
        <div className="  bg-[#E8F5FF]  px-6 py-4 rounded-lg shadow-lg">
          <div className="flex justify-between">
            <button className="top-0 relative left-5" onClick={handleGoBack}>
              <BiArrowBack size={20} />
            </button>
            <h1 className="text-2xl text-center">Schedule Professionals</h1>
            <div></div>
          </div>

          <div onClick={handleAddress} className="flex justify-center py-4">
            <div style={{ background: '#C2EDFF' }} className="relative h-10 w-full mx-8">
              <h2 className="p-2.5 max-w-[320px] overflow-hidden truncate">
                {address && address.length > 0 ? address : 'No address selected'} </h2>
              <BsChevronRight size={20} className="absolute right-2 top-2.5" />
            </div>
          </div>
          <div className="grid ms-8 gap-x-0 grid-cols-3">
            {renderDates()}
          </div>
          <div className="text-start ms-8 py-5">
            <h2 className="font-semibold">Select start time</h2>
            <span className="text-xs">Your service will take</span>
          </div>

          <div className="grid grid-cols-4 gap-2 mx-8 mb-5 text-black">
            {renderTimes()}
          </div>
          <div className="flex">
            <button
              onClick={handleProceedToPayment}
              type="submit"
              className="w-full mx-8 text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mb-5 py-2.5 text-center"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default TimeShedule;
