import { ThemeProvider } from "./components/theme-provider";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout/>
    </ThemeProvider>
  )
}