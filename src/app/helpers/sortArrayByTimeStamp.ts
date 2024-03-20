const sortArrayByTimestamp = (data) => {
    return data.sort((item1, item2) => {
      const timestamp1 = new Date(item1.timestamp);
      const timestamp2 = new Date(item2.timestamp);
  
      return timestamp1 - timestamp2;
    });
  };

  export default sortArrayByTimestamp;