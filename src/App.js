import { useEffect, useState, Suspense, lazy, useContext } from 'react';
import { Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Header from './components/Header';
import Loader from './components/Loader';
import AuthContext from './contexts/auth/context';

import Footer from './components/Footer';

import PrivateRoute from './components/UserMenu/PrivateRoute';
import PublicRoute from './components/UserMenu/PublicRoute';

const AuthPageView = lazy(() => import('./views/AuthPageView'));
const MainPageView = lazy(() => import('./views/MainPageView'));
const TestView = lazy(() => import('./views/TestView'));
const ContactsPageView = lazy(() => import('./views/ContactsPageView'));
const UsefulInfoView = lazy(() => import('./views/UsefulInfoView'));
const ResultsView = lazy(() => import('./views/ResultsView'));

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute
              path="/auth"
              restricted
              isLoggedIn={isLoggedIn}
              redirectTo="/"
            >
              <PrivateRoute
                exact="true"
                path="/"
                restricted
                isLoggedIn={isLoggedIn}
              >
                <MainPageView />
              </PrivateRoute>
              <AuthPageView />
            </PublicRoute>

            <PrivateRoute path="/test" restricted isLoggedIn={isLoggedIn}>
              <TestView />
            </PrivateRoute>
            <PrivateRoute path="/results" restricted isLoggedIn={isLoggedIn}>
              <ResultsView />
            </PrivateRoute>
            <PrivateRoute
              path="/useful-info"
              restricted
              isLoggedIn={isLoggedIn}
            >
              <UsefulInfoView />
            </PrivateRoute>
            <PublicRoute path="/contacts" restricted>
              <ContactsPageView />
            </PublicRoute>
          </Switch>
        </Suspense>
        <ToastContainer autoClose={3000} />
      </Container>
      <Footer />
    </>
  );
}

// {
//   /* <AppBar /> */
// }
// {
//   /* <Switch> */
// }
// {
//   /* <Suspense fallback={<p>Loading...</p>}> */
// }
// {
//   /* <PublicRoute exact path="/">
//                 <HomeView />
//               </PublicRoute>
//               <PublicRoute
//                 exact
//                 path="/register"
//                 redirectTo="/contacts"
//                 restricted
//               >
//                 <RegisterViev />
//               </PublicRoute>
//               <PublicRoute
//                 exact
//                 path="/login"
//                 redirectTo="/contacts"
//                 restricted
//               >
//                 <LoginView />
//               </PublicRoute>
//               <PrivateRoute exact path="/contacts" redirectTo="/login">
//                 <ContactsView />
//               </PrivateRoute> */
// }
// {
//   /* </Suspense> */
// }
// {
//   /* </Switch> */
// }
