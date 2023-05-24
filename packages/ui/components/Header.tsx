import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const Header = ({ title }: any) => {
  const { isLoggedIn, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/' && !isLoggedIn) {
      setTimeout(() => {
        toast('אינך מורשה להיכנס לאזור זה במערכת אנא נסו לתחבר או להרשם קודם', {
          type: 'error',
        });
      }, 100);
      router.push('/');
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar color="header" light expand="md">
        <NavbarBrand href="/" style={{ fontSize: 18, fontWeight: 'bold' }}>
          <img src="/logo.png" alt="10n1" style={{ maxHeight: 40 }} />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="mr-4">
            <NavItem className="ml-4">
              <NavbarText style={{ fontSize: 18 }}>
                <Link href="/me">My profile</Link>
              </NavbarText>
            </NavItem>
            <NavItem className="ml-4">
              <NavbarText style={{ fontSize: 18 }}>
                <Link href="/experts">Experts List</Link>
              </NavbarText>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {!isLoggedIn ? (
                <>
                  <Button onClick={login} color="secondary">
                    Login/Registration
                  </Button>
                </>
              ) : (
                <Button onClick={logout} color="secondary">
                  Logout
                </Button>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Header;
