import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';

const { Consumer, Provider } = React.createContext();

export class ScrollingProvider extends React.Component {
  state = {
    selected: '',
  };
  refs = {};

  componentDidMount() {
    document.addEventListener('scroll', this.debounceScroll, true);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.debounceScroll, true);
  }

  handleScroll = () => {
    const heightPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    const selected = Object.entries(this.refs).reduce((acc, [key, value]) => {
      const node = ReactDOM.findDOMNode(value.current);
      const { top, height } = node.getBoundingClientRect();

      debugger;

      // const { offsetTop, offsetHeight } = value.current;
      // debugger;
      // const minHeight = offsetTop;
      // const maxHeight = offsetTop + offsetHeight;
      // if (heightPosition >= minHeight && heightPosition <= maxHeight)
      //   return key;
      // return acc;
      return acc;
    });

    console.log('scrolling ...', selected);
  };

  debounceScroll = debounce(this.handleScroll, 100);

  registerRef = id => {
    const newRef = React.createRef();
    this.refs = { ...this.refs, [id]: newRef };
    return newRef;
  };

  scrollTo = section => {
    const myDomNode = ReactDOM.findDOMNode(this.refs[section].current);

    window.scrollTo({
      top: myDomNode.offsetTop,
      behavior: this.props.scrollBehavior,
    });
  };

  render() {
    const value = {
      registerRef: this.registerRef,
      scrollTo: this.scrollTo,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

const withScrollingConsumer = Component => props => (
  <Consumer>{data => <Component {...data} {...props} />}</Consumer>
);

export const Section = withScrollingConsumer(props => (
  <section ref={props.registerRef(props.id)} id={props.id}>
    {props.children}
  </section>
));

export class NavigationLink extends React.Component {
  render() {
    return (
      <Consumer>
        {data => {
          const onClick = () => data.scrollTo(this.props.section);
          const isSelected = data.selected === this.props.section;
          return this.props.children({ onClick, isSelected });
        }}
      </Consumer>
    );
  }
}

// export const NavigationLink = withScrollingConsumer(props => {
//   const onClick = () => props.scrollTo(this.props.section);
//   const isSelected = props.selected === this.props.section;
//   return this.props.children({ onClick, isSelected });
// });

// export const withNavigationLink = id => Component => props => {
//   <Consumer>
//     {data => {
//       const onClick = () => data.scrollTo(this.props.section);
//       const isSelected = data.selected === this.props.section;
//       re;
//       return this.props.children({ onClick, isSelected });
//     }}
//   </Consumer>;
// };
