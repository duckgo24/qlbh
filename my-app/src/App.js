import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { appRoutes } from './routes';
import Layout from './components/layouts/layout';
import AdminPage from './Admin';
import LayoutAdmin from './Admin/layout.admin';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {appRoutes.map((route, index) => {
          if (route.isLayout) {
            return <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.component />
                </Layout>
              }
            />
          }
          return <Route
            key={index}
            path={route.path}
            element={<LayoutAdmin>
              <route.component />
            </LayoutAdmin>}
          />
        })}
      </Routes>
    </Router>
  );
}

export default App;
