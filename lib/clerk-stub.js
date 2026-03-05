const noop = () => null
const NoopComponent = ({ children }) => children || null
const NoopHidden = () => null

module.exports = {
  ClerkProvider: NoopComponent,
  SignIn: NoopHidden,
  SignUp: NoopHidden,
  SignedIn: NoopHidden,
  SignedOut: NoopComponent,
  UserButton: NoopHidden,
  SignInButton: NoopHidden,
  SignOutButton: NoopHidden,
  UserProfile: NoopHidden,
  useUser: () => ({ isLoaded: true, isSignedIn: false, user: null }),
  useAuth: () => ({ isLoaded: true, userId: null, sessionId: null, getToken: noop }),
  getAuth: () => ({ userId: null }),
  clerkMiddleware: fn => fn,
  createRouteMatcher: () => () => false,
  default: {}
}
