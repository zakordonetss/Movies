import { Router } from "express";

export const HelloConroller = Router()
    .get('/', (req, res) => {
        res.status(200).send({
			title: 'Hello',
			availableApis: [
				'GET /movies',
				'GET /movies/sort/years/descending or ascending',
                'GET /movies/filter/year/ your year',
				'GET /movies/filter/gener/ your gener',
				'GET /movies/filter/genres?genres=comedy,drama,documentary , ...',
			],
		});
    })