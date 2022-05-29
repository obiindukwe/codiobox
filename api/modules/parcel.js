import { db } from './db.js'
import { extractCredentials, uuidv4 } from './util.js'


export async function saveParcelData(data, accountId){
    const sql = 
        `UPDATE accounts
        SET 
            sender_postcode = ${data.sender_postcode},
            dest_postcode = ${data.dest_postcode},
            weight = ${data.weight},
            recipient = ${data.recipient},
            address = ${data.address},
        WHERE id = ${accountId}`;

    console.log(sql)
    await db.query(sql)
    return true

}

export async function getParcelData() {
    let sql = `select * FROM parcel;`
	await db.query(sql)
    console.log('sql1:',db.query(sql))
    return (await db.query(sql))

}

export async function add_parcel(data, token) {
	console.log("my front end sent", data)
    const { user } = extractCredentials(token)
    const parcel_status = 'not-dispatched'
    const numb = uuidv4()
    console.log(uuidv4())
    console.log(user, typeof user)
	const { sender_postcode, dest_postcode, weight,  recipient, address} = data
    // console.log(sender_postcode)
	// console.log("sever function to insert into db")
	// console.log(sender_postcode, dest_postcode, weight, recipient, address)
	let sql = `INSERT INTO parcel(sender_postcode, dest_postcode, weight, recipient, address, user_name, parcel_status, tracking_number, uudid)
     VALUES('${sender_postcode}', '${dest_postcode}', '${weight}', '${recipient}', '${address}', '${user}', '${parcel_status}', '${numb}', '${numb}');`
	console.log(sql)
	await db.query(sql);
	return true;
	
}



export async function getParcelDataForLoggedInUser(userName) {
 

    let sql = `select * FROM parcel where user = "${userName}";`
	 let records = await db.query(sql)
    console.log('sql1:',db.query(sql))
    return (records)

}

