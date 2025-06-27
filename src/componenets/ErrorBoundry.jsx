import React from "react";

class ErrorBoundry extends React.Component {
  state = {
    error: "",
  }

    static getDerivedStateFromError(error) {
        return { error: error.message };
    }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="error-boundry">
          <h1>Something went wrong</h1>
          <p>{error}</p>
        </div>
      );
    }
    // If no error, render the children components
    return(
     <div>{this.props.children}</div>)

  }
}

export default ErrorBoundry;
