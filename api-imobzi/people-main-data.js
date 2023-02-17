require('dotenv').config()
const axios = require('axios');

const personDetails = (personId) => {return `https://api.imobzi.app/v1/person/${personId}`};

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


const allContactsIds = require('./contacts-ids');


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




const getPeopleMainData = async () => {
	try{ 

		
		const {allPeopleIds } = await allContactsIds;
		console.log("================================================")
		console.log("R U N N I N G getPeopleMainData function...")
		console.log("================================================")


		let peopleMainData = [];
		for(index in allPeopleIds){
		axios.get(personDetails(allPeopleIds[index]), formatHeader())
			.then(result => { 
				const person = result.data; // property path to data from person
				peopleMainData.push(
					{
						id: person.db_id,
						cpf: person.fields.group_personal[1][0].value? person.fields.group_personal[1][0].value : "please, set the CPF from person at Imobzi" ,
						fullname: person.fields.group_personal[0][0].value, //path to get fullname into response
						birthdate: person.fields.group_personal[4][0].value,
						email: person.email? person.email : "please, set an email at Imobzi",
	 					phone: person.phone? person.phone.number : "please, set a phone at Imobzi",
						gender: person.fields.group_personal[7][0].value,
						marital_status: person.fields.group_personal[4][1].value,
						code_imobzi: person.code,
						profession: person.fields.group_personal[6][0].value,
					}
				)
				
				console.log( peopleMainData.length, '/', allPeopleIds.length, "people data treated")
				console.log(((peopleMainData.length/allPeopleIds.length)*100).toFixed(2), "% concluded")
				console.log("----------------------------------------")
			})
		
		await wait(0.5)
	}
		return await Promise.all(peopleMainData);
		

	}catch (error) {
	console.log("E R R O R  - SOMETING WENT WRONG");
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


module.exports =  getPeopleMainData()