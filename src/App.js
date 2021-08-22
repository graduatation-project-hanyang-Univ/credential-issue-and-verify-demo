import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import IssueVC from './route/issue_vc';
import VerifyVP from './route/verify_vp';
import Home from './route/Home';

const PATH = {
  ROOT: '/',
  ISSUE_VC: '/issue-vc',
  VERIFY_VP: '/verify-vp',
};

function App() {
  return (
    <div>
      <Route path={PATH.ROOT} component={Navigator} />
      <Route exact path={PATH.ROOT} component={Home} />
      <Route exact path={PATH.ISSUE_VC} component={IssueVC} />
      <Route exact path={PATH.VERIFY_VP} component={VerifyVP} />
    </div>
  );
}

function Navigator() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href={PATH.ROOT}>Demo</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={PATH.ISSUE_VC}>Issue VC</Nav.Link>
          <Nav.Link href={PATH.VERIFY_VP}>Verify VP</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default App;
