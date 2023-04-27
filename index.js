const HID = require("node-hid");
let devices = HID.devices();
let path;
let manu;
let venID;
let prodID;
let serNum;
let prod;
let device;
let found = 0;

// console.log(devices);

for (let i = 0; i < devices.length; i++) {
  console.log(devices[i]);
  if (devices[i].manufacturer === "BlackBox") {
    console.log("Blackbox");
    path = devices[i].path;
    manu = devices[i].manufacturer;
    venID = devices[i].vendorId;
    prodID = devices[i].productId;
    serNum = devices[i].serialNumber;
    device = new HID.HID(path);
    showDevice();
    found = 1;
  }
}

if(found === 0){
  console.log("No devices found");
}

function showDevice() {
  console.log(path, manu, venID, prodID, parseInt(serNum));
  device.on("data", function (data) {
    console.log(String(data));
    // let test = JSON.parse(data);

    // console.log(JSON.parse(data));

    // if(test.cmd === "test") {
    //   console.log("Command is btn pressed!");
    // } else {
    //   console.log("Unknown command");
    // }

    // console.log(data);
  });
  
  device.on("error", function (err) {
    console.log(err);
  });
}



function hex_to_ascii(str1) {
  var hex = str1.toString();
  var str = "";
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}