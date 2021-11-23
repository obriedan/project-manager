import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setisCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign user out
    try {
      // update online status
      const { uid } = user;
      await projectFirestore.collection('users').doc(uid).update({ online: false });

      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      console.log(err.message);
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setisCancelled(true);
  }, []);

  return { logout, error, isPending };
};
