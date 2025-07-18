/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as LoginRouteImport } from './routes/login'
import { Route as CallbackRouteImport } from './routes/callback'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AdminProfileRouteImport } from './routes/_admin/profile'
import { Route as AdminDashboardRouteImport } from './routes/_admin/dashboard'

const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const CallbackRoute = CallbackRouteImport.update({
  id: '/callback',
  path: '/callback',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AdminProfileRoute = AdminProfileRouteImport.update({
  id: '/_admin/profile',
  path: '/profile',
  getParentRoute: () => rootRouteImport,
} as any)
const AdminDashboardRoute = AdminDashboardRouteImport.update({
  id: '/_admin/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/callback': typeof CallbackRoute
  '/login': typeof LoginRoute
  '/dashboard': typeof AdminDashboardRoute
  '/profile': typeof AdminProfileRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/callback': typeof CallbackRoute
  '/login': typeof LoginRoute
  '/dashboard': typeof AdminDashboardRoute
  '/profile': typeof AdminProfileRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/callback': typeof CallbackRoute
  '/login': typeof LoginRoute
  '/_admin/dashboard': typeof AdminDashboardRoute
  '/_admin/profile': typeof AdminProfileRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/callback' | '/login' | '/dashboard' | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/callback' | '/login' | '/dashboard' | '/profile'
  id:
    | '__root__'
    | '/'
    | '/callback'
    | '/login'
    | '/_admin/dashboard'
    | '/_admin/profile'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CallbackRoute: typeof CallbackRoute
  LoginRoute: typeof LoginRoute
  AdminDashboardRoute: typeof AdminDashboardRoute
  AdminProfileRoute: typeof AdminProfileRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/callback': {
      id: '/callback'
      path: '/callback'
      fullPath: '/callback'
      preLoaderRoute: typeof CallbackRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_admin/profile': {
      id: '/_admin/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AdminProfileRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_admin/dashboard': {
      id: '/_admin/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AdminDashboardRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CallbackRoute: CallbackRoute,
  LoginRoute: LoginRoute,
  AdminDashboardRoute: AdminDashboardRoute,
  AdminProfileRoute: AdminProfileRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
