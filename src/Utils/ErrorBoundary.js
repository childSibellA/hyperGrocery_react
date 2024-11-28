import React from "react";
import ErrorPage from "../UI/ErrorPage/ErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          errorMessage={
            this.state.errorMessage || "Oops! Something went wrong."
          }
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
