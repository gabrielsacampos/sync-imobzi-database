require('dotenv').config();
const axios = require('axios');
const urlLeases = () => {return 'https://api.imobzi.app/v1/leases?smart_list=all'};
const urlLeaseDetails = (leaseDbId) => {return `https://api.imobzi.app/v1/lease/${leaseDbId}`};

let formatHeader = cursor => { return {
	headers: {
			'X-Imobzi-Secret': process.env.API_IMOBZI,
			'Content-Type': 'application/json'
			},
	 params:
			{
				cursor: cursor
			}
	}
}	
const getMultipleBeneficiariesIds = (lease) => {
	let result = '';
	let beneficiaries = lease.beneficiaries;
	
		for(item in beneficiaries){
			item == 0 ? '': result += ", "
			result += beneficiaries[item].db_id; 
		}	
	return result;	
}

const getMultipleSponsorsIds = (sponsors) => {
	let result = '';
		for(item in sponsors){
			item == 0 ? '': result += ", "
			result += sponsors[item].db_id;
		}	
	
	
	return result;	
}

function wait(seconds) {
	return new Promise(resolve => {
		setTimeout(resolve, seconds * 1000)
	})
}

const getAllLeasesIds = async () => {
	try{
		console.log("=============================================")
		console.log("R U N N I N G getAllLeasesIds...")
		console.log("=============================================")
		const allDataResponse = [];
		let newCursor = null; // to gett the ids, we also need to handle with pagination.
		
		
		let response = await axios.get(urlLeases(), formatHeader())
		allDataResponse.push(...response.data.leases);
		newCursor = response.data.cursor
		

			while(newCursor){
			
				response = await axios.get(urlLeases(), formatHeader(newCursor))
				allDataResponse.push(...response.data.leases);
				newCursor = response.data.cursor;
			}
		
		
		const allLeasesIds = [];

			for(let data of allDataResponse){
				allLeasesIds.push(data.db_id)
			console.log(allLeasesIds.length, ' stored')
			} 
		
		return allLeasesIds
		
	}catch(error){
		if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
		  } else if (error.request) {
				console.log(error.request);
		  } else {
				console.log('Error', error.message);
		  }
		  console.log(error.config);
		;
	}
}

const getLeasesMainData = async () => {
	try{	
		console.log("=============================================")
		console.log("R U N N I N G getAllLeasesMainData...")
		console.log("=============================================")
		const allLeasesIds = await getAllLeasesIds();
		let allLeasesPromises = []

		let i = 0;
		for (item in allLeasesIds) {
			
			allLeasesPromises.push(axios.get(urlLeaseDetails(allLeasesIds[item]), formatHeader())
									.then(result => result.data)
									.catch((error)=> {
										if (error.response) {
											console.log(error.response.data);
											console.log(error.response.status);
											console.log(error.response.headers);
									  } else if (error.request) {
											console.log(error.request);
									  } else {
											console.log('Error', error.message);
									  }
									  console.log(error.config);
									;
									})
			)
			console.log('got ', ++i, 'lease(s)')
			await wait(0.5)
		}
		allLeasesResolved = await Promise.all(allLeasesPromises)


		const leasesMainData = [];
		for(lease of allLeasesResolved){
			leasesMainData.push({
				id: lease.db_id,
				status: lease.status,
				code_imobzi: lease.code,
				start_at: lease.start_at.substr(0, 10),
				duration: lease.duration,
				property: lease.property.db_id,
				fee: lease.management_fee.percent,
				guarantee_type: lease.guarantee?lease.guarantee.guarantee_type:"no guarantee",
				guarantee_value: lease.guarantee? parseFloat(lease.guarantee.details.value):null,
				annual_readjustment: lease.annual_readjustment? lease.annual_readjustment.name : null,
				irrf: lease.irrf,
				include_in_dimob: lease.include_in_dimob,
				indeterminate: lease.indeterminate,
				lease_value: lease.value,
			})
		}

	
		return leasesMainData;
	
	}catch(error){
		if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
		  } else if (error.request) {
				console.log(error.request);
		  } else {
				console.log('Error', error.message);
		  }
		  console.log(error.config);
		;
	}
}

module.exports = { getAllLeasesIds, getLeasesMainData }