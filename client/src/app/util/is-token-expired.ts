import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string) => {
	try {
		const decoded: { exp: number } = jwtDecode(token); // Decode the token and extract the 'exp' field
		const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
		return decoded.exp < currentTime; // Return true if the token is expired
	} catch (error) {
		return true; // If decoding fails, assume the token is invalid or expired
	}
};
