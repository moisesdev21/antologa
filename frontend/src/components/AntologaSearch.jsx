import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, X, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function AntologaSearch({ discoverActiveTab }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('destinations');
  const [searchLocation, setSearchLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Determinar si mostrar los tabs - NO mostrar en discover routes
  const shouldShowTabs = !location.pathname.startsWith('/discover');

  // Usar el tab activo de discover si estamos en discover, sino usar el local
  const currentActiveTab = location.pathname.startsWith('/discover') 
    ? discoverActiveTab 
    : activeTab;

  const locations = [
    'New York, NY',
    'New York, Manhattan, New York, NY',
    'New Zealand',
    'Newark, NJ'
  ];

  const filteredLocations = locations.filter(loc =>
    loc.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(selectedDate);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      if (selectedDate > checkInDate) {
        setCheckOutDate(selectedDate);
      } else {
        setCheckInDate(selectedDate);
        setCheckOutDate(null);
      }
    }
  };

  const isDateInRange = (day) => {
    if (!checkInDate || !checkOutDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > checkInDate && date < checkOutDate;
  };

  const isDateSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (checkInDate && date.getTime() === checkInDate.getTime()) ||
           (checkOutDate && date.getTime() === checkOutDate.getTime());
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const totalGuests = adults + children + infants;

  const handleSearch = () => {
    // Lógica de búsqueda que depende del tab activo
    const searchData = {
      type: currentActiveTab, // 'destinations' o 'experiences'
      location: searchLocation,
      checkInDate,
      checkOutDate,
      rooms,
      adults,
      children,
      infants
    };

    console.log('Searching...', searchData);

    // Aquí puedes agregar lógica específica para cada tipo de búsqueda
    if (currentActiveTab === 'destinations') {
      // Lógica para buscar destinos/hoteles
      console.log('Buscando destinos...');
    } else if (currentActiveTab === 'experiences') {
      // Lógica para buscar experiencias/actividades
      console.log('Buscando experiencias...');
    }

    // También puedes hacer navegación basada en el tipo de búsqueda
    // Por ejemplo:
    // if (currentActiveTab === 'destinations') {
    //   navigate('/search/destinations', { state: searchData });
    // } else {
    //   navigate('/search/experiences', { state: searchData });
    // }
  };

  return (
    <div className="col-start-3 col-span-8 w-full">
      {/* Tabs - Se muestran en TODAS las rutas EXCEPTO discover */}
      {shouldShowTabs && (
        <div className="flex gap-8 mb-6 justify-center">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`text-lg font-medium pb-2 ${
              activeTab === 'destinations'
                ? 'text-white border-b-2 border-white'
                : 'text-white opacity-70'
            }`}
          >
            Destinations
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`text-lg font-medium pb-2 ${
              activeTab === 'experiences'
                ? 'text-white border-b-2 border-white'
                : 'text-white opacity-70'
            }`}
          >
            Experiences
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="flex items-center gap-4">
          {/* Location - Puedes personalizar el placeholder según el tab activo */}
          <div className="flex-1 relative">
            <div className="flex items-center gap-3 px-4 py-3 border-r border-gray-200">
              <MapPin className="w-5 h-5 text-[#078282]" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  {currentActiveTab === 'destinations' ? 'Destination' : 'Activity Location'}
                </div>
                <input
                  type="text"
                  placeholder={currentActiveTab === 'destinations' ? 'Add destination' : 'Where to find experiences'}
                  value={searchLocation}
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                    setShowLocationDropdown(true);
                  }}
                  onFocus={() => setShowLocationDropdown(true)}
                  className="w-full text-sm text-gray-600 outline-none placeholder-gray-400"
                />
              </div>
              {searchLocation && (
                <button
                  onClick={() => {
                    setSearchLocation('');
                    setShowLocationDropdown(false);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Location Dropdown */}
            {showLocationDropdown && filteredLocations.length > 0 && (
              <div className="absolute top-full mt-2 left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                {filteredLocations.map((loc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{loc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Check In */}
          <div className="flex-1 relative">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowGuestPicker(false);
              }}
              className="flex items-center gap-3 px-4 py-3 border-r border-gray-200 w-full text-left"
            >
              <Calendar className="w-5 h-5 text-[#078282]" />
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  {currentActiveTab === 'destinations' ? 'Check in' : 'Start Date'}
                </div>
                <div className="text-sm text-gray-600">
                  {checkInDate ? formatDate(checkInDate) : 'Add dates'}
                </div>
              </div>
            </button>
          </div>

          {/* Check Out */}
          <div className="flex-1 relative">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowGuestPicker(false);
              }}
              className="flex items-center gap-3 px-4 py-3 border-r border-gray-200 w-full text-left"
            >
              <Calendar className="w-5 h-5 text-[#078282]" />
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  {currentActiveTab === 'destinations' ? 'Check out' : 'End Date'}
                </div>
                <div className="text-sm text-gray-600">
                  {checkOutDate ? formatDate(checkOutDate) : 'Add dates'}
                </div>
              </div>
            </button>

            {/* Date Picker */}
            {showDatePicker && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-6 w-[600px]">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="text-base font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: firstDay }, (_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const selected = isDateSelected(day);
                    const inRange = isDateInRange(day);

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        className={`aspect-square flex items-center justify-center text-sm rounded-full transition-colors ${
                          selected
                            ? 'bg-teal-600 text-white font-semibold'
                            : inRange
                            ? 'bg-teal-100 text-teal-700'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowDatePicker(false)}
                  className="mt-4 w-full py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="flex-1 relative">
            <button
              onClick={() => {
                setShowGuestPicker(!showGuestPicker);
                setShowDatePicker(false);
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-left"
            >
              <Users className="w-5 h-5 text-[#078282]" />
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-1">
                  {currentActiveTab === 'destinations' ? 'Guests' : 'Participants'}
                </div>
                <div className="text-sm text-gray-600">
                  {totalGuests > 0 ? `${totalGuests} ${currentActiveTab === 'destinations' ? 'guest' : 'participant'}${totalGuests > 1 ? 's' : ''}` : `Add ${currentActiveTab === 'destinations' ? 'guests' : 'participants'}`}
                </div>
              </div>
            </button>

            {/* Guest Picker */}
            {showGuestPicker && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4 w-80">
                <div className="space-y-4">
                  {currentActiveTab === 'destinations' && (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm text-gray-900">Rooms</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50"
                          disabled={rooms === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{rooms}</span>
                        <button
                          onClick={() => setRooms(rooms + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {currentActiveTab === 'destinations' ? 'Adults' : 'Participants'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {currentActiveTab === 'destinations' ? 'Ages 18+' : 'Ages 12+'}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setAdults(Math.max(0, adults - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50"
                        disabled={adults === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{adults}</span>
                      <button
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {currentActiveTab === 'destinations' && (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Children</div>
                          <div className="text-xs text-gray-500">Ages 2–17</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50"
                            disabled={children === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{children}</span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-gray-900">Infants</div>
                          <div className="text-xs text-gray-500">Under 2</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setInfants(Math.max(0, infants - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50"
                            disabled={infants === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{infants}</span>
                          <button
                            onClick={() => setInfants(infants + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setShowGuestPicker(false)}
                  className="mt-4 w-full py-2 text-sm text-teal-600 hover:bg-teal-50 rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-2xl transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}