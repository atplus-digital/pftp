import Routes from "./routes/index";
import AuthProvider from "./contexts/auth"

function App() {
  return (
    <AuthProvider>
      <Routes/> 
    </AuthProvider>
  )
}

export default App;
