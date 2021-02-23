import React, { Component } from 'react';
import { Page, Card, Layout, Form, FormLayout, TextField, Button, ButtonGroup } from '@shopify/polaris';

//function createProfileComponent(props) {

class testForm extends Component {

    state = {
        name: ''
    }

    handleChange = (field) => {
        return (value) => this.setState({ [field]: value });
    };

    onSubmit0 = async (e) => {
        //
        // Please redirect to any page (eg., /test from here)
        //
        // do your form validation here
        if(!this.state.name) {
            alert('Please fill your name');
            return;
        }
        // redirect to a different page
        window.location.href = '/test';
    }

    render() {

        return (
            <React.Fragment>
                <Layout>
                    <Layout.Section>
                        <Form onSubmit={this.onSubmit0}>
                            <FormLayout>
                                <Layout>
                                    <Layout.Section>
                                        <Card title="Name">
                                            <Card.Section >
                                                <TextField
                                                    type="text"
                                                    placeholder="Enter a test name"
                                                    value={this.state.name}
                                                    onChange={this.handleChange('name')}
                                                    helpText="For testing purposes only."
                                                />
                                            </Card.Section>
                                        </Card>
                                    </Layout.Section>
                                    <Layout.Section>
                                        <ButtonGroup>
                                            <Button primary submit>Submit</Button>
                                        </ButtonGroup>
                                    </Layout.Section>
                                </Layout>
                            </FormLayout>
                        </Form>
                    </Layout.Section>
                </Layout>
            </React.Fragment >
        )
    }
}


export default testForm