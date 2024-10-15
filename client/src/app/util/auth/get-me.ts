'use server';

import { get } from '../fetch';
import { AuthResponse } from '../types/auth-response';

export const getMe = () => {
	return get<AuthResponse>("auth/me");
};
