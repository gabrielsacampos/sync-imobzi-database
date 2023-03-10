require('dotenv').config();
const axios = require('axios');
const urlLeases = () => {return 'https://api.imobzi.app/v1/leases?smart_list=all'};

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


function wait(seconds) {
	return new Promise(resolve => {
		setTimeout(resolve, seconds * 1000)
	})
}

const getPersonTenants = async () => {
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
		
		
		const tenantPerson = [];

			for(const item in allDataResponse){
				const lease = allDataResponse[item]
				const tenant = lease.tenants[0];
				
				if(tenant.type == "person") tenantPerson.push({tenant: tenant.db_id, lease: lease.db_id})
			} 
			console.log(tenantPerson.length, "tenants as person found!")
		
		return tenantPerson
		
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

module.exports = { getPersonTenants }