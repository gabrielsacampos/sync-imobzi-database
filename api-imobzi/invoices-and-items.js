const axios = require('axios');
require('dotenv').config()
const urlInvoices = (page = 1) => {return `https://api.imobzi.app/v1/invoices?page=${page}`} 
const urlInvoiceDetail = (invoiceId) => {return `https://api.imobzi.app/v1/invoice/${invoiceId}`}

const now = new Date();
const todayDate = now.toISOString().substring(0,10)

const formatHeaderInvoice = () => { 
	return {
		headers: {
			'X-Imobzi-Secret': process.env.API_IMOBZI,
			'Content-Type': 'application/json'
		}
	}
}

const formatHeaderAllInvoices = (statusInvoice = "all", startAt = "2022-08-01", /*endAt = todayDate*/) => { 
	return {
		headers: {
			'X-Imobzi-Secret': process.env.API_IMOBZI,
			'Content-Type': 'application/json'
		},
		params: {
			"order_by" : "date",
			"sort_by" : "desc",
			"status" : statusInvoice,
			"start_at" : startAt,
			"end_at" : "2023-12-31",//endAt,
			// "page": 1,
			"contract_type" :"all",
		}
	}
}

function wait(seconds) {
	return new Promise (result => {
		setTimeout(result, seconds * 1000)
	})
}

const getInvoicesIds = async () => {
	console.log("================================")
	console.log("R U N N I N G   getInvoicesIds....")
	console.log("================================")
	const invoices = [];
	
	let i = 0;
	let response;
	do{
		response = await axios.get(urlInvoices(++i), formatHeaderAllInvoices())
		invoices.push(...response.data.invoices);
			console.log(`${invoices.length}/${response.data.count} invoices catched - ${(invoices.length/response.data.count*100).toFixed(2)}% completed`)
	}while(response.data.next_page)

	
	console.log("storing invoices ids...")
	const invoicesIds = [];
	invoices.forEach(element => {
		invoicesIds.push(element.invoice_id)
		console.log("id: ",element.invoice_id, " stored")
	})
	console.log(invoicesIds.length, " ids from ", invoices.length, " invoices")
	return invoicesIds;
}

const getInvoicesDetails = async () => {
	const invoicesIds = await getInvoicesIds();
	
	console.log("======================================")
	console.log("R U N N I N G  getInvoicesDetails...")
	console.log("======================================")
	
	const invoicesDetails = [];
	for(i in invoicesIds){
		invoicesDetails.push(axios.get(urlInvoiceDetail(invoicesIds[i]), formatHeaderInvoice())
								.then(result => { 
									return {
										id: result.data.invoice_id,
										status: result.data.status,
										reference: result.data.reference_start_at,
										due_date: result.data.due_date,
										lease_id: result.data.lease.db_id,
										management_fee: result.data.onlendings_and_fees.management_fee_value,
										invoice_url: result.data.invoice_url,
										barcode: result.data.barcode,
										bank_slip_url: result.data.bank_slip_url,
										bank_slip_id: result.data.bank_slip_id,
										total_value: result.data.value,
										interest_value: result.data.interest_value, 
										paid_at: result.data.paid_at,
										paid_manual: result.data.invoice_paid_manual,
										bank_fee_value: result.data.charge_fee_value, 
										account_credit: result.data.account? result.data.account.name: null, //only exists if onlanding has been done. 
										onlending_value: result.data.onlendings_and_fees.predicted_onlending_value
									};
								}).catch((error) => console.log(error.message))
							)
		console.log(`${invoicesDetails.length} formated invoices`)	

		await wait(0.5)				
	}

	
	return await Promise.all(invoicesDetails)
}

const getAllItems = async (invoice) => {
	const invoicesIds = await getInvoicesIds();


	const itemsDetails = [];
	for(i in invoicesIds){
		axios.get(urlInvoiceDetail(invoicesIds[i]), formatHeaderInvoice())
			.then(result => { return result.data})
			.then(result => {
				result.items.forEach((element) => {
					itemsDetails.push({
						id: element.invoice_item_id,
						invoice_id: result.invoice_id, //verificar como colocar o invoice_id real; 
						description: element.description,
						behavior: element.behavior,
						include_in_dimob: element.include_in_dimob,
						management_fee: element.charge_management_fee,
						value: element.value,
					});
					// console.log({id: element.invoice_item_id,
					// 	invoice_id: result.invoice_id, 
					// 	description: element.description,
					// 	behavior: element.behavior,
					// 	include_in_dimob: element.include_in_dimob,
					// 	management_fee: element.charge_management_fee,
					// 	value: element.value, })
				})
				console.log(itemsDetails.length, " item(s) found")
			})
			.catch((error) => console.log(error.nessage))
			await wait(0.5)
	}
	return await Promise.all(itemsDetails);
}






module.exports = { getInvoicesDetails, getAllItems, getInvoicesIds}