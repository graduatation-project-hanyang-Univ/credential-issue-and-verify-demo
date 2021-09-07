import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import IssueVC from './route/issue_vc';
import VerifyVP from './route/verify_vp';
import Home from './route/Home';
import IssueUportVC from './route/issue_vc/UportVC';
import VerifyUportVP from './route/verify_vp/UportVP';

const PATH = {
  ROOT: '/',
  ISSUE_VC: '/issue-vc',
  ISSUE_UPORT_VC: '/issue-uport-vc',
  VERIFY_VP: '/verify-vp',
  VERIFY_UPORT_VP: '/verify-uport-vp',
};

function App() {
  return (
    <div>
      <Route path={PATH.ROOT} component={Navigator} />
      <Route exact path={PATH.ROOT} component={Home} />
      <Route exact path={PATH.ISSUE_VC} component={IssueVC} />
      <Route exact path={PATH.VERIFY_VP} component={VerifyVP} />
      <Route exact path={PATH.ISSUE_UPORT_VC} component={IssueUportVC} />
      <Route exact path={PATH.VERIFY_UPORT_VP} component={VerifyUportVP} />
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
          <Nav.Link href={PATH.ISSUE_UPORT_VC}>Issue Uport VC</Nav.Link>
          <Nav.Link href={PATH.VERIFY_UPORT_VP}>Verify Uport VP</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default App;
