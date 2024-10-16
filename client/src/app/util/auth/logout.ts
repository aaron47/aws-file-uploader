'use server';

import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE_NAME } from "../constants";
import { redirect } from "next/navigation";

export default async function logout() {
	cookies().delete(AUTHENTICATION_COOKIE_NAME);
	redirect("/login");
}