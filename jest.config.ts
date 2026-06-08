import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testMatch: ['**/*.{test,spec}.{ts,tsx}'],
  moduleNameMapper: {
    '^@/lib/constants$': '<rootDir>/src/test/mocks/constants.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^astro:content$': '<rootDir>/src/test/mocks/astro-content.ts'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/test/']
};

export default config;
