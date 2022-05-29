
/* util.js */

import { etag } from 'oak'
import { Base64 } from 'bb64'
import { Md5 } from 'md5'

export function extractCredentials(token) {
	if(token === undefined) throw new Error('no auth header')
	const [type, hash] = token.split(' ')
	if(type !== 'Basic') throw new Error('wrong auth type')
	const str = atob(hash)
	if(str.indexOf(':') === -1) throw new Error('invalid auth format')
	const [user, pass] = str.split(':')
	return { user, pass }
}

export async function fileExists(path) {
	try {
		const stats = await Deno.lstat(path)
		return stats && stats.isFile
	} catch(err) {
		if (err && err instanceof Deno.errors.NotFound) {
			return false
		} else {
			throw err
		}
	}
}

export function dataURLtoFile(dataURL, username) {
	const [ metadata, base64Image ] = dataURL.split(';base64,')
	const extension = metadata.split('/').pop()
	const filename = `${username}-${Date.now()}.${extension}`
	Base64.fromBase64String(base64Image).toFile(`./spa/uploads/${filename}`)
	return filename
}

export async function getEtag(path) {
	const stat = await Deno.stat(path)
	const tag = await etag.calculate(stat)
	return tag
}

export function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export async function fetchQuote(path) {
	const stat = await Deno.stat(path)
	const tag = await etag.calculate(stat)
	return tag
}