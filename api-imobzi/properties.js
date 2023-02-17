const axios = require('axios');
require('dotenv').config();

const urlProperties = () => {
	return 'https://api.imobzi.app/v1/properties'
};
const urlPropertyDetails = (propertyDbId) => {
	return `https://api.imobzi.app/v1/property/${propertyDbId}`
}
let formatHeader = (smartList = null, cursor = null) => { return {
	headers: {
			'X-Imobzi-Secret': process.env.API_IMOBZI,
			'Content-Type': 'application/json'
			},
	 params:
			{
				"smart_list": smartList,
				cursor: cursor
			}
	}
}	
const smartListUnavailable = 'unavailable_properties';
const smartListAvailable = 'all'

function wait(seconds) {
	return new Promise(resolve => {
		setTimeout(resolve, seconds * 1000)
	})
}



const getAllpropertiesIds = async () => {
	try{
		

		const allPropertiesResponse = [];


		//getting data from UNavailables properties
		let response = await axios.get(urlProperties(), formatHeader(smartListUnavailable));
		let responseProperties = response.data.properties
		let newCursor = response.data.cursor
		allPropertiesResponse.push(...responseProperties)
		
		
		//pushing, getting and pushing data from UNavailables properties while pagination exists
		while(newCursor){
			response = await axios.get(urlProperties(), formatHeader(smartListUnavailable, newCursor));
			responseProperties = response.data.properties
			newCursor = response.data.cursor
			allPropertiesResponse.push(...responseProperties)
			console.log(allPropertiesResponse.length, ' stored')
			
		}
		

		//getting data from availables properties
		response = await axios.get(urlProperties(), formatHeader(smartListAvailable));
		responseProperties = response.data.properties
		newCursor = response.data.cursor
		allPropertiesResponse.push(...responseProperties)
		

		//pushing, getting and pushing data from availables properties while pagination exists
		while(newCursor){
			response = await axios.get(urlProperties(), formatHeader(smartListAvailable, newCursor));
			responseProperties = response.data.properties
			newCursor = response.data.cursor
			allPropertiesResponse.push(...responseProperties)
			console.log(allPropertiesResponse.length, ' stored')
			
		}
		
		
		const allPropertiesIds = [];

		for( property of allPropertiesResponse){
			allPropertiesIds.push(parseInt(property.db_id))
			console.log('got ', allPropertiesIds.length, 'properties Ids')
		}

		return allPropertiesIds

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

const getPropertiesMainData = async () => {
	const allPropertiesIds = await getAllpropertiesIds();
	const propertiesMainData = [];

	console.log('now, we gonna filter the main data from each property')
		for(i in allPropertiesIds){
			propertiesMainData.push(
				axios.get(urlPropertyDetails(allPropertiesIds[i]), formatHeader())
					.then(result => {
						const property = result.data;
						return {
							id: parseInt(property.db_id),
							type: property.property_type,
							active: property.active,
							status: property.status,
							address: property.address + ' ' + 
									property.address_complement + ', ' + 
									property.neighborhood,
							building: property.building_name,
							area: property.area,
							bedroom: property.bedroom,
							suite: property.suite,
							garage: property.garage,
							city: property.city,
							zipcode: property.zipcode,
							rental_value: property.rental_value,
							sale_value: property.sale_value,
							alternative_id: property.alternative_code
						}
					})
			) 
	
			console.log(propertiesMainData.length, ' propety(ies) done')
			await wait(0.5)
	
		}

		const finallyPropertiesMainData = await Promise.all(propertiesMainData)
		console.log(finallyPropertiesMainData)
		return finallyPropertiesMainData;
}

module.exports = { getPropertiesMainData, getAllpropertiesIds };


