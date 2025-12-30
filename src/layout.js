import './globals.css';
import StoreProvider from './StoreProvider  ';
import { ThemeProvider } from './ThemeContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}