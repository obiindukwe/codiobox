
/* util.js */

export async function router() {
	console.log('pageChange')
	const page = getPageName()
	console.log(`trying to load page: ${page}`)
	// get a reference to the correct template element
	const template = document.querySelector(`template#${page}`) ?? document.querySelector('template#home')
	const node = template.content.cloneNode(true) // get a copy of the template node
	try {
		const module = await import(`./js/${page}.js`)
		await module.setup(node) // the setup script may need to modify the template fragment before it is displayed
	} catch(err) {
		console.warn(`no script for "${page}" page or error in script`)
		console.log(err)
	}
	// replace contents of the page with the correct template
	const article = document.querySelector('main')
	while (article.lastChild) article.removeChild(article.lastChild) // remove any content from the article element
	article.appendChild(node) // insert the DOM fragment into the page
	// make sure any links added to the content trigger the SPA router script
	document.querySelectorAll('main a').forEach(element => element.addEventListener('click', async event => {
		event.preventDefault()
		history.pushState(null, null, event.target.href)
		await router()
	}))
	highlightNav(page)
	article.id = page
}

export function showMessage(message, delay = 3000) {
	console.log(message)
	document.querySelector('aside p').innerText = message
	document.querySelector('aside').classList.remove('hidden')
	setTimeout( () => document.querySelector('aside').classList.add('hidden'), delay)
}

/* NAV FUNCTIONS */

export async function loadPage(page) {
	history.pushState(null, null, `/${page}`)
	await router()
}

export function getPageName(path = window.location.pathname) {
	console.log(window.location.origin)
	const pathSegments = path.split('/')
	pathSegments.shift() // remove the first empty string
	const firstSegment = pathSegments[0] // get the first segment
	console.log('firstSegment', firstSegment)
	const page = firstSegment ? firstSegment : 'home'
	console.log(`page: ${page}`)
	return page
}

// adds a highlight to the navigation link for the view current being displayed
export function highlightNav(page = 'home') {
	console.log('HIGHLIGHT NAV', page)
	document.querySelectorAll('nav li').forEach(element => {
		const link = element.querySelector('a').href.replace(`${window.location.origin}/`, '') || 'home'
		if(link === page) {
			element.classList.add('currentpage')
		} else {
			element.classList.remove('currentpage')
		}
	})
	document.querySelector('nav').style.visibility = 'visible'
}

// takes an array of views that should be visible and hides the others
export function customiseNavbar(items) {
	document.querySelectorAll('nav li').forEach(element => {
		const link = element.querySelector('a').href.replace(`${window.location.origin}/`, '') || 'home'
		if(items.includes(link)) {
			element.style.display = 'block'
		} else {
			element.style.display = 'none'
		}
	})
	
}

/* FUNCTIONS USED IN FORMS */

export function createToken(username, password) {
	const token = btoa(`${username}:${password}`)
	return `Basic ${token}`
}

export function file2DataURI(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}

/* FUNCTIONS TO MAKE API CALLS
 * all API calls support the JSON:API specification */

export async function secureGet(url, token) {
	console.log('secure get')
	const options = {
		method: 'GET',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		}
	}
	console.log(options)
	const response = await fetch(url, options)
	const json = await response.json()
	return { status: response.status, json: json }
}


export async function securePost(url, token) {
	console.log('display')
	const options = {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		}
	}
	console.log(options)
	const response = await fetch(url, options)
	const json = await response.json()
	return { status: response.status, json: json }
}

export async function fetchQuote(url, token) {
	console.log('display')
	const options = {
		method: 'GET',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		}
	}
	console.log(options)
	const response = await fetch(url, options)
	const json = await response.json()
	return { status: response.status, json: json }
}