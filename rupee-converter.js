export const rupeeConverter = (n) => {
  if(!n){
    return 0
  }
  n = n.toString();
  const isNegative = n.includes("-");
  n = n.replace("₹", "");
  n = n
    .split("")
    .filter((e) => e !== ",")
    .join("");
  n = n.split(".")[0];
  n = Math.abs(parseInt(n)).toString();
  if (isNaN(n)) {
    n = 0;
  }
  let currency;
  if (window.innerWidth < 640) {
    if (n.length > 3 && n.length <= 5) {
      n = Math.abs(parseInt(n)/1000).toFixed(2);
      if(parseInt(n.split(".")[1]) !== 0)
        n += "k";
      else
        n = n.split(".")[0] + "k"
    }
    else if (n.length > 5 && n.length <= 7) {
      n = Math.abs(parseInt(n)/100000).toFixed(2)
      if(parseInt(n.split(".")[1]) !== 0)
        n += "L";
      else
        n = n.split(".")[0] + "L"
    }
    else if (n.length > 7) {
      n = Math.abs(parseInt(n)/10000000).toFixed(2)
      if(parseInt(n.split(".")[1]) !== 0)
        n += "Cr";
      else
        n = n.split(".")[0] + "Cr"
    }
    currency = "₹" + n;
  } else {
    currency = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n);
    currency = currency.split(".")[0];
  }
  currency = currency[0] + (isNegative ? "-" : "") + currency.slice(1);
  return currency;
};

export const rupeeConverterMobile = (n) => {
  if(!n){
    return 0
  }
  n = n.toString();
  const isNegative = n.includes("-");
  n = n.replace("₹", "");
  n = n
    .split("")
    .filter((e) => e !== ",")
    .join("");
  n = n.split(".")[0];
  n = Math.abs(parseInt(n)).toString();
  if (n.length > 3 && n.length <= 5) {
    n = n.slice(0, n.length - 3);
    n += "k";
  }
  if (n.length > 5 && n.length <= 7) {
    n = n.slice(0, n.length - 5);
    n += "L";
  }
  if (n.length > 7) {
    n = n.slice(0, n.length - 7);
    n += "Cr";
  }
  n = (isNegative ? "-₹" : "₹") + n;
  return n;
};

export const rupeeConverterFull = (n) => {
  if(!n){
    return 0
  }
  n = n.toString();
  const isNegative = n.includes("-");
  n = n.replace("₹", "");
  n = n
    .split("")
    .filter((e) => e !== ",")
    .join("");
  let currency;
  n = n.split(".")[0];
  n = Math.abs(parseInt(n)).toString();
  if (isNaN(n)) {
    n = 0;
  }
  currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(n);
  currency = currency.split(".")[0];
  currency = currency[0] + (isNegative ? "-" : "") + currency.slice(1);
  return currency;
};


