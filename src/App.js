import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import IssueVC from './route/issue_vc';
import VerifyVP from './route/verify_vp/indy';
import Home from './route/Home';
import IssueVeramoVC from './route/issue_vc/VeramoVC';
import VerifyVeramoVP from './route/verify_vp/VeramoVP';

const PATH = {
  ROOT: '/',
  ISSUE_VC: '/issue-vc',
  ISSUE_VERAMO_VC: '/issue-veramo-vc',
  VERIFY_VP: '/verify-vp',
  VERIFY_VERAMO_VP: '/verify-veramo-vp',
};

function App() {
  return (
    <div>
      <Route path={PATH.ROOT} component={Navigator} />
      <Route exact path={PATH.ROOT} component={Home} />
      <Route exact path={PATH.ISSUE_VC} component={IssueVC} />
      <Route exact path={PATH.VERIFY_VP} component={VerifyVP} />
      <Route exact path={PATH.ISSUE_VERAMO_VC} component={IssueVeramoVC} />
      <Route exact path={PATH.VERIFY_VERAMO_VP} component={VerifyVeramoVP} />
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
          <Nav.Link href={PATH.ISSUE_VERAMO_VC}>Issue Veramo VC</Nav.Link>
          <Nav.Link href={PATH.VERIFY_VERAMO_VP}>Verify Veramo VP</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default App;
