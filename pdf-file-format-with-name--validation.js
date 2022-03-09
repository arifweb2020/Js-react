const invoice_num = data?.invoiceNo.replace(/[^a-zA-Z0-9 ]/g, '')
  //  console.log("last three character" + invoice_num?.slice(-3))
    console.log("last three character" + invoice_num)
    const correctFile = "Invoice_" + refId + "_" + invoice_num?.slice(-3) + ".pdf"
  //  const correctFile = "Invoice_" + refId + "_" + invoice_num?.slice(-3) + ".pdf"
    console.log("correct file" + correctFile)


Invoice_BIL211130_IDFCBL_SEP21_127.pdf





const invoice_num = data?.invoiceNo.replace(/[^a-zA-Z0-9 ]/g, '')
  //  console.log("last three character" + invoice_num?.slice(-3))
    console.log("last three character" + invoice_num)
   // const ar = 
    const correctFile1 = "Invoice_" + refId + "_".replace(/[^a-zA-Z0-9 ]/g, '') + invoice_num + ".pdf"
    const correctFile = correctFile1
  //  const correctFile = "Invoice_" + refId + "_" + invoice_num?.slice(-3) + ".pdf"
    console.log("correct file" + correctFile)
	
// working one	
const invoice_num = data?.invoiceNo
    //  console.log("last three character" + invoice_num?.slice(-3))
      console.log("last three character" + invoice_num)
      const correctFile = "Invoice_" + refId + "_" + invoice_num?.slice(-3) + ".pdf"
    //  const correctFile = "Invoice_" + refId + "_" + invoice_num?.slice(-3) + ".pdf"
      console.log("correct file" + correctFile)
