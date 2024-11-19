import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    // Reset error state to reattempt rendering children.
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.errorBoundary}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.toString()}</p>
          <details style={styles.details}>
            {this.state.errorInfo?.componentStack}
          </details>
          <button onClick={this.handleRetry} style={styles.retryButton}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  errorBoundary: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    textAlign: "center",
    margin: "20px 0",
  },
  details: {
    whiteSpace: "pre-wrap",
    textAlign: "left",
    marginTop: "10px",
    color: "#856404",
  },
  retryButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ErrorBoundary;
