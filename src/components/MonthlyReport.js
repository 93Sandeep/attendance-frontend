import React, {useState,useEffect} from "react";
import axios from "axios";
import DatePickerComponents from "./DatePickerComponents";
import '../Css/MonthlyReport.css'

const MonthlyReport = () => { 

  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(['All Employee']);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    
  const formatDate = (date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}_${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
  };
  
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
  
    const formattedFromDate = formatDate(selectedDate); 
    const formattedToDate = formatDate(selectedDate);  
    const empCode = selectedEmployee[0]; 
  
    try {
      const response = await axios.get(`http://localhost:8000/users/monthlyreport`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user')}`,
        },
        data: { fromDate: formattedFromDate, toDate: formattedToDate, empCode },
      });
      console.log('Monthly Report API Response:', response);
  
      if (response.data && response.data.monthlyReport) {
        setData(response.data.monthlyReport || []);  
      } else {
        console.error('Invalid response format:', response);
        setError(`Invalid response format. Please check the API response: ${JSON.stringify(response.data)}`);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching monthly report data:', error);
  
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError('An error occurred while fetching data. Please try again.');
      }
  
      setLoading(false);
    }
  };
  


  
  useEffect(() => {
    fetchData();
  }, [selectedDate]);
  

  const handleViewReport = () => {
    if (data && data.length > 0) {
      const selectedEmployeeCodes = selectedEmployee;

      const filteredEmployeeData = data.filter(item =>
        selectedEmployeeCodes.includes(item.empCode)
      );

      setFilteredData(filteredEmployeeData);
    }
  };

  console.log("--here check reponsive-->", data);

  return (
    <div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          
      <div>
        <DatePickerComponents
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />

        <button onClick={fetchData}>Fetch Data</button>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => setSortBy('monthDate')}>Month Date</th>
            <th onClick={() => setSortBy('empCode')}>Emp. Code</th>
            <th onClick={() => setSortBy('name')}>Name</th>
          </tr>
        </thead>
        <tbody>

          {data  ? (
    data.map((item) => (
      <tr key={item.id}>
        <td>{item.MonthDate}</td>
        <td>{item.EmpCode}</td>
        <td>{item.Name}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3">No data available</td>
    </tr>
  )}
        </tbody>
      </table>

    
      <p>Selected Employees: {selectedEmployee.length}</p>

      <button
        disabled={selectedEmployee.length === 0}
        onClick={handleViewReport}
      >
        View Report
      </button>

    </div>
  );

}

export default MonthlyReport;