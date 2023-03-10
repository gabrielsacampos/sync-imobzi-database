set @from_date = '2023-01-31';
set @till_date = '2023-02-27';

SELECT invoices.id, invoices.paid_at, properties.address, ROUND((management_fee * share)/100, 2), cpf from invoices
	inner join leases on invoices.lease_id = leases.id
	inner join properties on properties.id = leases.property
	inner join owners on properties.id = owners.id_property
	inner join people on owners.id_owner_person = people.id
where management_fee > 0 AND ((paid_at >= @from_date AND paid_at <= @till_date) AND paid_at IS NOT NULL)
UNION
SELECT invoices.id, invoices.paid_at, properties.address, ROUND((management_fee * share)/100, 2), cnpj from invoices
	inner join leases on invoices.lease_id = leases.id
	inner join properties on properties.id = leases.property
	inner join owners on properties.id = owners.id_property
	inner join organizations on owners.id_owner_organization = organizations.id
where management_fee > 0 AND ((paid_at >= @from_date AND paid_at <= @till_date) AND paid_at IS NOT NULL)
order by paid_at asc;
