require('dotenv').config();
const axios = require('axios');
const urlLeaseDetails = (leaseDbId) => {return `https://api.imobzi.app/v1/lease/${leaseDbId}`};
const {getAllLeasesIds} = require('../api-imobzi/leases')

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

const getGuarantors = async () => {
	const leasesIds = await getAllLeasesIds ();

	const leasesGuarantor = [];
	for(const id in leasesIds){
		axios.get(urlLeaseDetails(leasesIds[id]), formatHeader())
		.then(result => result.data)
		.then(lease => {
			if(lease.guarantee && lease.guarantee.guarantee_type == "guarantor"){ 
				leasesGuarantor.push({lease: lease.db_id, guarantor: lease.guarantee.sponsors[0].db_id})
			}
		})
		await wait(0.5)
	}
	console.log(leasesGuarantor.length, "guarantors found!")
	return await Promise.all(leasesGuarantor)

}

module.exports = { getGuarantors }