import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Boundary Caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Check the console for details.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
