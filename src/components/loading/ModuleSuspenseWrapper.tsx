import React, { Suspense, ComponentType } from 'react'
import { Loading } from '../Loading'

// Generic HOC for wrapping components with Suspense
function withSuspense<P extends object>(
  Component: ComponentType<P>,
  fallback: React.ReactNode = <Loading />
) {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  )
  
  WrappedComponent.displayName = `withSuspense(${Component.displayName || Component.name})`
  
  return <WrappedComponent {...props as P} />
}

// Aid module suspense wrapper
export function withAidSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Donations module suspense wrapper
export function withDonationsSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Scholarship module suspense wrapper
export function withScholarshipSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Messages module suspense wrapper
export function withMessagesSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Fund module suspense wrapper
export function withFundSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// System module suspense wrapper
export function withSystemSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Definitions module suspense wrapper
export function withDefinitionsSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Dashboard module suspense wrapper
export function withDashboardSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Meetings module suspense wrapper
export function withMeetingsSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Internal Messages module suspense wrapper
export function withInternalMessagesSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}

// Tasks module suspense wrapper
export function withTasksSuspense<P extends object>(Component: ComponentType<P>) {
  return withSuspense(Component, <Loading />)
}