import React from 'react';
import { Alert } from 'antd';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <section aria-label="error-message" role="alert">
                    <Alert
                        message="Error"
                        description="Something went wrong. Please try again later."
                        type="error"
                        showIcon
                    />
                </section>
            );
        }

        return this.props.children;
    }
}