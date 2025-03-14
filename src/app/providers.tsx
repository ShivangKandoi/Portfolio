'use client';

import { ThemeProvider } from 'next-themes';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ThemeProvider>
  );
} 