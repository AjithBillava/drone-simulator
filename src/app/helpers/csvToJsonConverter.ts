const csvToJSON = (csvString) => {
  // Split the CSV string into lines
  const lines = csvString.split("\n");
  console.log("🚀 ~ csvToJSON ~ lines:", lines)

  // Get the header row
  const header = lines[0].split(",");
  console.log("🚀 ~ csvToJSON ~ header:", header);

  // Skip the header row for data lines
  const data = lines.slice(1).map((line) => {
    const values = line.split(",");
    console.log("🚀 ~ data ~ values:", values);

    // Create an object with key-value pairs from headers and values
    const object = {};
    for (let i = 0; i < header.length; i++) {
      // Convert numeric values if possible (assuming numbers in lat/lng)
      console.log(
        "header[i]",
        header[i].trim().length,
        "timestamp".length,
        header[i].trim() === "timestamp"
      );
      if (header[i].trim() === "timestamp") {
        object[header[i]] = values[i]?.replace(/\r$/, "");
        console.log("🚀 ~ data ~ values[i:", values[i], header[i]);
      } else {
        object[header[i]] = parseFloat(values[i]) || values[i];
      }
      //   object[header[i]] = parseFloat(values[i]) || values[i];
    }
    return object;
  });

  return data;
};
export default csvToJSON;
