import { NodeName } from '@/types/builder'

import {
  parseBuildGradle,
  parseCargo,
  parseComposerJson,
  parseGoMod,
  parsePackageJson,
  parsePipFile,
  parsePom,
  parsePyProject,
  parseRequirementsTxt
} from '@/utils/parse'

export const LANGUAGES_SETUP = [
  {
    language: 'JavaScript',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'TypeScript',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Svelte',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Astro',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Vue',
    fileDependencies: ['package.json'],
    commands: {
      install: ['pnpm install', 'bun install', 'npm install', 'yarn install'],
      run: ['pnpm dev', 'bun dev', 'npm run dev', 'yarn dev'],
      test: ['npm run test']
    }
  },
  {
    language: 'Python',
    fileDependencies: ['Pipfile', 'pyproject.toml', 'requirements.txt'],
    commands: {
      install: ['pip install -r requirements.txt'],
      run: ['python app.py'],
      test: ['pytest']
    }
  },
  {
    language: 'Java',
    fileDependencies: ['build.gradle', 'pom.xml'],
    commands: {
      install: ['mvn install'],
      run: ['java -jar app.jar'],
      test: ['mvn test']
    }
  },
  {
    language: 'PHP',
    fileDependencies: ['composer.json'],
    commands: {
      install: ['composer install'],
      run: ['php main.php'],
      test: ['phpunit']
    }
  },
  {
    language: 'Go',
    fileDependencies: ['go.mod'],
    commands: {
      install: ['go build -o myapp'],
      run: ['go run main.go'],
      test: ['go test']
    }
  },
  {
    language: 'Rust',
    fileDependencies: ['Cargo.toml'],
    commands: {
      install: ['cargo build'],
      run: ['cargo run'],
      test: ['cargo test']
    }
  }
]

export const LANGUAGES_FILES_PARSERS: Record<string, any> = {
  'package.json': parsePackageJson,
  Pipfile: parsePipFile,
  'pyproject.toml': parsePyProject,
  'requirements.txt': parseRequirementsTxt,
  'build.gradle': parseBuildGradle,
  'pom.xml': parsePom,
  'composer.json': parseComposerJson,
  'go.mod': parseGoMod,
  'cargo.toml': parseCargo
}

export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://easyreadme.vercel.app'

export const RATE_LIMIT = 3

export const NODE_DEFAULT_VALUES: Record<string, { default: any }> = {
  endPos: {
    default: 0
  }
}

export const SECTIONS_EXCLUDED_FROM_TABLE_CONTENTS = [
  NodeName.TABLE_CONTENTS,
  NodeName.BADGE,
  NodeName.BANNER
]

export const COOKIE_NAME = 'apikey-ai'
