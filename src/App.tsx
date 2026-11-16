import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Routes>
            {ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
