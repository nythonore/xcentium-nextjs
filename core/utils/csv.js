import fs from 'fs';
import * as csv from 'fast-csv';

export const readCsv = async path => {
	return new Promise((resolve, reject) => {
		const data = [];

		fs.createReadStream(path, 'utf-8')
			.pipe(csv.parse({ headers: true }))
			.on('error', error => reject(error))
			.on('data', row => data.push(row))
			.on('end', () => resolve(data));
	});
};
