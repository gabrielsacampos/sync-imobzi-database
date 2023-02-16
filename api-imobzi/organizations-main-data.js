require('dotenv').config()
const axios = require('axios');
const urlAllContacts = 'https://api.imobzi.app/v1/contacts';

const organizationDetails = (organizationId) => { return `https://api.imobzi.app/v1/organization/${organizationId}`} 

const formatHeader = (cursor = null) => { return {
	headers: {
			'X-Imobzi-Secret': process.env.API_IMOBZI,
			'Content-Type': 'application/json'
			},
	 params:
			{
				cursor: cursor
			}
	}};


const allContactsIds = require('./contacts-ids')

const scrollingPhones = (phoneArray) => {
	let result = '';
	for(item in phoneArray){
		result += ' ,'
		result += phoneArray[item].phone.number
	}
}

const scrollingemails = (emailArray) => {
	let result = '';
	for(item in emailArray){
		result += ' ,'
		result += emailArray[item]
	}
}

const getOrganizationAddresses = (organizationData) => {
	const arrayOrganizationFullAdress = organizationData.fields.group_address;
	const address = arrayOrganizationFullAdress[0][0].value;
	const complement = arrayOrganizationFullAdress[1][0].value;
	const zipcode = arrayOrganizationFullAdress[4][1].value;
	let fullAddress = '';

	address? fullAddress += address : ''
	complement? fullAddress += ', ' + complement : ''
	zipcode? fullAddress += ' - ' + zipcode : ''

	return fullAddress
} 

// the imobzi API do not support fast requests. So, let's set a few seconds between them. 
function wait(seconds) {
		return new Promise(resolve => {
			setTimeout(resolve, seconds * 1000)
		})
}





const getOrganizationMainData = async () => {
	try{ 
		
		const {allOrganizationsIds}= await allContactsIds;
		console.log("================================================")
		console.log("R U N N I N G getOrganizationMainData function...")
		console.log("================================================")

		let organizationsMainData = [];
		for(index in allOrganizationsIds){
		axios.get(organizationDetails(allOrganizationsIds[index]), formatHeader())
			.then(result => { 
				const organization = result.data; // property path to data from organization
				organizationsMainData.push(
					{
						id: organization.db_id,
						name: organization.name,
						cnpj: organization.fields.group_company_data[4][0].value,
						representative: organization.persons.length > 0 ? organization.persons[0].person_id: null,
						representative_type: organization.persons.length > 0 ? organization.persons[0].associate_type : null, //this API do not use People, but persons LOL
						phone: organization.phone? organization.phone.number : "please, set an email at Imobzi",
						email: organization.email? organization.email : "please, set an email at Imobzi",
						address: getOrganizationAddresses(organization)
						
					}
				)
				console.log( organizationsMainData.length, '/', allOrganizationsIds.length, "organizations data treated")
				console.log(((organizationsMainData.length/allOrganizationsIds.length)*100).toFixed(2), "% concluded")
				console.log("----------------------------------------")
			})
			.catch((error) => {
				console.log(error)
				
			})
		
	
		await wait(0.8)
		
	}
	console.table(organizationsMainData)
	return await Promise.all(organizationsMainData);


}catch(error) {
	onsole.log("E R R O R  - SOMETING WENT WRONG");
     if (error.response) {
       console.log(error.response.data);
       console.log(error.response.status);
     } else if (error.request) {
       console.log(error.request);
     } else {
       console.log("Error", error.message);
     }
     console.log(error.config);
     return error.message;
   }
}


module.exports =  getOrganizationMainData()