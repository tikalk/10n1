import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { Container, Spinner } from 'reactstrap';
import http from 'axios';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import client from '../apollo-client';
import { GET_EXPERT_BY_EMAIL } from '../graphql/queries';
import { CREATE_EXPERT } from '../graphql/mutations';

export const AuthContext = createContext({});

const googleClientId =
  '158154804757-5oja12b2flilb717ndvrdct3or8uqjqi.apps.googleusercontent.com';

export const AuthProvider = ({ children }: any) => {
  const [createExpert] = useMutation(CREATE_EXPERT);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userDataRef: any = useRef({});
  const router = useRouter();

  const onSuccess = async (response) => {
    setIsLoading(true);
    setIsLoggedIn(true);
    userDataRef.current = {
      ...userDataRef.current,
      name: response.profileObj.name,
      email: response.profileObj.email,
      image: response.profileObj.imageUrl,
    };

    if (response?.tokenObj?.access_token && !userDataRef?.current?.phone) {
      const { data } = await http.get(
        'https://people.googleapis.com/v1/people/me?personFields=phoneNumbers',
        {
          headers: {
            Authorization: `Bearer ${response?.tokenObj?.access_token}`,
          },
        },
      );
      if (data?.phoneNumbers?.[0]?.value) {
        userDataRef.current = {
          ...userDataRef.current,
          phone: data?.phoneNumbers[0]?.value || null,
        };
      }
    }

    if (userDataRef.current?.email) {
      const { data } = await client.query({
        query: GET_EXPERT_BY_EMAIL,
        variables: { email: userDataRef.current?.email },
      });
      if (data?.expert) {
        userDataRef.current = { ...userDataRef.current, ...data.expert };
      } else {
        await createExpert({
          variables: {
            input: {
              name: userDataRef.current?.name || '',
              phone: userDataRef.current?.phone || '',
              email: userDataRef.current?.email || '',
              image: userDataRef.current?.image || '',
            },
          },
        });
      }
    }

    if (!userDataRef.current?.slackData?.accessToken) {
      router.push('/registration/step2');
    } else if (!userDataRef?.current?.expertise?.length) {
      router.push('/registration/step3');
    } else if (!userDataRef?.current?.availability?.length) {
      router.push('/registration/step4');
    } else if (!userDataRef?.current?.bio) {
      router.push('/registration/step5');
    }
    setIsLoading(false);
  };

  const onLogout = async () => {
    setIsLoading(false);
    userDataRef.current = {};
    await router.push('/');
    await router.reload();
  };

  const onFailure = async () => {
    setIsLoading(false);
  };

  const onAutoLoadFinished = async (connected) => {
    console.warn({ connected });
    if (!connected) {
      setIsLoading(false);
    }
  };

  const refetch = useCallback(async () => {
    const { data } = await client.query({
      query: GET_EXPERT_BY_EMAIL,
      variables: { email: userDataRef.current?.email },
    });
    if (data?.expert) {
      userDataRef.current = { ...userDataRef.current, ...data.expert };
    }
    return data?.expert;
  }, [userDataRef.current]);

  const { signIn } = useGoogleLogin({
    // @ts-ignore
    onSuccess,
    onFailure,
    onAutoLoadFinished,
    clientId: googleClientId,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
    scope: 'https://www.googleapis.com/auth/user.phonenumbers.read',
    redirectUri:
      process.env.NODE_ENV === 'production'
        ? 'https://10n1.tikalk.dev/registration/step2'
        : 'http://localhost:3000/registration/step2',
  });

  const { signOut } = useGoogleLogout({
    onLogoutSuccess: onLogout,
    clientId: googleClientId,
    cookiePolicy: 'single_host_origin',
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData: userDataRef.current ?? {},
        login: signIn,
        logout: signOut,
        isLoading,
        refetch,
      }}
    >
      {isLoading ? (
        <Container className="d-flex align-items-center justify-content-center vh-100">
          <Spinner size="lg" color="warning" />
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth: any = () => useContext(AuthContext);

export default useAuth;
