    import React, { Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainNavbar from './components/layout/header/mainNavbar';
import Footer from './components/layout/footer/footer';
import Home from './components/pages/home';
import Software from './components/software/Software';
import Explore from './components/pages/explore/Explore';
import Register from './components/pages/register';
import Login from './components/pages/login';
import { connect } from 'react-redux';
import { checkAuthenticated } from './actions/auth';
import { load_user } from './actions/profile';

function App({ checkAuthenticated, load_user  }) {

    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <Fragment>
            <header>
                <MainNavbar />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/software" element={<Software />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
            <footer>
                <Footer />
            </footer>
        </Fragment>
    );
};

export default connect(null, { checkAuthenticated, load_user })(App);