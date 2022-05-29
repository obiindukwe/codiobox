
/* routes.js */

import { Router } from 'oak'

import { extractCredentials, dataURLtoFile } from './modules/util.js'
import { login, register} from './modules/accounts.js'
import { saveParcelData, getParcelData, add_parcel, getParcelDataForLoggedInUser } from './modules/parcel.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	context.response.headers.set('Content-Type', 'text/html')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})




router.get('/api/get-user-account', async context => {
	console.log('GET /api/get-user account')
	const token = context.request.headers.get('Authorization')

	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		//login method
		const username = await login(credentials)
		console.log(`username: ${username}`)

		const userInfo = await getParcelDataForLoggedInUser(username)
		
	
		context.response.body = JSON.stringify(
			{
				data: {userInfo }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})



router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		//login method
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: '401 Unauthorized.',
						detail: err.message
					}
				]
			}
		, null, 2)
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		dataURLtoFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				errors: [
					{
						title: 'a problem occurred',
						detail: err.message
					}
				]
			}
		)
	}
})

router.post('/api/parcel', async context => {
	console.log('POST: /api/parcel')
	try {   
		const body = await context.request.body()
		const data = await body.value
		const token = context.request.headers.get('Authorization')
		console.log(data)
		console.log('hot')
		add_parcel(data, token) // this line gets data from the front end and saves it to the database 
		context.response.status = 200
			context.response.body = JSON.stringify(
				{
					success: true
						
				}
			)


	} catch(err){
		console.log(err)
	}
    
});




router.get('/api/parcel', async context => {
	console.log('GET: /api/parcel')
	try{   
		
	console.log('getparcel')
	
	const black = await getParcelData() // this line gets data from the front end and saves it to the database 
	console.log('data from db', black)
	context.response.status = 200
	
		context.response.body = JSON.stringify(
			black
		)


	} catch(err){
		console.log(err)
	}
    
});

export default router
