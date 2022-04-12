// const renderString = (address) => {
//   let adr = "";
//   const keyList = Object.keys(address);
//   // check object empty
//   if (keyList.length === 0) return "";
//   // for => check value = ""
//   for (let i = 0; i < keyList.length; i++) {
//     if (address[keyList[i]] !== "" && i !== keyList.length - 1) {
//       adr += address[keyList[i]] + ", ";
//     }
//     if (i === keyList.length - 1) {
//         adr += address[keyList[i]];
//       }
//   }
//   // return string
//   console.log(adr);
//   return adr;
// };

const renderString = (address) => {
  const valueList = Object.values(address);
  const newValueList = valueList.filter((word) => word != "");
  return newValueList.join(", ");
};

const address = {
  district: "Tan Phu",
  street: "Nguyen Cong Tru",
  number: 1,
  ward: "",
  city: "HCM",
};

const renderString2 = (address) => {
  const defaultAddress = {
    number: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  };

  const keyList = Object.keys(address);
  for (const key in defaultAddress) {
    if (keyList.includes(key)) {
      defaultAddress[key] = address[key];
    }
  }
  const valueList = Object.values(defaultAddress);
  const newValueList = valueList.filter((word) => word != "");
  const result = newValueList.join(", ");
  console.log("result :>> ", result);
  return result;
};

renderString2(address);
