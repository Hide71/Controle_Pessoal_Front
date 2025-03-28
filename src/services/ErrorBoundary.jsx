import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Erro capturado no ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ocorreu um erro. Tente novamente mais tarde.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary
