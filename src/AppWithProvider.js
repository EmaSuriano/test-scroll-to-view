// Check this repo as example
// http://jsfiddle.net/mekwall/up4nu/
// https://codesandbox.io/s/nn4m20328m

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { prop } from 'ramda';
import {
  ScrollingProvider,
  NavigationLink,
  Section,
} from './ScrollingProvider';

const TopMenu = styled.ul`
  position: fixed;
  z-index: 1;
  background: white;
  left: 0;
  right: 0;
  top: 0;
  margin: 0;
`;

const MenuLink = styled.span`
  float: left;
  display: block;
  padding: 5px 25px 7px 25px;
  width: 4em;
  text-align: center;
  -webkit-transition: 0.5s all ease-out;
  -moz-transition: 0.5s all ease-out;
  transition: 0.5s all ease-out;
  border-top: 3px solid white;
  text-decoration: none;
  cursor: pointer;
  color: ${props => (props.selected ? '#000' : '#aaa')};

  &:hover {
    color: #000;
  }
`;

const SectionContainer = styled.div`
  height: 100vh;
  background: ${prop('background')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-transform: uppercase;
`;

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();
    this.myRef4 = React.createRef();
  }

  onClick = section => () => {
    const myDomNode = ReactDOM.findDOMNode(this[section].current);
    console.log(section, myDomNode.offsetTop);
    // myDomNode.scrollIntoView();
    // this[section].current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'start',
    // });

    window.scrollTo({
      top: myDomNode.offsetTop,
      behavior: 'smooth',
    });
    // window.scrollTo(0, myDomNode.offsetTop);
  };

  render() {
    return (
      <ScrollingProvider scrollBehavior="smooth">
        <TopMenu>
          <NavigationLink section="top">
            {link => (
              <MenuLink onClick={link.onClick} selected={link.isSelected}>
                Top
              </MenuLink>
            )}
          </NavigationLink>

          <NavigationLink section="foo">
            {link => (
              <MenuLink onClick={link.onClick} selected={link.isSelected}>
                Foo
              </MenuLink>
            )}
          </NavigationLink>
          {/* <NavigationLink section="foo">Foo</NavigationLink> */}
          {/* <NavigationLink section="bar">Bar</NavigationLink>
          <NavigationLink section="baz">Baz</NavigationLink> */}
        </TopMenu>

        <Section id="top">
          <SectionContainer background="lightblue">top</SectionContainer>
        </Section>

        <Section id="foo">
          <SectionContainer background="orange">foo</SectionContainer>
        </Section>

        {/* <Section id="foo" ref={this.myRef2} background="orange">
          foo
        </Section>

        <Section id="bar" ref={this.myRef3} background="pink">
          bar
        </Section>

        <Section id="baz" ref={this.myRef4} background="cyan">
          baz
        </Section> */}
      </ScrollingProvider>
    );
  }
}

const App = () => (
  <div className="App">
    <MyComponent />
  </div>
);

export default App;
