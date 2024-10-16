import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:8080/graphql',
	documents: 'src/app/**/*.graphql',
	generates: {
		'src/generated/graphql.tsx': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo',
			],
			config: {
				withHooks: true,
			},
		},
	},
};

export default config;
