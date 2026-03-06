const noop = () => null
const NoopComponent = ({ children }) => children || null
const NoopHidden = () => null

const authState = { isLoaded: true, userId: null, sessionId: null, orgId: null, getToken: noop, signOut: noop, has: () => false }
const userState = { isLoaded: true, isSignedIn: false, user: null }
const sessionState = { isLoaded: true, session: null }

const exports = {
  ClerkProvider: NoopComponent,
  ClerkLoaded: NoopComponent,
  ClerkLoading: NoopHidden,
  SignIn: NoopHidden,
  SignUp: NoopHidden,
  SignedIn: NoopHidden,
  SignedOut: NoopComponent,
  RedirectToSignIn: NoopHidden,
  RedirectToSignUp: NoopHidden,
  UserButton: NoopHidden,
  SignInButton: NoopHidden,
  SignUpButton: NoopHidden,
  SignOutButton: NoopHidden,
  UserProfile: NoopHidden,
  OrganizationSwitcher: NoopHidden,
  Protect: NoopComponent,
  MultisessionAppSupport: NoopComponent,
  useUser: () => userState,
  useAuth: () => authState,
  useClerk: () => ({ signOut: noop, openSignIn: noop, openSignUp: noop, openUserProfile: noop }),
  useSession: () => sessionState,
  useSignIn: () => ({ isLoaded: true, signIn: null, setActive: noop }),
  useSignUp: () => ({ isLoaded: true, signUp: null, setActive: noop }),
  useOrganization: () => ({ isLoaded: true, organization: null }),
  useOrganizationList: () => ({ isLoaded: true, organizationList: [] }),
  auth: () => authState,
  currentUser: () => null,
  getAuth: () => authState,
  clerkMiddleware: fn => fn,
  createRouteMatcher: () => () => false,
  clerkClient: { users: { getUser: noop, getUserList: noop } },
  zhCN: {},
  enUS: {},
  default: {}
}

module.exports = exports
module.exports.default = exports
