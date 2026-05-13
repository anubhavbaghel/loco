"use client"
import { useRouter } from 'next/navigation'; // or 'next/navigation' for App Router
import WelcomeScreen from './components/ui/WelcomeScreen';
import { useEffect, useState } from 'react';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
      // Reroute to a specific page, like a dashboard or feed
      router.push('/home'); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return showWelcome ? <WelcomeScreen /> : null;
};

export default App