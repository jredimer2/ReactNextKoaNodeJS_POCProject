import React, { Component } from "react";
import {
    Page,
    FormLayout,
    TextField,
    Layout,
    Button,
    Spinner,
    Form,
} from "@shopify/polaris";
// import Router from "next/router";

import simAuthentication from '../components/SimAuthentication';


export class Login extends Component {
    state = {
        email: "",
        password: "",
        loading: false,
    };

    handleLogin = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        const { email, password } = this.state;
        if (!(email && password)) {
            alert("Both email and password are required");
        }
        this.setState({
            loading: true,
        });
        try {
            await simAuthentication(true);

            window.location.href = "/test";
        } catch (error) {
            console.error(error);
            this.setState({
                loading: false,
            });
            alert("An error occured");
        }
    };

    render() {
        const { email, password, loading } = this.state;

        return (
            <div style={{ marginTop: "20vh", marginLeft: "1vh", marginRight: "1vh" }}>
                <Page>
                    <Layout>
                        <Layout.AnnotatedSection
                            title="Sign In"
                            description="Sign into Merchant account"
                        >
                            <Form onSubmit={this.handleLogin}>
                                <FormLayout>
                                    <TextField
                                        type="email"
                                        value={email}
                                        label="Account email"
                                        onChange={(e) => {
                                            this.setState({ email: e });
                                        }}
                                    />
                                    <TextField
                                        type={"password"}
                                        value={password}
                                        label="Password"
                                        onChange={(p) => {
                                            this.setState({ password: p });
                                        }}
                                    />
                                    <Button primary onClick={this.handleLogin} disabled={loading}>
                                        {loading ? (
                                            <Spinner
                                                accessibilityLabel="Wait..."
                                                size="small"
                                                color="teal"
                                            />
                                        ) : (
                                                "Login"
                                            )}
                                    </Button>
                                </FormLayout>
                            </Form>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page>
            </div>
        );
    }
}

export default Login;
