require('dotenv').config()
const axios = require('axios');
const urlAllContacts = 'https://api.imobzi.app/v1/contacts';

const personDetails = (personId) => {return `https://api.imobzi.app/v1/person/${personId}`};
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

	const getAllContactsIds = async () => {
		try{
	
			console.log("==============================================")
			console.log("R U N N I N G  getAllContactsIds Function...")
			console.log("==============================================")
	
			let dataFromPagination = []; 
			let response = await axios.get(urlAllContacts, formatHeader());
			let newCursor = response.data.cursor; 
			let responseContacts = response.data.contacts;
			dataFromPagination.push(...responseContacts);
			
			while(newCursor){
				response = await axios.get(urlAllContacts, formatHeader(newCursor));
				newCursor = response.data.cursor;
				responseContacts = response.data.contacts;
				dataFromPagination.push(...responseContacts);
			}
	
			console.log(">>> " ,dataFromPagination.length, " contacts found! ")
			
			
			const allOrganizationsIds = []; 
			const allPeopleIds = [];
			const divergent = []; // if someone has unknow contact_type
			for (index in dataFromPagination){
				if(dataFromPagination[index].contact_type == 'person'){
					allPeopleIds.push( parseInt(dataFromPagination[index].contact_id) );
				} else if(dataFromPagination[index].contact_type == 'organization'){
					allOrganizationsIds.push( parseInt(dataFromPagination[index].contact_id) );
				} else {
					divergent.push(
						{
							id: dataFromPagination[index].contact_id,
							name: dataFromPagination[index].name + " | " + dataFromPagination[index].fullname
						}
					)
				}
		
			}
			console.log("--------------------------------------------------------")
			console.log(allOrganizationsIds.length, " organizations ids gotten");
			console.log(allPeopleIds.length, " people ids gotten");
			console.log(divergent.length, " divergents ids gotten");
			console.log("--------------------------------------------------------")
			
			return { allOrganizationsIds, allPeopleIds }
			
	
		}catch(error){
			console.log("E R R O R  - SOMETING WENT WRONG")
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
		  } else if (error.request) {
				console.log(error.request);
		  } else {
				console.log('Error', error.message);
		  }
		  console.log(error.config);
		;
		}}
		
module.exports = getAllContactsIds()	