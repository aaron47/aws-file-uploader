'use client';
import { useGetUsersQuery } from '@/generated/graphql';

export default function Users() {
	const { data, loading, error } = useGetUsersQuery();
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error fetching users</div>;

	return (
		<div className="flex justify-center items-center h-screen">
			<ul>
				{data?.getUsers?.map((user) => (
					<li key={user._id}>{user.email}</li>
				))}
			</ul>
		</div>
	);
}
