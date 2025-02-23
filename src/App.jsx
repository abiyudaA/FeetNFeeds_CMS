import { BrowserRouter, Routes, Route } from "react-router";
import BaseLayout from './views/BaseLayout';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import AddUserPage from './views/AddUserPage';
import CategoryPage from './views/CategoryPage';
import AddProductPage from './views/AddProductPage';
import EditPage from './views/EditPage';
import UploadPage from './views/UploadPage';



function App() {

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path='/login' element={<LoginPage />} />

                    <Route element={<BaseLayout />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/addProduct' element={<AddProductPage />} />
                        <Route path='/edit/:id' element={<EditPage />} />
                        <Route path='/upload/:id' element={<UploadPage />} />
                        <Route path='/addUser' element={<AddUserPage />} />
                        <Route path='/categories' element={<CategoryPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
