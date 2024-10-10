import React, { useEffect, useState } from "react";
import Select from "react-select";
import DistrictBlockSchoolService from "../services/DistrictBlockSchoolService";

export default function DependentDropComponent({
  setDistrict = () => {},
  setBlock = () => {},
  setSchool = () => {},
}) {
  const [districtList, setDistrictList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");

  //Fetching district by calling the api in DistricBlockSchoolService which in return calls the api in  backend.
  const fetchDistrict = async () => {
    try {
      const response = await DistrictBlockSchoolService.getDistricts();
      setDistrictList(response.data.data);
    } catch (error) {
      console.log("Error Occured fetching districts from the db", error);
    }
  };

  //Fetching blocks by calling the api in DistrictBlockSchoolService.js

  const fetchBlock = async () => {
    try {
      const response = await DistrictBlockSchoolService.getBlocks();
      setBlockList(response.data.data);
    } catch (error) {
      console.log("Error fetching Posts", error);
    }
  };

  const fetchSchool = async () => {
    try {
      const response = await DistrictBlockSchoolService.getSchools();
      setSchoolList(response.data.data);
    } catch (error) {
      console.log("Error fetching Posts", error);
    }
  };

  useEffect(() => {
    fetchDistrict();
    fetchBlock();
    fetchSchool();
  }, []);

  // Convert district data into the format that react-select expects
  //    object = [
  //     {value: id_1, label: name1},
  //     {value: id_2, label: name2}
  //    ]

  const handleDistirctChange = (selectedOption) => {
    setSelectedDistrict(selectedOption.value);
    setDistrict(selectedOption.label);
    // Reset block selection
  }; //this is one of the method of getting selected value from react-select tage

  const handleBlockChange = (selectedOption) => {
    setSelectedBlock(selectedOption.value);
    setBlock(selectedOption.label);
  };

  const handleSchoolChange = (selectedOption) => {
    setSchool(selectedOption.label);
  };

  const filteredBlock = blockList.filter(
    (eachBlock) => eachBlock.d_id === selectedDistrict
  );
  //   console.log(filteredBlock) //this logic gives the new filtered array from the block array for the dynamic change in drop down after the user has selected the district.

  const filteredSchool = schoolList.filter(
    (eachSchool) => eachSchool.b_id === selectedBlock
  );
  //   console.log(filteredSchool);//this logic gives the new filtered array from the school array for the dynamic change in drop down after the user has selected the block.


  const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        border: '3px solid grey',
        height: '50px',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s',
        backgroundColor: 'white',
        width: '35%', // Set width as a percentage
        maxWidth: '500px', // Limit max width to avoid excessive stretching
        margin: '0 auto', // Center horizontally
        '&:hover': {
          borderColor: 'black',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'grey',
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
      '&:hover':{
        backgroundColor:'teal'
      },
      
    }),
  };




  return (
    <div style={{ display: '', flexDirection: 'column', alignItems: 'center' }}>
     
        <label>Select District</label>
       
        <Select
          placeholder="Select District"
          options={districtList.map((d) => ({
            value: d.d_id,
            label: d.d_name,
            
          }))}
          onChange={handleDistirctChange} styles={customStyles}
          
        />
      

    
        <label>Select Block</label>
    
        <Select
        placeholder='Select Block'
          onChange={handleBlockChange}
          options={filteredBlock.map((b) => ({
            value: b.b_id,
            label: b.b_name,
          }))}
          
          styles={customStyles} />
      
        <label>Select School</label>
       
        <Select
        placeholder='Selct School'
          onChange={handleSchoolChange}
          options={filteredSchool.map((s) => ({
            value: s.b_id,
            label: s.s_name,
          }))}
         
          styles={customStyles}   />
   
    </div>
  );
}
