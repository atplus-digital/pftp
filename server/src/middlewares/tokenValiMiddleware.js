import serverLogError from "../logs/serverLogError"
import jsonwebtoken from "jsonwebtoken";
import {TokenPrivateKey} from "../config/TokenPrivateKey"
import "dotenv/config"



export default (req, res, next) => {

	
	const [ ,token] = req.headers.authorization?.split(' ') || [' ', ' '];


	if( !token || token.length <= 1 ) return res.status(401).json({ status: 'Access denied. No token provided.'});

	try {


		const payload = jsonwebtoken.verify(token, TokenPrivateKey);
		const userFromToken = typeof payload !== 'string' && payload.user;

		if(!userFromToken) {
			return res.send(401).json({ message: 'Invalid token' });
		  }

		req.headers['user'] = payload.user;

		return next()

	
	} catch (error) {
		serverLogError(error.message)
		return res.status(401).json({ message: 'Invalid token' });
	}

	next()


}
